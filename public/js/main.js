
function crearTarjeta(item) {
  li = document.createElement('li');
  div = document.createElement('div');
  ul = document.createElement('ul');
  for (var key in item) {
    if (key!="id_pedido") {
      var value = item[key];
      li_item = document.createElement('li');
      h5_item = document.createElement('h5');
      pre_item = document.createElement('pre');
      h5_item.textContent = key;
      pre_item.textContent = value;
      
      li_item.appendChild(h5_item);
      li_item.appendChild(pre_item);
      ul.appendChild(li_item);
    }
  }
  div.append(ul);
  li.append(div); 
  console.log(li)
  return li
}

function ask_for(message) {
  const stringCodificado = encodeURIComponent(message);
  const url = `/endpoint?data=${stringCodificado}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // Manipula los datos recibidos y muéstralos en la página HTML.
    const ulist = document.getElementById('ulist');
    data.forEach(item => {
      // li = document.createElement('li');
      const li = crearTarjeta(item);
      ulist.appendChild(li);
    });
  })
  .catch(error => console.error('Error:', error));
}


document.addEventListener('DOMContentLoaded', () => {
  const consultaBtn = document.getElementById('consultaBtn');
  
  consultaBtn.addEventListener('click', () => {
      const message = document.getElementById('message');
      
      if (false) {
        const ulist = document.getElementById('ulist');
        ulist.innerHTML = '';
      }
      // Realiza una solicitud GET al servidor para obtener los resultados de la consulta.
      ask_for(message.value);
    });
  });
   
  
ask_for("")