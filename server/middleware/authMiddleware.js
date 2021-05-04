const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  console.log('auth Middleware');

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    console.log(decoded, 'decoded'); //{ id: '63', phone: '7', iat: 1620160434, exp: 1620246834 }
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: 'Not authorized' })
  }
}
