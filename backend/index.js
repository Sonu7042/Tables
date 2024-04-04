const express = require("express")
const cors = require('cors')
const jwt=require('jsonwebtoken')
const seceret_key="passwordfor"

const connection = require('./db')
const app = express()
app.use(cors())
app.use(express.json())
app.listen(9000, () => {
    console.log("server is listening...")
})



app.get('/', (req, res) => {
    const query = 'select * from customers'
    connection.query(query, (err, rows) => {
        if (err) { throw err }

        res.status(200).json({
            message: "Data is got successfully",
            data: rows
        })
    })
})


app.post("/add", (req, res) => {
    const user = req.body
    const query = "insert into customers set ?"
    connection.query(query, [user], (err, rows) => {
        if (err) { throw err }

        res.status(200).json("user added successfully")
    })
})

app.get('/delete/:id', (req, res) => {
    const id = req.params.id
    const query = "delete from customers where id= ?"
    connection.query(query, [id], (err, rows) => {
        if (err) { throw err }

        res.status(200).json({
            message: "User delete successfully"

        })
    })
})

app.patch('/update/:id', (req, res) => {
    const id = req.params.id
    const { firstName, lastName, address } = req.body
    // console.log(firstName, lastName, address, id)
    const query = "update customers set firstName=?, lastName=?, address=? where id=?"
    connection.query(query, [firstName, lastName, address, id], (err, rows) => {
        if (err) { throw err }

        res.status(200).json({
            message: "updated successfully"
        })
    })
})




//Sign up route
app.post('/signup', (req, res) => {
    const { username, password } = req.body
    const query = "insert into  users (username, password) values (?,?)"
    connection.query(query, [username, password], (err, result) => {
        if (err) {
            res.status(200).json({ success: false, message: "failed to create user" })
        }
        else {
            const token=jwt.sign({username}, seceret_key)
            res.cookie("token",token, {httpOnly:true})
            res.status(200).json({ success: true, message: "user create successfully", token:token })
        }

       
    })

})


app.post('/login', (req, res) => {
    const { username, password } = req.body
    const query = "select * from users where username = ? and password = ?"
    connection.query(query, [username, password], (err, result) => {
        if (err) {
            res.status(400).json({ success: false, message: "Autication failed" })
        }
        else {
            if (result.length > 0) {
                const token=jwt.sign({username}, seceret_key)
                res.cookie("token",token, {httpOnly:true})
                res.status(200).json({ success: true, message: "Login Successfully", token:token })
            }
            else {
               
                res.status(400).json({ success: false, message: "Incorrect username or password" })
            }
        }
    })
})






