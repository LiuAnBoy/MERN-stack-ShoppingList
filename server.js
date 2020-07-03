const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const path = require('path')

const items = require('./routes/api/items')

const app = express()

// BodyParser Middleware
app.use(bodyParse.json())

// DB Config
const db = require('./config/keys').mongoURI

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err))

// Use Routes
app.use('/api/items', items)

// Serve static assets if in producion
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 8008

app.listen(port, () => console.log(`Server started on port ${port}`))
