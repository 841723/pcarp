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
}

function mostrarContrasena() {
  var x = document.getElementById("pass-save");
  var icono = document.querySelector('.eye-icon');

  if (x.type === "pass") {
      x.type = "text";
      icono.classList.remove('bx-hide');
      icono.classList.add('bx-show');
  } else {
      x.type = "pass";
      icono.classList.remove('bx-show');
      icono.classList.add('bx-hide');
  }
}
// Función para obtener y mostrar los pedidos del cliente
function obtenerPedidosCliente() {
  fetch('/api/pedidos') // Supongamos que el servidor tiene una API que devuelve los pedidos del cliente
      .then(response => response.json())
      .then(data => organizarPedidos(data))
      .catch(error => console.error('Error al obtener pedidos:', error));
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

function updateUser(){
  const email = document.querySelector(".signup .input[type='email']").value;
  const nombre = document.getElementById('nombre').value
  const apellidos = document.getElementById('apellidos').value
  const direccion = document.getElementById('direccion').value
  const pass = document.getElementById('pass').value
  const mailCodificado = encodeURIComponent(email);
  const nombreCodificado = encodeURIComponent(nombre);
  const apellidosCodificado = encodeURIComponent(apellidos);
  const direccionCodificado = encodeURIComponent(direccion);
  const passCodificado = encodeURIComponent(pass);
  const url = `/update_user_by_mail?mail=${mailCodificado}&nombre=${nombreCodificado}&apellidos=${apellidosCodificado}&direccion=${direccionCodificado}&pass=${passCodificado}`;
  fetch(url)
  alert("usuario actualizado correctamente")
}

// Función para cancelar un pedido solicitado
function cancelarPedido(numeroPedido) {
  // Lógica para cancelar el pedido
  console.log(`Cancelar pedido #${numeroPedido}`);
}

// Llamar a la función para obtener y mostrar los pedidos del cliente al cargar la página
document.addEventListener('DOMContentLoaded', obtenerPedidosCliente);

// Mostrar la sección de "Mis Datos" por defecto al cargar la página
mostrarDatos();
