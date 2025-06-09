import express from 'express'
import fs from 'node:fs'
import https from 'node:https'
import cors from 'cors'
import { config } from 'dotenv'
import { abs } from './util.js'

config()

const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static('./public'))

app.get('/myaccount/summary', (req, res) => {
  res.sendFile(abs('./pages/index.html'))
})

app.get('/signin', (req, res) => {
  res.sendFile(abs('./pages/login.html'))
})

app.get('/api/balance', (req, res) => {
  res.status(200).json({ balance: process.env.BALANCE })
})

app.use((req, res) => {
  const referer = req.get('referer')

  const fromPaypal = referer && referer.includes('paypal.com')
  const fromSignout = referer && referer.includes('signout')

  if (!fromPaypal) {
    res.sendFile(abs('./partials/redirect.html'))
    return
  }

  const urlPath = fromSignout ? req.originalUrl : ''
  const originalUrl = `https://${req.get('host')}${urlPath}`

  const returnUri = encodeURIComponent(originalUrl)

  setTimeout(() => res.redirect(`/signin?returnUri=${returnUri}`), 1000)
})

app.use((err, req, res, next) => {
  res.status(204).end()
})

const options = {
  cert: fs.readFileSync('./www.paypal.com+3.pem'),
  key: fs.readFileSync('./www.paypal.com+3-key.pem'),
}

https.createServer(options, app).listen(443, () => {
  console.log('Running')
})
