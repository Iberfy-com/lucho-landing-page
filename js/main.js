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
    btnFormContacto.addEventListener("click", (e) => {
      e.preventDefault();

      // Limpiar errores previos
      clearErrors();

      // Obtener valores del formulario
      const nombre = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const telefono = document.getElementById("contact-phone").value.trim();
      const asunto = document.getElementById("contact-subject").value;
      const mensaje = document.getElementById("contact-message").value.trim();

      // Validar campos y marcar errores
      let hasErrors = false;

      if (!nombre) {
        showFieldError("contact-name", "El nombre es obligatorio");
        hasErrors = true;
      }

      if (!email) {
        showFieldError("contact-email", "El correo electrónico es obligatorio");
        hasErrors = true;
      } else {
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showFieldError(
            "contact-email",
            "Ingresa un correo electrónico válido",
          );
          hasErrors = true;
        }
      }

      if (!telefono) {
        showFieldError("contact-phone", "El teléfono es obligatorio");
        hasErrors = true;
      }

      if (!mensaje) {
        showFieldError("contact-message", "El mensaje es obligatorio");
        hasErrors = true;
      }

      // Si hay errores, no continuar
      if (hasErrors) {
        return;
      }

      // Construir mensaje para el template
      const templateParams = {
        from_name: nombre,
        from_email: email,
        phone: telefono,
        subject: asunto,
        message: `Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Asunto: ${asunto}

Mensaje:
${mensaje}`,
      };

      // Enviar email
      emailjs
        .send(
          "service_6ns26lz",
          "template_85bt0vu",
          templateParams,
          "BAOiaqoOM2VmIOkax",
        )
        .then(
          (result) => {
            console.log("Email enviado:", result.text);
            showSuccessMessage(
              "¡Mensaje enviado exitosamente! Nos estaremos contactando contigo pronto.",
            );
            document.getElementById("form-contacto").reset();
          },
          (error) => {
            console.error("Error al enviar el email:", error);
            showErrorMessage(
              "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.",
            );
          },
        );
    });
};

// Función para mostrar error en un campo
const showFieldError = (fieldId, message) => {
  const field = document.getElementById(fieldId);
  const formGroup = field.closest(".form-group");

  // Agregar borde rojo al campo
  field.style.border = "2px solid #dc3545";
  field.style.borderRadius = "5px";

  // Crear o actualizar mensaje de error
  let errorMsg = formGroup.querySelector(".error-message");
  if (!errorMsg) {
    errorMsg = document.createElement("small");
    errorMsg.className = "error-message text-danger mt-1 d-block";
    formGroup.appendChild(errorMsg);
  }
  errorMsg.textContent = message;
};

// Función para limpiar todos los errores
const clearErrors = () => {
  // Limpiar bordes rojos
  const fields = [
    "contact-name",
    "contact-email",
    "contact-phone",
    "contact-message",
  ];
  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    field.style.border = "";
    field.style.borderRadius = "";
  });

  // Remover mensajes de error
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());

  // Limpiar mensajes de éxito/error generales
  const existingMessages = document.querySelectorAll(".form-message");
  existingMessages.forEach((msg) => msg.remove());
};

// Función para mostrar mensaje de éxito
const showSuccessMessage = (message) => {
  const form = document.getElementById("form-contacto");
  const messageDiv = document.createElement("div");
  messageDiv.className = "form-message alert alert-success mt-3";
  messageDiv.innerHTML = `<i class="ti ti-check-circle me-2"></i>${message}`;
  form.appendChild(messageDiv);

  // Scroll hacia el mensaje
  messageDiv.scrollIntoView({ behavior: "smooth", block: "center" });

  // Remover mensaje después de 5 segundos
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
};

// Función para mostrar mensaje de error general
const showErrorMessage = (message) => {
  const form = document.getElementById("form-contacto");
  const messageDiv = document.createElement("div");
  messageDiv.className = "form-message alert alert-danger mt-3";
  messageDiv.innerHTML = `<i class="ti ti-alert-circle me-2"></i>${message}`;
  form.appendChild(messageDiv);

  // Scroll hacia el mensaje
  messageDiv.scrollIntoView({ behavior: "smooth", block: "center" });
};

window.addEventListener("DOMContentLoaded", main);
