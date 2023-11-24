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

// Llamar a la función para obtener y mostrar los pedidos del cliente al cargar la página
// document.addEventListener('DOMContentLoaded', obtenerPedidosCliente);

// Mostrar la sección de "Mis Datos" por defecto al cargar la página
mostrarDatos();
window.addEventListener('load', cargarDatosPersonales);