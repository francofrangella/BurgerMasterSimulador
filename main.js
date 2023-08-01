const menuContent = document.getElementById("menuContent"); 
const carritoContent = document.getElementById("carritoContent"); 
//-------menu--------// 
const menu = [ 
  { 
    id: 1, 
    nombre: "Simple", 
    precio: 1000, 
    img: "imgburg/simple.png" 
  }, 
  { 
    id: 2, 
    nombre: "Doble", 
    precio: 1500, 
    img: "imgburg/doble.png" 
  }, 
  { 
    id: 3, 
    nombre: "Pollo", 
    precio: 1300, 
    img: "imgburg/pollo.png" 
  }, 
  { 
    id: 4, 
    nombre: "Vegana", 
    precio: 1200, 
    img: "imgburg/vegana.png" 
  } 
]; 
let carrito = []; 
//--------recorrer menu--------// 
 menu.forEach((burger) => { 
  let content = document.createElement("div"); 
  content.className = "hambur"; 
  content.innerHTML = ` 
    <img src="${burger.img}"> 
    <h3>${burger.nombre}</h3> 
    <p class="valor">$${burger.precio}</p> 
  `; 
  //---------cantidad burger---------// 
  menuContent.append(content); 
   let cantidadInput = document.createElement("input"); 
  cantidadInput.type = "number"; 
  cantidadInput.min = 0; 
  cantidadInput.value = 0; 
  content.append(cantidadInput); 
  //-------agregar al carrito-------// 
   let agregar = document.createElement("button"); 
  agregar.innerText = "Agregar al carrito"; 
  agregar.className = "agrego"; 
  content.append(agregar); 
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
        subtotal: subtotal 
      }); 
      mostrarCarrito(); 
    } 
  }); 
}); 
//-------mostrar carrito-------// 
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
    carritoContent.append(content); 
     total += item.subtotal; 
  }); 
  //-------carrito final-------// 
   let totalElement = document.createElement("p"); 
  totalElement.className = "total"; 
  totalElement.innerText = `Total: $${total}`; 
  carritoContent.append(totalElement); 
   let vaciarCarrito = document.createElement("button"); 
  vaciarCarrito.innerText = "Vaciar carrito"; 
  vaciarCarrito.className = "vaciar"; 
  carritoContent.append(vaciarCarrito); 
   vaciarCarrito.addEventListener("click", () => { 
    carrito = []; 
    mostrarCarrito(); 
  }); 
  //-------opcion de comprar-------// 
   let comprarButton = document.createElement("button"); 
  comprarButton.innerText = "Comprar"; 
  comprarButton.className = "comprar"; 
  carritoContent.append(comprarButton); 
   comprarButton.addEventListener("click", () => { 
    mostrarFormulario(); 
  }); 
} 
//-------formulario para guardar informacion--------// 
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
//--------guardar info en LS-------// 
 function guardarCompra(nombre, direccion) { 
  const compra = { 
    nombre: nombre, 
    direccion: direccion, 
    carrito: carrito 
  }; 
   localStorage.setItem("compra", JSON.stringify(compra)); 
   carrito = []; 
  mostrarCarrito(); 
} 
 mostrarCarrito();