require('dotenv').config({ path: '../.env' })
const express = require('express')
const cors = require('cors')

const prisma = require('./db')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const sha256 = require('crypto-js/sha256')
const Base64 = require('crypto-js/enc-base64')

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

// SERVER CONFIG _____________________________________________________

const PORT = process.env.PORT || 3009

const app = express()

app.listen(PORT, () => {
  console.log(`L'api est lancé sur le port ${PORT} en dev mode.`)
})

app.use(
  cors({
    origin: 'http://localhost:4200',
  }),
)

app.use(express.json())

// ROUTES ______________________________________________________________

// REGISTER ___________________________________________________________
app.post('/register', async (req, res) => {
  let { firstname, lastname, postcode, city, email, password } = req.body

  try {
    let findUser = await prisma.users.findMany({
      where: {
        email: email,
      },
    })

    if (findUser[0]) throw new Error

    let hash = sha256(password)
    let finalHash = Base64.stringify(hash)

    let uid = uuidv4()

    let emailToken = jwt.sign(
      {
        uid: uid,
      },
      process.env.TOKEN_KEY,
    )

    await prisma.users.create({
      data: {
        uid: uid,
        firstname: firstname,
        lastname: lastname,
        post_code: parseInt(postcode),
        city: city,
        email: email,
        password: finalHash,
        email_token: emailToken,
      },
    })

    await transporter.sendMail(
      {
        from: 'account@ffcc.fr',
        to: email,
        subject: 'Confirmation de votre compte FFCC',
        html: `
        Bonjour ${firstname},<br><br>
        Confirmez votre compte sur le site de la FFCC en cliquant <a href='http://localhost:4200/account/accountconfirmation/${emailToken}' target='_blank'>sur ce lien</a>.
      `,
      },
    )

    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(403)
    console.error(err)
  }
})

app.post('/account/emailverification', async (req, res) => {
  let { email } = req.body

  try {
    const user = await prisma.users.findMany({
      where: {
        email: email,
      },
    })

    if (!user[0]) throw new Error

    await transporter.sendMail(
      {
        from: 'account@ffcc.fr',
        to: email,
        subject: 'Confirmation de votre compte FFCC',
        html: `
          Bonjour ${user[0].firstname},<br><br>
          Confirmez votre compte sur le site de la FFCC en cliquant <a href='http://localhost:4200/account/accountconfirmation/${user[0].email_token}' target='_blank'>sur ce lien</a>.
        `,
      },
    )

    res.sendStatus(200)

  } catch (error) {
    res.sendStatus(400)
    console.error(error)
  }
})

app.post('/account/accountconfirmation', async (req, res) => {
  let { token } = req.body

  try {
    const check = jwt.verify(token, process.env.TOKEN_KEY)

    const user = await prisma.users.findMany({
      where: {
        uid: check.uid,
        is_email_verified: false,
        email_token: token,
      },
    })

    if (!user[0]) throw new Error

    await prisma.users.update({
      where: {
        id: user[0].id,
      },
      data: {
        is_email_verified: true,
        email_token: null,
      },
    })

    res.sendStatus(200)

  } catch (error) {
    res.sendStatus(403)
    console.error(error)
  }
})

// LOGIN ________________________________________________________

app.post('/login', async (req, res) => {
  let { email, password } = req.body

  try {
    let user = await prisma.users.findMany({
      where: {
        email: email,
      },
    })

    if (!user[0]) throw new Error

    let hash = Base64.stringify(sha256(password))

    if (user[0].password !== hash) throw new Error

    let sessionToken = jwt.sign(
      {
        uid: user[0].uid
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h"
      })

    res.status(200).json(sessionToken)

  } catch (err) {
    res.sendStatus(401)
    console.error(err)
  }
})

// PASSWORD RECOVERY _____________________________________________________________

