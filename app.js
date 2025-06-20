const express = require("express")
const { APP } = require("./config/config")
const dotenv = require('dotenv')
const app = express()

dotenv.config()
const connectTODb = require('./config/dbConfig')
const cookieParser = require("cookie-parser")
connectTODb()

app.use(express.json({ limit: '1gb' }))
app.use(express.urlencoded({ extended: true, limit: '1gb' }))
app.use(cookieParser())

app.use("/api/v1", require("./src/routers/index"))

app.listen(APP.PORT, () => console.log(`server started on port ${APP.PORT}`))