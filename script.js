document.addEventListener("DOMContentLoaded", function () {

    alert("¡Bienvenido a ActingVibes!");

    const reloj = document.getElementById("reloj");

    function actualizarReloj() {
        const fecha = new Date();
        reloj.textContent = "🕒 Hora actual: " +
            fecha.toLocaleTimeString("es-MX");
    }

    actualizarReloj();

    setInterval(actualizarReloj, 1000);
    


    const servicio = document.getElementById("servicio");

    servicio.addEventListener("change", function () {

        const opcion = servicio.options[servicio.selectedIndex];

        if (servicio.value !== "") {
            console.log("Servicio seleccionado: " + opcion.text);
            alert("🎭 Has seleccionado: " + opcion.text);
        }

    });



    const botones = document.querySelectorAll("button, #inicio a");

    botones.forEach(function (boton) {

        // Cuando el mouse entra al botón
        boton.addEventListener("mouseover", function () {
            console.log("Mouse sobre: " + boton.textContent.trim());
        });

        // Cuando el mouse sale del botón
        boton.addEventListener("mouseleave", function () {
            console.log("Mouse salió de: " + boton.textContent.trim());
        });

    });

    // ======================================
    // FORMULARIO Y ALMACENAMIENTO LOCAL
    // ======================================

    const formulario = document.querySelector("#contacto form");

    // Usar nuestras propias validaciones de JavaScript
    formulario.noValidate = true;

    formulario.addEventListener("submit", function (event) {

        // Evitar que la página se recargue
        event.preventDefault();

        // Obtener los datos del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const servicio = document.getElementById("servicio").value;
        const mensaje = document.getElementById("mensaje").value.trim();

        // VALIDAR CAMPOS VACÍOS
        if (
            nombre === "" ||
            correo === "" ||
            telefono === "" ||
            servicio === "" ||
            mensaje === ""
        ) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // VALIDAR CORREO ELECTRÓNICO
        const validarCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!validarCorreo.test(correo)) {
            alert("Ingresa un correo electrónico válido.");
            return;
        }

        // CREAR OBJETO CON LOS DATOS
        const contacto = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            servicio: servicio,
            mensaje: mensaje,
            fecha: new Date().toLocaleString("es-MX")
        };

        // RECUPERAR SOLICITUDES ANTERIORES
        const solicitudes = JSON.parse(
            localStorage.getItem("solicitudesActingVibes") || "[]"
        );

        // AGREGAR NUEVA SOLICITUD
        solicitudes.push(contacto);

        // GUARDAR EN LOCALSTORAGE
        localStorage.setItem(
            "solicitudesActingVibes",
            JSON.stringify(solicitudes)
        );

        // MOSTRAR CONFIRMACIÓN
        alert(
            "🎭 ¡Solicitud registrada correctamente!\n" +
            "Gracias por contactar a ActingVibes, " + nombre + "."
        );

        console.log("Solicitud registrada correctamente.");

        // LIMPIAR FORMULARIO
        formulario.reset();

    });


});