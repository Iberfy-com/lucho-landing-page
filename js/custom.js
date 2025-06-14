$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("header").addClass("sticky");
    } else {
      $("header").removeClass("sticky");
    }
  });
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

  // $(".btn-service").on("click", function (e) {
  //   e.preventDefault();
  //   const service = $(this).data("service");
  //   const modal = $(`#${service}-modal`);
  //   modal.addClass("show");
  // });

  $(".modal-close").on("click", function (e) {
    e.preventDefault();
    $(".modal-custom").removeClass("show");
  });

  $(".modal-mask").on("click", function (e) {
    e.preventDefault();
    $(".modal-custom").removeClass("show");
  });

  $(".modal-btn").on("click", function (e) {
    e.preventDefault();

    // Detectar qué modal está abierto para obtener el servicio
    const openModal = $(".modal-custom.show");
    let serviceValue = "";

    if (openModal.length > 0) {
      const modalId = openModal.attr("id");
      // Extraer el tipo de servicio del ID del modal
      if (modalId === "atencion-modal") {
        serviceValue = "atencion";
      } else if (modalId === "prospeccion-modal") {
        serviceValue = "prospeccion";
      } else if (modalId === "administrativo-modal") {
        serviceValue = "administrativo";
      } else if (modalId === "ventas-modal") {
        serviceValue = "ventas";
      } else if (modalId === "vendedor-modal") {
        serviceValue = "vendedor";
      } else if (modalId === "gestion-modal") {
        serviceValue = "gestion";
      }
    }

    // Cerrar el modal
    $(".modal-custom").removeClass("show");

    // Hacer scroll hacia el formulario de contacto usando smooth scroll nativo
    const contactSection = document.getElementById("section-contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Después del scroll, seleccionar el asunto y poner focus en el nombre
    setTimeout(function () {
      if (serviceValue) {
        $("#contact-subject").val(serviceValue);
      }

      // Añadir clase especial para animación y luego hacer focus
      const nameField = $("#contact-name");
      nameField.addClass("from-modal");
      nameField.focus();

      // Remover la clase después de la animación
      setTimeout(function () {
        nameField.removeClass("from-modal");
      }, 1500);
    }, 300);
  });
});
