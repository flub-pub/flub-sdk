import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const server = express()
const port = 9898

server.get('/', (req, res) => {
    console.log(process.cwd())
    res.sendFile(path.join(process.cwd(), '/test/web/web.html'))
})

server.get('/index.js', (req, res) => {
    console.log(process.cwd())
    res.sendFile(path.join(process.cwd(), '/build/index.js'))
})

server.get('/index.js.map', (req, res) => {
    console.log(process.cwd())
    res.sendFile(path.join(process.cwd(), '/build/index.js.map'))
})

server.get('/get-admin-token', (req, res) => {
    res.send({adminToken: '070cea17-cd77-4a18-ba51-c08f99a1c23e'})
})

server.listen(port, () => {
    console.log(`FlubSDK browser demo started at http://localhost:${port}`)
})
