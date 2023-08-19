//----------crear form-----------//
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
    });
  }
  //----------------guardar compra-------------//
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
    
  };
  
  //-------------carrito-------------//
  function mostrarCarrito() {
    carritoContent.innerHTML = "";
    let total = 0;
  
    carrito.forEach((item) => {
      let content = document.createElement("div");
      content.className = "carritoItem";
      content.innerHTML = `
        <img src="${item.img}">
        <h3>${item.nombre}</h3>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Subtotal: $${item.subtotal}</p>
      `;
      //-----------quitar producto--------//
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
  //--------------calcular carrito----------//
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
  //--------opcion de comprar-------------//
    let comprarButton = document.createElement("button");
    comprarButton.innerText = "Comprar✅";
    comprarButton.className = "comprar";
    carritoContent.append(comprarButton);
  
    comprarButton.addEventListener("click", () => {
      mostrarFormulario();
    });
  }
  //-------------funcion de quitar------------//
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

