import express from 'express'
import fs from 'node:fs'
import https from 'node:https'
import cors from 'cors'
import { config } from 'dotenv'
import { routes } from './routes.js'
import { navigationHandler, igoreErrors } from './middleware.js'

config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static('./public'))

app.use(routes)
app.use(navigationHandler)
app.use(igoreErrors)

const httpsConfig = {
  cert: fs.readFileSync('./www.paypal.com+3.pem'),
  key: fs.readFileSync('./www.paypal.com+3-key.pem'),
}

https.createServer(httpsConfig, app).listen(443, () => {
  console.log('Running')
})
