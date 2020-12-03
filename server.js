const express = require("express")
const db = require("./database")

const server = express()

// middleware that helps parse JSON bodies
server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "hello, world" })
})

server.get("/users", (req, res) => {
    const users = db.getUsers()

    res.json(users)
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "user not found"
        })
    }
})

server.post("/users", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: "Need a user name",
        })
    }

    const newUser = db.createUser({
        name: req.body.name,
    })
    res.status(201).json(newUser)
})

server.put("/users/:id", (req, res) => {
    const id = req.params.id
    const user = getUserById(id)

    if (user) {
        //user exist, continue with updating
        const updatedUser = db.updateUser(id, {
            // be specific with values being updated
            // rather than passing `req.bodydirectly            
            name: req.body.name || user.name
        })
        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "user not found",
        })
    }
})

server.delete("/users/:id", (req, res) => {
    const id = req.params.id
    const user = getUserById(id)

    if (user) {
        db.deleteUser(id)

        // send back empty success response
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "user not found",
        })
    }
})

server.listen(8080, () => {
    console.log('server started')
})