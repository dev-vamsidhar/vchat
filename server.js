var app = express();
var server = app.listen(process.env.PORT);
var cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});
const io = require("socket.io")(server, {
  origins: ["http://localhost:8080"],

  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Max-Age": "1800",
      "Access-Control-Allow-Methods": "GET,POST",
      "Access-Control-Allow-Headers": "my-custom-header",
      "Access-Control-Allow-Credentials": true,
    });
    res.end();
  },
});
httpServer.listen(process.env.PORT);
console.log("started");
io.on("connection", (socket) => {
  socket.on("send-msg", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive", message);
    } else {
      socket.to(room).emit("receive", message);
    }
  });
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log("they joined the room " + room);
  });
});
