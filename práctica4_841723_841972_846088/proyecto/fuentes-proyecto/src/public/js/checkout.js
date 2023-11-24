
  
function cargarDatosPersonales() {
    console.log("Entrando en cargarDatosPersonales");
    const emailInput = document.getElementById('email');
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const direccionInput = document.getElementById('direccion');

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
    })
    .catch(error => console.error('Error al cargar datos personales:', error));
}

// Llamar a la función para obtener y mostrar los pedidos del cliente al cargar la página
// document.addEventListener('DOMContentLoaded', obtenerPedidosCliente);
window.addEventListener('load', cargarDatosPersonales);


order_submit = document.getElementById('order_submit');
order_submit.addEventListener('click', function() {
    event.preventDefault();
    
})