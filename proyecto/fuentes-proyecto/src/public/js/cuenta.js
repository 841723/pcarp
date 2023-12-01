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
  document.getElementById('h1_titulo').textContent= "Pedidos";
  document.getElementById('icono-anadir').style.visibility = "hidden";
  sessionStorage.setItem('admin_view', 'orders');
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
// Función para obtener y mostrar los pedidos del cliente
// function obtenerPedidosCliente() {
//   fetch('/api/pedidos') // Supongamos que el servidor tiene una API que devuelve los pedidos del cliente
//       .then(response => response.json())
//       .then(data => organizarPedidos(data))
//       .catch(error => console.error('Error al obtener pedidos:', error));
// }

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

// Función para cancelar un pedido solicitado
function cancelarPedido(numeroPedido) {
  // Lógica para cancelar el pedido
  console.log(`Cancelar pedido #${numeroPedido}`);
}

function crearTarjetaPedido(pedido) {
  div_product = document.createElement('div');
  div_product.classList.add("product-admin");

  button_eliminar = document.createElement('button');
  button_eliminar.classList.add("button-eliminar");
  button_eliminar.id = "button-eliminar-"+pedido.id_pedido;
  i_eliminar = document.createElement('i');
  i_eliminar.classList.add("fa");
  i_eliminar.classList.add("fa-trash");
  button_eliminar.appendChild(i_eliminar);
  div_product.appendChild(button_eliminar);

  list_mostrar = ["id_pedido", "id_usuario", "fecha", "fecha_llegada", "id_producto"];
  for (key in pedido) {
      if (pedido[key] !== null) {
          if (list_mostrar.includes(key)) {
              p_value = document.createElement('p');
              p_value.classList.add("value");
              if (key === "id_pedido") 
                  p_value.classList.add("main");
              if (key === "id_producto") {
                  pedido[key].forEach((id, index) => {
                      p_value = document.createElement('p');
                      p_value.classList.add("value");
                      p_value.classList.add("id-producto-tag");
                      p_value.textContent = "id_producto" + " : " + id + " -> cantidad : " + pedido.cantidad[index];
                      div_product.appendChild(p_value);
                  });
              } 
              else {                
                  p_value.textContent = key + " : " + pedido[key];
                  div_product.appendChild(p_value);
              }
          }
      }
  }

  div_estado = document.createElement('div');
  div_estado.classList.add("estado");

  p_value = document.createElement('p');
  p_value.classList.add("value");
  p_value.classList.add("estado-tag");
  p_value.textContent = "estado" + " :";

  form_estado = document.createElement('form');
  form_estado.classList.add("form-estado");
  form_estado.id = "form-estado-"+pedido.id_pedido;
  select_estado = document.createElement('select');
  select_estado.classList.add("select-estado");
  select_estado.id = "select-estado-"+pedido.id_pedido;
  select_estado.name = "estado";
  
  // Create options for the form
  const options = ["procesando", "enviado", "entregado"];
  options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select_estado.appendChild(optionElement);
  });
  select_estado.selectedIndex = options.indexOf(pedido.estado); // Set the index of the desired default option
  form_estado.appendChild(select_estado);

  button_estado = document.createElement('button');
  button_estado.classList.add("button-estado");
  button_estado.id = "button-estado-"+pedido.id_pedido;
  button_estado.textContent = "Cambiar";
      
  div_estado.appendChild(p_value);
  div_estado.appendChild(form_estado);
  div_estado.appendChild(button_estado);

  div_product.appendChild(div_estado);    
  return div_product;
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

function loadOrders(product_details) {
  stringCodificado = encodeURIComponent(product_details);
  const url = `/pedidos_datos?detalle=${stringCodificado}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
      orders_container = document.getElementById('object-container');
      orders_container.innerHTML = ""
      data = juntarPedidos(data);

      data.forEach(item => {
          const div_order = crearTarjetaPedido(item);
          orders_container.appendChild(div_order);
      });

      if (data.length === 0) {
          empty_div = document.createElement('div');
          h3_empty = document.createElement('h3');
          h3_empty.textContent = "no hay pedidos";
          empty_div.appendChild(h3_empty);
          orders_container.appendChild(empty_div);
      }
      createEventListenersOrders();
  })
  .catch(error => console.error('Error:', error));
}

// Llamar a la función para obtener y mostrar los pedidos del cliente al cargar la página
// document.addEventListener('DOMContentLoaded', obtenerPedidosCliente);

// Mostrar la sección de "Mis Datos" por defecto al cargar la página
mostrarDatos();
window.addEventListener('load', cargarDatosPersonales);