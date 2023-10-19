
document.addEventListener('DOMContentLoaded', () => {
    const consultaBtn = document.getElementById('consultaBtn');
      
    consultaBtn.addEventListener('click', () => {
      const message = document.getElementById('message');
      const messvalue = message.value
      const stringCodificado = encodeURIComponent(messvalue);

      const url = `/endpoint?data=${stringCodificado}`;
      // Realiza una solicitud GET al servidor para obtener los resultados de la consulta.
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Manipula los datos recibidos y muéstralos en la página HTML.
          const resultadosDiv = document.getElementById('resultados');
          const ul = document.createElement('ul');
          data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} ${item.apellidos}, email ${item.mail} y password ${item.contrasena}`; // Ajusta según tus columnas.
            ul.appendChild(li);
          });
          resultadosDiv.appendChild(ul);
        })
        .catch(error => console.error('Error:', error));
    });
  });




