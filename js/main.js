const menuContent = document.getElementById("menuContent");
const carritoContent = document.getElementById("carritoContent");
//----------variables----------//
let carrito = [];
let compras = JSON.parse(localStorage.getItem("compras")) || [];
//-------------obtener menu----------------//
function getMenu() {
  return new Promise((resolve, reject) => {
    fetch("menu.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((burger) => {
          let content = document.createElement("div");
          content.className = "hambur";
          content.innerHTML = `
            <img src="${burger.img}">
            <h3>${burger.nombre}</h3>
            <p class="valor">$${burger.precio}</p>
          `;
//----------------boton agregar carrito--------------//
          let agregar = document.createElement("button");
          agregar.innerText = "Agregar al carrito🛒";
          agregar.className = "agrego";
          content.append(agregar);
//------------------cantidad de unidades--------------//
          let cantidadInput = document.createElement("input");
          cantidadInput.type = "number";
          cantidadInput.min = 0;
          cantidadInput.value = 0;
          content.append(cantidadInput);

          agregar.addEventListener("click", () => {
            const cantidad = parseInt(cantidadInput.value);
            if (cantidad > 0) {
              const subtotal = burger.precio * cantidad;
              carrito.push({
                id: burger.id,
                img: burger.img,
                nombre: burger.nombre,
                precio: burger.precio,
                cantidad: cantidad,
                subtotal: subtotal,
              });
              mostrarCarrito();
            }
          });

          menuContent.append(content);
        });

        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
//---------------------form----------------//
function mostrarFormulario() {
  carritoContent.innerHTML = "";

  let form = document.createElement("form");
  form.innerHTML = `
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required>
    <label for="direccion">Dirección:</label>
    <input type="text" id="direccion" name="direccion" required>
    <button type="submit">Guardar</button>
  `;
  
  carritoContent.append(form);
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    guardarCompra(nombre, direccion);
    //-----------sweetalert-----------------//
    Swal.fire({
      title: '¡Compra realizada!',
      text: '¡Gracias por tu compra!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  });}
//----------------guardar info--------------//
function guardarCompra(nombre, direccion) {
  const nuevaCompra = {
    nombre: nombre,
    direccion: direccion,
    carrito: carrito,
  };
  const comprasExistentes = JSON.parse(localStorage.getItem("compras")) || [];

  const comprasActualizadas = [...comprasExistentes, nuevaCompra];

  localStorage.setItem("compras", JSON.stringify(comprasActualizadas));
  carrito = [];
  mostrarCarrito();
}

function mostrarCarrito() {
  carritoContent.innerHTML = "";
  let total = 0;
//------------recorrer carrito--------------//
  carrito.forEach((item) => {
    let content = document.createElement("div");
    content.className = "carritoItem";
    content.innerHTML = `
      <img src="${item.img}">
      <h3>${item.nombre}</h3>
      <p>Cantidad: ${item.cantidad}</p>
      <p>Subtotal: $${item.subtotal}</p>
    `;
//------------------quitar--------------//
    let quitar = document.createElement("button");
    quitar.innerText = "Quitar un producto🍔";
    quitar.className = "quitar";
    content.append(quitar);

    quitar.addEventListener("click", () => {
      quitarElementoCarrito(item.id);
    });

    carritoContent.append(content);
    total += item.subtotal;
  });
//-----------------carrito total--------------//
  let totalElement = document.createElement("p");
  totalElement.className = "total";
  totalElement.innerText = `🛒Total: $${total}`;
  carritoContent.append(totalElement);

  let vaciarCarrito = document.createElement("button");
  vaciarCarrito.innerText = "Vaciar carrito🛒";
  vaciarCarrito.className = "vaciar";
  carritoContent.append(vaciarCarrito);

  vaciarCarrito.addEventListener("click", () => {
    carrito = [];
    mostrarCarrito();
  });
//-----------------boton comprar--------------//
  let comprarButton = document.createElement("button");
  comprarButton.innerText = "Comprar✅";
  comprarButton.className = "comprar";
  carritoContent.append(comprarButton);

  comprarButton.addEventListener("click", () => {
    mostrarFormulario();
  });
}
//---------------quitar elemento-------------//
function quitarElementoCarrito(id) {
  const index = carrito.findIndex((item) => item.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
      carrito[index].subtotal -= carrito[index].precio;
    } else {
      carrito.splice(index, 1);
    }
  }
  mostrarCarrito();
}

getMenu().then(() => {
  mostrarCarrito();
});

