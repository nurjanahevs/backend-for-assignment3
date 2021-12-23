const express = require("express");
const router = require("./routers/routes");
let cors = require("cors");
const mongooseConnect = require("./config/server");
const bodyParser = require("body-parser");
const http = require("http");

mongooseConnect();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/images", express.static("images"));
app.use(bodyParser.json());
app.use(router);
app.use(express.json());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App Run on port ${port}`);
});

// app.listen(port, () => {
//     console.log(`App Run on http://localhost:${port}`)
// })
