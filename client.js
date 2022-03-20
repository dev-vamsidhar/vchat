import { io } from "socket.io-client";
// const socket = io("http://localhost:3002", {
//   secure: true,
// });

const socket = io("https://vchat-01.herokuapp.com/", {
  secure: true,
});

socket.on("connect_error", (err) => console.log(err));
socket.on("connect_failed", (err) => console.log(err));
socket.on("disconnect", (err) => console.log(err));
document.getElementById("btsend").addEventListener("click", sendmessage, false);
var url = new URL(window.location.href);
var id = url.searchParams.get("id");
// Get the input field
var input = document.getElementById("inputmessage");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendmessage();
  }
});

function sendmessage() {
  var message = document.getElementById("inputmessage").value;
  if (message === "") return;
  socket.emit("send-msg", message, id);
  document.getElementById("inputmessage").value = "";
  var ul = document.getElementById("messages-list");
  var li = document.createElement("li");
  li.setAttribute("id", "sent");
  li.appendChild(document.createTextNode(message));
  ul.appendChild(li);
}

socket.on("receive", (message) => {
  var ul = document.getElementById("messages-list");
  var li = document.createElement("li");
  li.setAttribute("id", "receive");
  li.appendChild(document.createTextNode(message));
  ul.appendChild(li);
});

if (id != "") {
  socket.emit("join-room", id);
}
