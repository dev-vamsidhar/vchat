document.getElementById("join").addEventListener("click", join, false);
function join() {
  var id = document.getElementById("joinid").value;
  console.log(id);
  window.location.href = "/index.html?id=" + id;
}
