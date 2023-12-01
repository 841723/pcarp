document.addEventListener('DOMContentLoaded', () => {
    // Code to be executed when the DOM is ready
    if (sessionStorage.getItem('admin_view') === "orders") {
        mostrarPedidos()
    }
    else {
        sessionStorage.setItem('admin_view', 'products');
        mostrarProductos()
    }
});

function mostrarProductos() {
    document.getElementById('h1_titulo').textContent= "Productos";
    document.getElementById('icono-anadir').style.visibility = "visible";
    sessionStorage.setItem('admin_view', 'products');
    loadProducts();
}

function mostrarPedidos() {
    document.getElementById('h1_titulo').textContent= "Pedidos";
    document.getElementById('icono-anadir').style.visibility = "hidden";
    sessionStorage.setItem('admin_view', 'orders');
    loadOrders("false");
}

function mostrarEditarProducto() {
    document.getElementById('edit-product').style.visibility = "visible";
    cargarCamposEditarProducto();
}

function ocultarEditarProducto() {
    document.getElementById('edit-product').style.visibility = "hidden";
}

function crearTarjetaProducto(producto) {
    const div_product = document.createElement('div');
    div_product.classList.add("product-link-admin");
    div_product.classList.add("product-admin");
    div_product.id = 'id-producto-'+producto.id_producto;

    const button_eliminar = document.createElement('button-eliminar');
    button_eliminar.classList.add("button-eliminar");
    button_eliminar.id = "button-eliminar-"+producto.id_producto;
    const i_eliminar = document.createElement('i');
    i_eliminar.classList.add("fa");
    i_eliminar.classList.add("fa-trash");
    button_eliminar.appendChild(i_eliminar);
    div_product.appendChild(button_eliminar);
    
       
    for (key in producto) {
        if (producto[key] !== null) {
            const p_value = document.createElement('p');
            p_value.classList.add("value");
            if (key === "id_producto") 
                p_value.classList.add("main"); 
            p_value.textContent = key + " : " + producto[key];
            div_product.appendChild(p_value);
        }
    }
    return div_product;
}


function loadProducts() {
    const url = `/products_all`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        product_container = document.getElementById('object-container');
        product_container.innerHTML = ""

        data.forEach(type => {
            type.forEach(item => {
                const div_product = crearTarjetaProducto(item);
                product_container.appendChild(div_product);
            });
        });

        if (data.length === 0) {
            empty_div = document.createElement('div');
            h3_empty = document.createElement('h3');
            h3_empty.textContent = "no hay productos";
            empty_div.appendChild(h3_empty);
            product_container.appendChild(empty_div);
        }
    })
    .then(() => {
        createEventListenersProducts();
    })
    .catch(error => console.error('Error:', error));
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

function createEventListenersOrders() {

    const buttons = document.querySelectorAll('.button-estado');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            // event.preventDefault();
            const id_pedido = button.id.replace("button-estado-", "");
            const select = document.getElementById(`select-estado-${id_pedido}`);
            const estado = select.options[select.selectedIndex].value;
            const url = `/pedidos_cambiar_estado?id_pedido=${id_pedido}&estado=${estado}`;
            fetch(url)
            .then(() => {
                // showChangesHaveBeenSaved();
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
        });
    });

    createEventListenersDelete();
}

function createEventListenersDelete() {
    const buttons = document.querySelectorAll('.button-eliminar');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const id = button.id.replace("button-eliminar-", "");
            const url = `/eliminar_objeto?id=${id}&objeto=${sessionStorage.getItem('admin_view')}`;
            console.log(url)
            fetch(url)
            .then(() => {
                // showChangesHaveBeenSaved();
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
        });
    });
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


function createEventListenersProducts() {
    console.log("create event listeners products");
    const products = document.querySelectorAll('.product-link-admin');
    products.forEach(product => {
        product.addEventListener('click', (event) => {
            event.preventDefault();
            const id = product.id;
            sessionStorage.setItem('id-producto-admin', id);
            mostrarEditarProducto();
        });
    });
}

function crearCamposEditarProducto(...campos) {
    const form = document.getElementById('extra-config');
    const to_elimin = document.querySelectorAll('.editable-item-extra');
    to_elimin.forEach(element => {
        element.remove();
    });
    campos.forEach(campo => {
        div_item = document.createElement('div');
        div_item.classList.add("editable-item");
        div_item.classList.add("editable-item-extra");
        h2_item = document.createElement('h2');
        h2_item.textContent = campo[0].charAt(0).toUpperCase() + campo[0].slice(1)
        div_item.appendChild(h2_item);
        input_item = document.createElement('input');
        input_item.classList.add("editable-field-extra");
        input_item.id = campo[0];
        input_item.name = campo[0];

        if (campo[1] === "string") {
            input_item.type = "text";
            input_item.maxLength = campo[2];
        }
        else if (campo[1] === "number") {
            input_item.type = "number";
            input_item.min = campo[2];
            if (campo.length > 3) {
                input_item.max = campo[3];
            }
        }
        else if (campo[1] === "real") {
            input_item.type = "number";
            input_item.step = campo[3];
            input_item.max = campo[2];
        }
        div_item.appendChild(input_item);
        form.appendChild(div_item);
    });
}

