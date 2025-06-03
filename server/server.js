const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const db = require('./config/db')   

require('dotenv').config()

//middlewares
const { swaggerUi, swaggerSpec } = require('./middleware/swagger')  

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan('dev', {
  skip: function (req, res) {
    return req.url.startsWith('/api-docs')
  }
}))

//imported routes
const userRoutes = require('./routes/R_User')
const notesRoutes = require('./routes/R_Notes')

app.use('/api', userRoutes)
app.use('/api', notesRoutes)

//global error handler
const errorHander = require('./middleware/errorHandler')
app.use(errorHander)


app.get('/test', (req, res) => {
  res.send('Server running')
})


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${3000}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
})