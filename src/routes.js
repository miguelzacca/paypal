import { Router } from 'express'
import { abs } from './util.js'

const router = Router()

router.get('/myaccount/summary', (req, res) => {
  res.sendFile(abs('./pages/index.html'))
})

router.get('/signin', (req, res) => {
  res.sendFile(abs('./pages/login.html'))
})

router.get('/api/balance', (req, res) => {
  res.status(200).json({ balance: process.env.BALANCE })
})

export { router as routes }
