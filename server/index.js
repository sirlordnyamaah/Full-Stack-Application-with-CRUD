const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const db = require('./queries')
const PORT = process.env.PORT || 9001

// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(express.static(path.resolve(__dirname, '../client/build')))

//Routes section
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.get('/tracker', db.getData)
app.get('/tracker/:id',db.getUserById)
app.post('/tracker', db.createData)
app.put('/tracker/:id', db.updateUser)
app.delete('/tracker/:id', db.deleteUser)

//start of express on port section
app.listen(PORT, ()=>{
    console.log(`The app is running on port ${PORT}.`)
})