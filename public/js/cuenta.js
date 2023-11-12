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

// Mostrar la sección de "Mis Datos" por defecto al cargar la página
mostrarDatos();