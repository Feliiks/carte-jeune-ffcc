require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');

const prisma = require('./db');
const jwt = require('jsonwebtoken');

const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
  }
});


// SERVER CONFIG _____________________________________________________

const PORT = process.env.PORT || 3009;

const app = express();

app.listen(PORT, () => {
  console.log(`L'api est lancé sur le port ${PORT} en dev mode.`);
});

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(express.json());


// ROUTES ______________________________________________________________

app.post('/register', async (req, res) => {
  let { firstname, lastname, email, password } = req.body;

  try {
    let findUser = await prisma.users.findMany({
      where: {
        email: email
      }
    });

    if (findUser[0]) throw new Error;

    let hash = sha256(password);
    let finalHash = Base64.stringify(hash);

    let emailToken = jwt.sign(
      {
        email: email
      },
      process.env.TOKEN_KEY
    );

    await prisma.users.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: finalHash,
        email_token: emailToken
      }
    });

    await transporter.sendMail(
      {
        from: "account@ffcc.fr",
        to: email,
        subject: "Confirmation de votre compte FFCC",
        html: `
        Bonjour ${firstname},<br><br>
        Confirmez votre compte sur le site de la FFCC en cliquant <a href='http://localhost:4200/account-confirmation/${emailToken}' target='_blank'>sur ce lien</a>.
      `
      }
    );

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(403);
    console.error(err);
  }
});

app.post('/account/emailverification', async (req, res) => {
  let { email } = req.body;

  try {
    const user = await prisma.users.findMany({
      where: {
        email: email
      }
    });

    if (!user[0]) throw new Error;

    await transporter.sendMail(
      {
        from: "account@ffcc.fr",
        to: email,
        subject: "Confirmation de votre compte FFCC",
        html: `
          Bonjour ${user[0].firstname},<br><br>
          Confirmez votre compte sur le site de la FFCC en cliquant <a href='http://localhost:4200/account/accountconfirmation/${user[0].email_token}' target='_blank'>sur ce lien</a>.
        `
      }
    );

    res.sendStatus(200);

  } catch (error) {
    res.sendStatus(400);
    console.error(error);
  }
});

app.post('/account/accountconfirmation', async (req, res) => {
  let { token } = req.body;

  try {
    const check = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await prisma.users.findMany({
      where: {
        email: check.email,
        is_email_verified: false,
        email_token: token
      }
    });

    if (!user[0]) throw new Error;

    await prisma.users.update({
      where: {
        id: user[0].id
      },
      data: {
        is_email_verified: true,
        email_token: null
      }
    });

    res.sendStatus(200);

  } catch (error) {
    res.sendStatus(403);
    console.error(error)
  }
});

app.post('/login', async (req, res) => {
  let { email, password } = req.body;

  try {
    let findUser = await prisma.users.findMany({
      where: {
        email: email
      }
    });

    if (!findUser[0]) throw new Error;

    let hash = Base64.stringify(sha256(password));

    if (findUser[0].password !== hash) throw new Error;

    res.sendStatus(200);

  } catch (err) {
    res.sendStatus(401);
    console.error(err);
  }
});

app.post('/passwordrecovery', async (req, res) => {
  let { email } = req.body;

  try {
    let user = await prisma.users.findMany({
      where: {
        email: email,
        is_email_verified: true
      }
    });

    if (!user[0]) throw new Error;

    let passwordToken = jwt.sign(
      {
        email: email
      },
      process.env.TOKEN_KEY
    );

    await prisma.users.update({
      where: {
        id: user[0].id
      },
      data: {
        password_token: passwordToken
      }
    })

    await transporter.sendMail(
      {
        from: "account@ffcc.fr",
        to: email,
        subject: "Reinitialisation de votre mot de passe FFCC",
        html: `
          Bonjour ${user[0].firstname},<br><br>
          Pour reinitialiser votre mot de passe, merci de suivre <a href='http://localhost:4200/account/passwordrecovery/newpassword/${passwordToken}' target='_blank'>ce lien</a>.
        `
      }
    );

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(401);
    console.error(err);
  }
});

app.post('/account/passwordrecovery/jwtverify', async (req, res) => {
  let { token } = req.body;

  try {
    let check = jwt.verify(token, process.env.TOKEN_KEY);

    let user = await prisma.users.findMany({
      where: {
        email: check.email,
        password_token: token
      }
    });

    if (!user[0]) throw new Error;

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(401);
    console.error(err);
  }
});

app.post('/account/passwordrecovery/newpassword', async (req, res) => {
  let { password, passwordToken } = req.body;

  try {
    let user = await prisma.users.findMany({
      where: {
        password_token: passwordToken
      }
    });

    let hash = sha256(password);
    let finalHash = Base64.stringify(hash);

    await prisma.users.update({
      where: {
        id: user[0].id
      },
      data: {
        password: finalHash,
        password_token: null
      }
    });

    res.sendStatus(200);

  } catch (err) {
    res.sendStatus(401);
    console.error(err);
  }
});
