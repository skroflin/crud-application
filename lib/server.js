"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
app.get('/health', function (req, res) {
    res.sendStatus(200);
});
app.use(express_1.default.json({ limit: '250mb' })); // support json encoded bodies
app.use(express_1.default.urlencoded({ limit: '250mb', extended: true })); // support encoded bodies
//app.use("/api/login", require("./login/routes"))
//app.use("/api/department", require("./department/routes"))
//app.use("/api/employee", require("./employee/routes"))
var PORT = process.env.PORT || 3001;
server.listen(PORT, function () {
    console.log('Server listening on ${PORT}');
});
