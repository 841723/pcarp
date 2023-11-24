window.addEventListener('load', mostrarEnlaceDatos);

function mostrarEnlaceDatos() {
	const datosLi = document.getElementById('datosLi');
	const loginpopup = document.getElementById('loginpop');
	console.log(sessionStorage.getItem('userToken'));
	if (sessionStorage.getItem('userToken') === null) {
		sessionStorage.setItem('userToken', false);

	}
	else if (sessionStorage.getItem('userToken')== 'true') {
	  datosLi.style.display = 'block'; // Mostrar el enlace "Datos"
	  loginpopup.style.display = "none";
	  console.log("hay usuario logeado");
	}
	 else {
	  datosLi.style.display = 'none'; // Ocultar el enlace "Datos"
	  loginpopup.style.display = "block";
	  console.log("no hay usuario logeado");
	}
  }



search_btn_header = document.getElementById("search-btn-header")
search_btn_header.addEventListener('click', () => {
    event.preventDefault()
    console.log("search_btn_header");
    
    // search_products_header();
});