const sessions = require('client-sessions')
const Tokens = require('csrf')

const createError = (code, message, original) => {
  const err = new Error(message)

  err.statusCode = code
  err.originalError = original

  return err
}

const tokens = new Tokens()
const safeMethods = /GET|HEAD|OPTIONS|TRACE/i

function CSRFSession ({ sessionName, secretKey }) {
  this.sessionName = sessionName
  this.secretKey = secretKey
}

CSRFSession.prototype.createSession = (req, res) => {
  const session = sessions({
    cookieName: this.sessionName,
    secret: this.secretKey,
    duration: 60 * 60 * 1000 // 60 mins
  })
  return new Promise(resolve => session(req, res, resolve))
}

CSRFSession.prototype.initCSRF = async (req, res) => {
  await this.createSession(req, res, this.sessionName)
  const secret = req[this.sessionName].csrfSecret || await tokens.secret()
  req.csrfToken = tokens.create(secret)
  req[this.sessionName].csrfSecret = secret
  return secret
}

CSRFSession.prototype.verify = (req) => {
  const token = req.headers['x-csrf-token']
  const { csrfSecret: secret } = req[this.sessionName]
  return tokens.verify(secret, token)
}

module.exports = options => async (req, res, next) => {
  const session = new CSRFSession(options)
  await session.initCSRF(req, res)
  if (safeMethods.test(req.method)) return next()

  if (session.verify(req)) return next()

  next(createError(403, 'Invalid CSRF Token', 'InvalidCSRFToken'))
}
