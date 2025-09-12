// Cargar EmailJS desde CDN
const script = document.createElement("script");
script.src =
  "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
script.onload = () => {
  // Inicializar EmailJS cuando el script se carga
  emailjs.init("BAOiaqoOM2VmIOkax"); // Reemplaza con tu Public Key de EmailJS
};
document.head.appendChild(script);

const main = () => {
  const btnFormContacto = document.getElementById("btn-form-contacto");
  if (btnFormContacto)
    btnFormContacto.addEventListener("click", () => {
      emailjs
        .sendForm(
          "service_6ns26lz",
          "k4rwn3r",
          "#form-contacto",
          "BAOiaqoOM2VmIOkax",
        )
        .then(
          (result) => {
            console.log("Email enviado:", result.text);
          },
          (error) => {
            console.error("Error al enviar el email:", error);
          },
        );
    });
};

window.addEventListener("DOMContentLoaded", main);
