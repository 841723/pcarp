window.addEventListener('load', mostrarEnlaceDatos);

function mostrarEnlaceDatos() {
	if (sessionStorage.getItem("cart") === "") {
        document.getElementById("number_carrito").style.display = "none";
    }
	else {
		document.getElementById("number_carrito").textContent = getNumberCart();
		document.getElementById("number_carrito").style.display = "block";
	}
	const datosLi = document.getElementById('datosLi');
	const loginpopup = document.getElementById('loginpop');
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
	console.log("pulsado")  
	search_txt = document.getElementById("search-btn-txt")
	console.log(search_txt.value)

	search_type = document.getElementById("search-form-header")
	navbar_buttons = document.getElementsByClassName("navbar-nav")
	navbar_buttons = navbar_buttons[0].children

	console.log(navbar_buttons[document.getElementById('search-form-header').value].textContent.trim())
	sessionStorage.setItem("search_products", search_txt.value+":::"+navbar_buttons[search_type.value].textContent.trim())

	window.location.href = "/store.html"
});


function getNumberCart() {
	cart = sessionStorage.getItem('cart');
	if (cart === null || cart === "") {
		return 0;
	} else {
		item_sum = [];
		cart_list = cart.split(";");
		cart_list.forEach(item => {
			item_sum.push(parseInt(item.split(":")[1]));
		});
		item_sum.shift();
		item_sum = item_sum.reduce((a, b) => a + b, 0);
		return item_sum;
	}
}


function crearEventsListenersProductos() {
	const productos_links = document.querySelectorAll('.producto-link');

	productos_links.forEach(producto_link => {
		producto_link.addEventListener('click', () => {
			id = producto_link.id.replace('producto-link-id-', '');
			sessionStorage.setItem('id_producto', id);
			window.location.href = "/product.html";
		});
	})
}

const temaOscuro = () => {
	console.log("tema oscuro");
	document.querySelector('body').setAttribute("data-bs-theme", "dark");
	document.querySelector("#dl-icon").setAttribute("class", "fa fa-moon");
}
const temaClaro = () => {
	console.log("tema claro");
	document.querySelector('body').setAttribute("data-bs-theme", "light");
	document.querySelector("#dl-icon").setAttribute("class", "fa fa-sun");
}

const cambiarTema = () => {
	document.querySelector('body').getAttribute("data-bs-theme") === "light" ?
	temaOscuro() : temaClaro();
}