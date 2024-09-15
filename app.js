const express = require('express')
const app = express()

app.listen(8888)

const channelRouter = require('./routes/channels')
const userRouter = require('./routes/users')

app.use("/", userRouter)
app.use("/channels", channelRouter)