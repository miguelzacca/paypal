import { abs } from './util.js'

export function navigationHandler(req, res) {
  const referer = req.get('referer')
  const fromPaypal = referer && referer.includes('paypal.com')

  if (!fromPaypal) {
    res.sendFile(abs('./partials/redirect.html'))
    return
  }

  let urlQuery = ''
  const isSignout = req.originalUrl.includes('signout')

  if (!isSignout) {
    const originalUrl = `https://${req.get('host')}${req.originalUrl}`
    const returnUri = encodeURIComponent(originalUrl)
    urlQuery = `?returnUri=${returnUri}`
  }

  setTimeout(() => res.redirect(`/signin${urlQuery}`), 1000)
}

export function igoreErrors(err, req, res, next) {
  res.status(204).end()
}