app.post('/passwordrecovery', async (req, res) => {
  let { email } = req.body

  try {
    let user = await prisma.users.findMany({
      where: {
        email: email,
        is_email_verified: true,
      },
    })

    if (!user[0]) throw new Error

    let passwordToken = jwt.sign(
      {
        email: email,
      },
      process.env.TOKEN_KEY,
    )

    await prisma.users.update({
      where: {
        id: user[0].id,
      },
      data: {
        password_token: passwordToken,
      },
    })

    await transporter.sendMail(
      {
        from: 'account@ffcc.fr',
        to: email,
        subject: 'Reinitialisation de votre mot de passe FFCC',
        html: `
          Bonjour ${user[0].firstname},<br><br>
          Pour reinitialiser votre mot de passe, merci de suivre <a href='http://localhost:4200/account/passwordrecovery/newpassword/${passwordToken}' target='_blank'>ce lien</a>.
        `,
      },
    )

    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(401)
    console.error(err)
  }
})

app.post('/account/password/sendNewMail', async (req, res) => {
  let { email } = req.body

  try {
    const user = await prisma.users.findMany({
      where: {
        email: email,
      },
    })

    if (!user[0]) throw new Error

    await transporter.sendMail(
      {
        from: 'account@ffcc.fr',
        to: email,
        subject: 'Reinitialisation de votre mot de passe FFCC',
        html: `
          Bonjour ${user[0].firstname},<br><br>
          Pour reinitialiser votre mot de passe, merci de suivre <a href='http://localhost:4200/account/passwordrecovery/newpassword/${user[0].password_token}' target='_blank'>ce lien</a>.
        `,
      },
    )

    res.sendStatus(200)

  } catch (error) {
    res.sendStatus(400)
    console.error(error)
  }
})

app.post('/account/password/jwtverify', async (req, res) => {
  let { token } = req.body

  try {
    let check = jwt.verify(token, process.env.TOKEN_KEY)

    let user = await prisma.users.findMany({
      where: {
        email: check.email,
        password_token: token,
      },
    })

    if (!user[0]) throw new Error

    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(401)
    console.error(err)
  }
})

app.post('/account/password/getNewPassword', async (req, res) => {
  let { password, passwordToken } = req.body

  try {
    let user = await prisma.users.findMany({
      where: {
        password_token: passwordToken,
      },
    })

    let hash = sha256(password)
    let finalHash = Base64.stringify(hash)

    await prisma.users.update({
      where: {
        id: user[0].id,
      },
      data: {
        password: finalHash,
        password_token: null,
      },
    })

    res.sendStatus(200)

  } catch (err) {
    res.sendStatus(401)
    console.error(err)
  }
})

// YOUTH CARD REQUESTS _________________________________________________________
app.post('/card/request', async (req, res) => {
  let { id, tel, birthdate, idPhoto, idCard, student, studentCard = null } = req.body

  try {
    // On vérifie si une demande n'existe pas déjà
    let getRequest = await prisma.youth_card_requests.findMany({
      where: {
        user_id: id
      }
    })

    if (getRequest[0]) throw new Error()

    // On créer une nouvelle demande de carte jeune qu'on lie à l'user
    // il reste encore à stocker les différents documents (idPhoto,..)
    await prisma.youth_card_requests.create({
      data: {
        user_id: id
      }
    })

    // Si pas de demande existante, met à jours l'user avec les nouvelles informations
    await prisma.users.update({
      where: {
        id: id
      },
      data: {
        birthdate: new Date(birthdate),
        tel: parseInt(tel),
        student: student
      }
    })

    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

app.post('/user/card/get', async (req, res) => {
  let { userId } = req.body

  try {
    let result = await prisma.youth_cards.findMany({
      where: {
        user_id: userId
      }
    })

    res.status(200).json(result[0])
  } catch (err) {
    console.error(err.message)
    res.sendStatus(400)
  }
})

app.post('/user/session/get', async (req, res) => {
  let { sessionToken } = req.body

  try {
    let check = await jwt.verify(sessionToken, process.env.TOKEN_KEY)

    let user = await prisma.users.findMany({
      where: {
        uid: check.uid
      }
    })

    if (!user[0]) throw new Error()

    res.status(200).json(user[0])
  } catch (err) {
    console.error(err.message)
    res.sendStatus(401)
  }
})
