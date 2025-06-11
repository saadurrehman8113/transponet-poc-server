const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");

const qrCodeRouter = require("./src/routes/qrCode.routes");
const { initializeWebSocketServer } = require("./src/sockets/socketServer");

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api", qrCodeRouter);

initializeWebSocketServer(server);

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running!" });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
