$(document).ready(function () {
  // copyrights Year Auto-update
  function newDate() {
    return new Date().getFullYear();
  }
  document.onload = document.getElementById("autodate").innerHTML = +newDate();

  $("#offcanvasExample .navbar-nav .nav-link").on("click", function () {
    $("#offcanvasExample").offcanvas("hide");
  });
  $("#offcanvasExample .login .btn").on("click", function () {
    $("#offcanvasExample").offcanvas("hide");
  });
});