function mostrarCamposEditarProducto(tipo) {
    if (tipo === undefined) {
        tipo = document.getElementById('select-tipo')[document.getElementById('select-tipo').value-1].textContent;
        tipo = tipo.replace(/ /g,'_');
    }
    switch (tipo) {
        case "procesador":
            crearCamposEditarProducto(["familia","string",15])
            break
        case "placa_base":
            crearCamposEditarProducto(["chipset","string",15],["tiene_m2","number"])
            break

        case "grafica":
            crearCamposEditarProducto(["tipo_grafica","string",6],["memoria","number"])
            break

        case "ram":
            crearCamposEditarProducto(["tipo_ram","string",4],["cantidad","number"],["almacenamiento","number"])
            break

        case "disco_duro":
            crearCamposEditarProducto(["tecnologia","string",3],["tamano","number"])
            break

        case "caja_torre":
            crearCamposEditarProducto(["tipo_placa","string",20])
            break

        case "ventilador":
            crearCamposEditarProducto(["tipo_disipador","string",35],["nivel_ruido","real",4,0.01])
            break

        case "fuente_alimentacion":
            crearCamposEditarProducto(["potencia","number"])
            break
    }
}

function cargarCamposEditarProducto() {
    let id_producto = sessionStorage.getItem('id-producto-admin');
    id_producto = id_producto.replace("id-producto-", "");
    console.log(id_producto);
    if (id_producto === null || id_producto === "null" || id_producto === "") {
        return;
    }
    if (id_producto === "nuevo-producto") {
        mostrarCamposEditarProducto("procesador");
        return
    }
    const url = '/products_all?id_producto='+encodeURIComponent(id_producto); 
    fetch(url)
    .then(response => response.json())
    .then(data => {
        mostrarCamposEditarProducto(data[0]["tipo"]);
        for (key in data[0]) {
            input_item = document.getElementById(key);
            if (input_item === null) {
                if (key == "tipo") {
                    select_item = document.getElementById('select-tipo');
                    for (let i = 0; i < select_item.options.length; i++) {

                        if (select_item.options[i].textContent.replace(/ /g,'_') === data[0][key]) {
                            select_item.selectedIndex = i;
                            break;
                        }
                    }
                }
                continue;
            }
            input_item.value = data[0][key];
        }
    })
    
    .catch(error => console.error('Error:', error));
}

function guardarCambios() {
    console.log("guardar cambios");
    const fields = document.querySelectorAll('.editable-field');
    let attributes = []
    fields.forEach(field => {
        console.log(field.id);
        attributes.push(field.id +":"+ field.value);
    });

    attributes.push("tipo:"+document.getElementById('select-tipo')[document.getElementById('select-tipo').value-1].textContent.replace(/ /g,'_'));
    const extra = document.querySelectorAll('.editable-field-extra');
    extra.forEach(field => {
        attributes.push(field.id +":"+ field.value);
    });

    console.log(attributes);

    let string_a_enviar = "";
    attributes.forEach(attribute => {
        string_a_enviar += attribute + ";";
    });
    console.log(string_a_enviar);
    let url = '';
    if (sessionStorage.getItem('id-producto-admin') === "nuevo-producto") {
        url = '/anadir_producto?attributes='+encodeURIComponent(string_a_enviar);
    }
    else {
        url = '/editar_producto?attributes='+encodeURIComponent(string_a_enviar);
    }
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data["success"]) {
            mostrarCambios("exito")
            ocultarEditarProducto();
        }
        else {
            mostrarCambios("error", data["error"])
        }
    })
    .catch(error => console.error('Error:', error));
}

function anadirProducto() {
    console.log("anadir producto");
    sessionStorage.setItem('id-producto-admin', "nuevo-producto");
    mostrarEditarProducto();

    
    const fields = document.querySelectorAll('.editable-field');
    fields.forEach(field => {
        if (field.id != "select-tipo" && field.id != "id_producto") {
            field.value = "";
        }
    });
    document.getElementById('id_producto').value = "(valor autogenerado)";
    document.getElementById('id_producto').style.fontStyle = "italic";
}


function recargarPagina() {
    console.log("recargar pagina"); 
    if (document.getElementById('edit-product').style.visibility === "hidden" || document.getElementById('edit-product').style.visibility === "") {
        window.location.reload();
    }
    console.log(document.getElementById('edit-product').style.visibility);
}

function mostrarCambios(tipo, error) {
    let div
    if (tipo === "exito") {
        div = document.getElementById('changes-saved');
        button = document.getElementById('button-saved');
        document.getElementById('changes-saved-error').style.visibility = "hidden";
        document.getElementById('button-error').style.visibility = "hidden";
    }
    else if (tipo === "error") {
        console.log(error);
        div = document.getElementById('changes-saved-error');
        div_error = document.getElementById('error-log');
        div_error.innerHTML = "";
        for (key in error) {
            p_value = document.createElement('p');
            p_value.classList.add("value");
            p_value.textContent = key + " : " + error[key];
            div_error.appendChild(p_value);
        }
        document.getElementById('changes-saved').style.visibility = "hidden";
        document.getElementById('button-saved').style.visibility = "hidden";
        button = document.getElementById('button-error');
    }
    div.style.visibility = "visible";

    button.style.visibility = "visible";
    button.addEventListener('click', (event) => {
        event.preventDefault();
        div.style.visibility = "hidden";
        button.style.visibility = "hidden";

    });
}