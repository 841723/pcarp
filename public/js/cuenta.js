function mostrarDatos() {
  var zonaDatos = document.getElementById('datos-personales');
  var zonaPedidos = document.getElementById('zona-pedidos');

  zonaDatos.style.display = 'block';
  zonaPedidos.style.display = 'none';
}

function mostrarPedidos() {
  var zonaDatos = document.getElementById('datos-personales');
  var zonaPedidos = document.getElementById('zona-pedidos');

  zonaDatos.style.display = 'none';
  zonaPedidos.style.display = 'block';
  loadOrders("false");
}

function alterContrasena() {
  var x = document.getElementById("pass-save");
  var icono = document.querySelector('.eye-icon');
  if (x.type === "password") {
      x.type = "text";
      icono.classList.remove('bx-hide');
      icono.classList.add('bx-show');
  } else {
      x.type = "password";
      icono.classList.remove('bx-show');
      icono.classList.add('bx-hide');
  }
}

// Función para organizar y mostrar los pedidos en las secciones correspondientes
function organizarPedidos(pedidos) {
  const pedidosEnProceso = document.getElementById('pedidos-en-proceso');
  const pedidosEnviados = document.getElementById('pedidos-enviados');
  const pedidosEntregados = document.getElementById('pedidos-entregados');

  // Limpiar las listas de pedidos antes de agregar nuevos elementos
  pedidosEnProceso.innerHTML = '';
  pedidosEnviados.innerHTML = '';
  pedidosEntregados.innerHTML = '';

  // Iterar sobre los pedidos y agregarlos a las listas correspondientes
  pedidos.forEach(pedido => {
      const li = document.createElement('li');
      li.classList.add('pedido');

      const pedidoInfo = document.createElement('div');
      pedidoInfo.classList.add('pedido-info');

      // Añadir atributos del pedido
      const atributos = ['Número de Pedido', 'Fecha', 'Total', 'Estado']; // Modifica según tus atributos
      atributos.forEach(atributo => {
          const p = document.createElement('p');
          p.innerHTML = `<strong>${atributo}:</strong> ${pedido[atributo.toLowerCase()]}`;
          pedidoInfo.appendChild(p);
      });

      li.appendChild(pedidoInfo);

      // Añadir botón de cancelar para pedidos solicitados
      if (pedido.estado === 'SOLICITADO') {
          const cancelarBtn = document.createElement('button');
          cancelarBtn.textContent = 'Cancelar Pedido';
          cancelarBtn.addEventListener('click', () => cancelarPedido(pedido.numeroPedido));
          li.appendChild(cancelarBtn);
      }

      // Agregar el elemento a la lista correspondiente según el estado del pedido
      if (pedido.estado === 'SOLICITADO') {
          pedidosEnProceso.appendChild(li);
      } else if (pedido.estado === 'ENVIADO') {
          pedidosEnviados.appendChild(li);
      } else if (pedido.estado === 'ENTREGADO') {
          pedidosEntregados.appendChild(li);
      }
  });
}

async function updateUser(){
  event.preventDefault();
  const email = document.getElementById("email").value;
  const nombre = document.getElementById('nombre').value;
  const apellidos = document.getElementById('apellidos').value;
  const direccion = document.getElementById('direccion').value;
  const pass = document.getElementById('pass-save').value;
  const mailCodificado = encodeURIComponent(email);
  const nombreCodificado = encodeURIComponent(nombre);
  const apellidosCodificado = encodeURIComponent(apellidos);
  const direccionCodificado = encodeURIComponent(direccion);
  const passCodificado = encodeURIComponent(pass);
  const url = `/update_user_by_mail?email=${mailCodificado}&nombre=${nombreCodificado}&apellidos=${apellidosCodificado}&direccion=${direccionCodificado}&pass=${passCodificado}`;
  // let result= await fetch(url)
  // sessionStorage.setItem('email', email);
  // console.log(result);
  // alert("usuario actualizado correctamente")

    const result = await fetch(url);
    sessionStorage.setItem('email', email);
    console.log(result);
    alert("Usuario actualizado correctamente");

}
function logout(){
  event.preventDefault();
  sessionStorage.setItem('userToken', false);
  //borrar el mail
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('id');
  console.log("userToken: "+sessionStorage.getItem('userToken'));
  window.location.href = "/index.html";
}

