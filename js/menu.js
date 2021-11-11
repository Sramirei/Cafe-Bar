// variables and constants
const menuList = document.querySelector(".menu-container");
//const carritos = document.querySelector(".carrito");

let cartItemID = 1;

eventListeners();

// all event listeners
function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    loadJSON();
  });

  // show/hide cart container
  //carritos.addEventListener("click", vercarrito);
  menuList.addEventListener("click", comprar);
}

function vercarrito() {
  location.href = "carrito.html";
}

// load product items content form JSON file
function loadJSON() {
  fetch("menu.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((product) => {
        html += `
                <div class="col-lg-6 menu-item filter-starters">
                    <a class="ide">${product.id}</a>
                    <img src="${product.imgSrc}" class="menu-img" alt="">
                    <div class="menu-content">
                        <a href="#" class="nombre">${product.title}</a>
                        <span class="precio">${product.precio}</span>
                    </div>
                    <div class="menu-ingredients">
                        <a class="descrip">${product.descripcion}</a>
                            <i class="bi-cart add-to-cart-btn"></i>
                    </div>
                </div>
            `;
      });
      menuList.innerHTML = html;
    })
    .catch((error) => {
      //alert(`User live server or local server`);
      //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    });
}
// purchase product
function comprar(e) {
  if (e.target.classList.contains("add-to-cart-btn")) {
    let product = e.target.parentElement.parentElement;
    getProductInfo(product);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Gracias",
      text: "Ha sido añadido al carrito",
      showConfirmButton: false,
      timer: 1800,
    });
  }
}

// get product info after add to cart button click
function getProductInfo(product) {
  let productInfo = {
    //id: cartItemID,
    id:  product.querySelector(".ide").textContent,
    imgSrc: product.querySelector(".menu-img").src,
    title: product.querySelector(".nombre").textContent,
    descripcion: product.querySelector(".descrip").textContent,
    precio: product.querySelector(".precio").textContent,
  };
  cartItemID++;
  saveProductInStorage(productInfo);
}

// save the product in the local storage
function saveProductInStorage(item) {
  let products = getProductFromStorage();
  products.push(item);
  localStorage.setItem("menu", JSON.stringify(products));
}


// get all the products info if there is any in the local storage
function getProductFromStorage() {
  return localStorage.getItem("menu")
    ? JSON.parse(localStorage.getItem("menu"))
    : [];
  // returns empty array if there isn't any product info
}
