window.addEventListener('load', mostrarEnlaceDatos);

function mostrarEnlaceDatos() {
	if (sessionStorage.getItem("cart") === "") {
        document.getElementById("number_carrito").style.display = "none";
    }
	else {
		document.getElementById("number_carrito").textContent = sessionStorage.getItem('cart');
		document.getElementById("number_carrito").style.display = "block";
	}
	const datosLi = document.getElementById('datosLi');
	const loginpopup = document.getElementById('loginpop');
	console.log(sessionStorage.getItem('userToken'));
	if (sessionStorage.getItem('userToken') === null) {
		sessionStorage.setItem('userToken', false);

	}
	else if (sessionStorage.getItem('userToken')== 'true') {
	  datosLi.style.display = 'block'; // Mostrar el enlace "Datos"
	  loginpopup.style.display = "none";

	}
	 else {
	  datosLi.style.display = 'none'; // Ocultar el enlace "Datos"
	  loginpopup.style.display = "block";
	}
  }



search_btn_header = document.getElementById("search-btn-header")
search_btn_header.addEventListener('click', () => {
    event.preventDefault()
    
    // search_products_header();
});