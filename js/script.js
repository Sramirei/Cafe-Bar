// variables and constants
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.querySelector(".carrito");
const basura = document.getElementById(".basura");

eventListeners();

// all event listeners
function eventListeners() {
  document.addEventListener("DomContentLoaded", leerLocalStorageCompra());

  document.addEventListener("change", (e) => {
    obtenerEvento(e);
  });
  document.addEventListener("keyup", (e) => {
    obtenerEvento(e);
  });

  calcularTotal();
}

function comprar() {
  location.href = "compra.html";
}

function getProductFromStorage() {
  return localStorage.getItem("menu")
    ? JSON.parse(localStorage.getItem("menu"))
    : [];
  // returns empty array if there isn't any product info
}

function leerLocalStorageCompra() {
  let productosLS;
  productosLS = this.getProductFromStorage();
  productosLS.forEach(function (item) {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>
              <img src="${item.imgSrc}" width=100>
          </td>
          <td>${item.title}</td>
          <td>${item.precio}</td>
          <td> 
              <input type="number" id="tex" class="form-control cantidad" min="1" value=${
                item.cantidad
              }> 
              
          </td>
          <td id='subtotales'>${item.precio * item.cantidad}</td>
          <td>
              <a href="#" id="basura${item.id}" onClick='eliminarCarrito(${
      item.id
    })' class="borrar-producto" style="font-size:30px" data-id="${
      item.id
    }"><i class="bi bi-trash"></i></a>
          </td>
      `;
    listaCompra.appendChild(row);
  });
}

function eliminarCarrito(elemento) {
  let borrarElemento = "basura" + elemento;
  alert(borrarElemento);
  //var node = document.getElementById(borrarElemento);
  //node.parentNode.removeChild(node);
}

//Calcular montos
function calcularTotal() {
  let productosLS;
  let total = 0,
    igv = 0,
    subtotal = 0;
  productosLS = this.getProductFromStorage();
  for (let i = 0; i < productosLS.length; i++) {
    let element = Number(productosLS[i].precio * productosLS[i].cantidad);
    total = total + element;
    console.log(total);
  }

  igv = parseFloat(total * 0.1).toFixed(2);
  subtotal = parseFloat(total - igv).toFixed(2);

  document.getElementById("subtotal").innerHTML = "S/. " + subtotal;
  document.getElementById("igv").innerHTML = "S/. " + igv;
  document.getElementById("total").value = "S/. " + total.toFixed(2);
  let valorfinal = localStorage.setItem(
    "ValorF",
    document.getElementById("total").value
  );
}

function obtenerEvento(e) {
  e.preventDefault();
  let id, cantidad, producto, productosLS;
  if (e.target.classList.contains("cantidad")) {
    producto = e.target.parentElement.parentElement;
    id = producto.querySelector("a").getAttribute("data-id");
    cantidad = producto.querySelector("input").value;
    let actualizarMontos = document.querySelectorAll("#subtotales");
    productosLS = this.getProductFromStorage();
    productosLS.forEach(function (productoLS, index) {
      if (productoLS.id === id) {
        productoLS.cantidad = cantidad;
        actualizarMontos[index].innerHTML = Number(
          cantidad * productosLS[index].precio
        );
      }
    });
    localStorage.setItem("menu", JSON.stringify(productosLS));
  } else {
    console.log("click afuera");
  }
}
