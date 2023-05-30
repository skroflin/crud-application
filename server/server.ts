import express from 'express';
import http from 'http';
import { timeMiddleware } from './logs';

const app = express()
const server = http.createServer(app)

app.use(timeMiddleware) //logging

app.get('/health', (req, res) => {
    res.sendStatus(200)
});

app.use(express.json({limit:'250mb'})) // support json encoded bodies
app.use(express.urlencoded({limit:'250mb', extended: true})) // support encoded bodies

app.use("/api/department", require("./department/routes"))
app.use("/api/employee", require("./employee/routes"))

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});