// $(function() {
//     $("#fecha").datepicker({
//         autoSize: true,
//         dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
//         dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
//         firstDay: 1,
//         monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
//         monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
//         dateFormat: 'dd/mm/yy',
//         minDate: 0,
//         changeYear: true,
//         changeMonth: true,
//         /*numberOfMonths: 2,
//         showButtonPanel: true*/
//         /*changeYear: true*/
//     });
// });

// Esta parte es con la que hice el contador del textarear

const indicaciones = document.getElementById('indicaciones');
const contador = document.getElementById('contador');

indicaciones.addEventListener('input', function(e) {
    const target = e.target;
    const longitudMax = target.getAttribute('maxlength');
    const longitudAct = target.value.length;
    contador.innerHTML = `${longitudAct}/${longitudMax}`;
});

//Aqui empieza la validacion de datos de los campos.

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    documento: /^\d{4,10}$/, // 4 a 10 digitos.
    personas: /^\d{1,2}$/, // 1 a 2 digitos.
    fecha: /^\S{10}$/, // Fecha aaaa-mm-dd.
    horas: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, // Sistema horario de 24 horas hh:mm

};

const campos = {
    nombre: false,
    email: false,
    documento: false,
    telefono: false,
    servicio: false,
    personas: true,
    indicaciones: true,
    fecha: true,
    hora: true

}

const ValidarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            ValidarCampo(expresiones.nombre, e.target, "nombre");
            break;
        case "email":
            ValidarCampo(expresiones.correo, e.target, "email");
            break;
        case "documento":
            ValidarCampo(expresiones.documento, e.target, "documento");
            break;
        case "telefono":
            ValidarCampo(expresiones.telefono, e.target, "telefono");
            break;
        case "personas":
            ValidarCampo(expresiones.personas, e.target, "personas");
            break;
        case "fecha":
            ValidarCampo(expresiones.fecha, e.target, "fecha");
            break;
        case "hora":
            ValidarCampo(expresiones.horas, e.target, "hora");
            break;
        case "servicio":
            validarSelect(e.target, "servicio");
            break;
    }
};

const ValidarCampo = (expresiones, input, campo) => {
    if (expresiones.test(input.value)) {
        document
            .getElementById(`grupo__${campo}`)
            .classList.remove("formulario__grupo-incorrecto");
        document
            .getElementById(`grupo__${campo}`)
            .classList.add("formulario__grupo-correcto");
        document
            .querySelector(`#grupo__${campo} .formulario__input-error`)
            .classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    } else {
        document
            .getElementById(`grupo__${campo}`)
            .classList.add("formulario__grupo-incorrecto");
        document
            .getElementById(`grupo__${campo}`)
            .classList.remove("formulario__grupo-correcto");
        document
            .querySelector(`#grupo__${campo} .formulario__input-error`)
            .classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
    console.log(input.value + " -- " + campos[campo]);

};

function validarSelect(campo) {
    var servicio = document.getElementById(campo);

    if (servicio.value == 0 ||
        servicio.value == "") {
        document.getElementById(`grupo__${campo}`).classList.add("formulario__select-error");
        document.getElementById(`grupo__${campo}`).classList.remove(".formulario__select-correcto");
        document.querySelector(`#grupo__${campo} .formulario__select-error`)
            .classList.add("formulario__select-error-activo");
        campos[campo] = false;
    } else {
        document
            .getElementById(`grupo__servicio`)
            .classList.remove("formulario__select-error");
        document
            .getElementById(`grupo__servicio`)
            .classList.add(".formulario__select-correcto");
        document
            .querySelector(`#grupo__servicio .formulario__select-error`)
            .classList.remove("formulario__select-error-activo");
        campos[campo] = true;
    }

    console.log(servicio.value + " -- " + campos[campo]);

}


inputs.forEach((input) => {
    input.addEventListener("keyup", ValidarFormulario);
    input.addEventListener("blur", ValidarFormulario);
});



$(document).ready(function() {
    $("#formulario").on("submit", function(event) {
        event.preventDefault();

        validarSelect("servicio");

        if (campos.nombre &&
            campos.email &&
            campos.documento &&
            campos.telefono &&
            campos.servicio &&
            campos.personas &&
            campos.hora &&
            campos.fecha &&
            terminos.checked) {

            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

            document.querySelectorAll('.formulario__grupo-correcto').forEach((error) => {
                error.classList.remove('formulario__grupo-correcto');
            });

            localStorage.setItem("nombre", $("#nombre").val());
            localStorage.setItem("email", $("#email").val());
            localStorage.setItem("documento", $("#documento").val());
            localStorage.setItem("telefono", $("#telefono").val());
            localStorage.setItem("servicio", $("#servicio").val());
            localStorage.setItem("personas", $("#personas").val());
            localStorage.setItem("fecha", $("#fecha").val() + " " + $("#hora").val());
            localStorage.setItem("indicaciones", $("#indicaciones").val());

            $("#formulario")[0].reset();

            window.location.replace("confirmar-reserva.html");

        } else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        }

    });
});