function cargarDatosPersonales() {
  console.log("Entrando en cargarDatosPersonales");
  const emailInput = document.getElementById('email');
  const nombreInput = document.getElementById('nombre');
  const apellidosInput = document.getElementById('apellidos');
  const direccionInput = document.getElementById('direccion');
  const passInput = document.getElementById('pass-save');

  // Obtener el correo electrónico del usuario de sessionStorage
  const userEmail = sessionStorage.getItem('email');

  // Realizar la consulta a la base de datos para obtener los datos del usuario
  const url = `/user_mail?data=${encodeURIComponent(userEmail)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Asignar los resultados a las cajas de texto
      emailInput.value = data.mail;
      nombreInput.value = data.nombre;
      apellidosInput.value = data.apellidos;
      direccionInput.value = data.direccion
      passInput.value = data.contrasena;
    })
    .catch(error => console.error('Error al cargar datos personales:', error));
}

function juntarPedidos(pedidos) {
  let result = pedidos;
  for (let i = 0; i < result.length; i++) {
      result[i].id_producto = [pedidos[i].id_producto];
      result[i].cantidad = [pedidos[i].cantidad];
      for (let j = i + 1; j < pedidos.length; j++) {
          if (pedidos[i].id_pedido === pedidos[j].id_pedido) {
              result[i].id_producto.push(pedidos[j].id_producto);
              result[i].cantidad.push(pedidos[j].cantidad);
          }
      }
  }
  result = result.filter((res, index, self) =>
      index === self.findIndex((t) => (
          t.id_pedido === res.id_pedido
      ))
  );

  result.sort((a, b) => a.id_pedido - b.id_pedido); // Sort by id_pedido field

  return result;
}


async function crearTarjetaPedido(pedido) {
  const div_product = document.createElement('div');
  div_product.classList.add("tarjeta-pedido");

  const list_mostrar = ["fecha", "fecha_llegada", "id_producto"];

  for (const key in pedido) {
    if (pedido[key] !== null && list_mostrar.includes(key)) {
      // Si el campo es "productos", se obtienen los nombres de los productos desde la ruta /products_id
      if (key === "id_producto") {
        try {
          const idsProductos = pedido[key];
          for (const idProducto of idsProductos) {
            const url = `/products_id?id=${idProducto}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.tipo) {
              const p_value = document.createElement('p');
              p_value.classList.add("value");
              p_value.classList.add("id-producto-tag");
              p_value.textContent = `${data.tipo} ${data.marca} ${data.modelo} -> Cantidad: ${pedido.cantidad[idsProductos.indexOf(idProducto)]}`;
              div_product.appendChild(p_value);
              console.log(p_value);
            } else {
              console.error("No se pudo obtener el nombre del producto");
            }
          }
        } catch (error) {
          console.error("Error al obtener los nombres de los productos:", error);
        }
      } else {
        // Muestra el resto de los campos
        const p_value = document.createElement('p');
        p_value.classList.add("value");
        p_value.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${pedido[key]}`;
        div_product.appendChild(p_value);
      }
    }
  }

  // Añadir botón de cancelar si el estado es "procesando"
  if (pedido.estado === "procesando") {
    const cancelarButton = document.createElement('button');
    cancelarButton.innerText = 'Cancelar Pedido';
    cancelarButton.classList.add("cancelar-button");
    cancelarButton.addEventListener('click', async () => {
      try {
        const url = `/cancelar_pedido?id_pedido=${pedido.id_pedido}`;
        const response = await fetch(url);
        const data = await response.json();

        if (Object.keys(data).length === 0) {
          console.log("Pedido cancelado exitosamente");
          alert("Pedido cancelado exitosamente");
          window.location.reload();
        } else {
          console.error("No se pudo cancelar el pedido");
          alert("No se pudo cancelar el pedido");
        }
      } catch (error) {
        console.error("Error al cancelar el pedido:", error.message);
        alert("Error al cancelar el pedido");
      }
    });

    div_product.appendChild(cancelarButton);
  }

  return div_product;
}



function loadOrders(product_details) {
  detalles = encodeURIComponent(product_details);
	email = document.getElementById("email").value;

  const url = `/pedidos_datos_by_mail?detalle=${detalles}&email=${encodeURIComponent(email)}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
      solicitados = document.getElementById('pedidos-solicitados');
      enviados = document.getElementById('pedidos-enviados');
      entregados = document.getElementById('pedidos-entregados');
      solicitados.innerHTML = ""
      enviados.innerHTML = ""
      entregados.innerHTML = ""
      data = juntarPedidos(data);
      data.forEach(async item => {
          const div_order = await crearTarjetaPedido(item);
          if (item.estado === "procesando") {
            solicitados.appendChild(div_order);
          }
          else if (item.estado === "enviado") {
            enviados.appendChild(div_order);
          }
          else if (item.estado === "entregado") {
            entregados.appendChild(div_order);
          }

      });
  })
  .catch(error => console.error('Error:', error));
}

// Mostrar la sección de "Mis Datos" por defecto al cargar la página
mostrarDatos();
window.addEventListener('load', cargarDatosPersonales);