const express = require('express')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')

// App setup
const app = express()

// App port
const PORT = 3000

// Use body parse for JSON
app.use(bodyParser.json())

app.use(basicAuth({
  authorizer: (username, password) => {
    const userMatches = basicAuth.safeCompare(username, 'admin')
    const passwordMatches = basicAuth.safeCompare(password, 'secret')
    return userMatches & passwordMatches
  }, 
  unauthorizedResponse: (req) => {
    return `Unauthorized. You must authenticate. Your ip: ${req.ip}`
  }
}))


// Route
app.get('/api/auth', (req, res) => {
  res.send('authorized');
});

// Start express on port 3000
app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`)
})