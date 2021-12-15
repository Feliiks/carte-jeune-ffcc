require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');

const prisma = require('./db');

const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');


// SERVER CONFIG _____________________________________________________

const PORT = process.env.PORT || 3009;

const app = express();

app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT} en dev mode.`);
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

    if (!findUser[0]) {
      let hash = sha256(password);
      let finalHash = Base64.stringify(hash);

      await prisma.users.create({
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: finalHash
        }
      });

      res.sendStatus(201);

    } else {
      res.send({ alreadyExists: true });
    }
  } catch (err) {
    res.sendStatus(401);
    console.error(err);
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

    let hash = sha256(password);
    let finalHash = Base64.stringify(hash);

    if (!findUser[0] || findUser[0].password !== finalHash) {
      res.send({ accessDenied: true });
    } else {
      res.send({ accessDenied: false });
    }
  } catch (err) {
    res.sendStatus(401);
    console.error(err);
  }
});
