require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from React build
app.use(express.static(path.resolve(__dirname, '../client/build')))

// Serve uploaded images
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(fileUpload({}))

// API routes
app.use('/api', router)

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

// Error handling middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Production server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()