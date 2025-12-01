//conn to postgres using node-postgres pack
require('dotenv').config()

const POOL = require('pg').Pool 

const pool =  new POOL({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

//read func DONE
const getData = (req, res) => {
    pool.query('SELECT * FROM tracker ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

//read by id DONE
const getUserById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM tracker WHERE id = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}


//create func DONE
const createData = (req, res) => {
    const {day, calories} = req.body

    pool.query('INSERT INTO tracker (day, calories) VALUES ($1, $2) RETURNING id', [day, calories], (error, results) => {
        if(error) {
            throw error
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

//update func
const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const {day, calories} = req.body

    pool.query(
        'UPDATE tracker SET day = $1, calories = $2 WHERE id = $3',
        [day, calories, id],
        (error, results) => {
            if(error) {
                throw error
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

//delete func
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM tracker WHERE id = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getData, createData, getUserById, updateUser, deleteUser,
}