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

function pedirCuenta(){

}

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
      let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
      
      pwFields.forEach(password => {
          if(password.type === "password"){
            password.type = "text";
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return;
          }
          password.type = "password";
          eyeIcon.classList.replace("bx-show", "bx-hide");
      })
    })
  })  

// Mostrar la sección de "Mis Datos" por defecto al cargar la página
mostrarDatos();