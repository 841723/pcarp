// // En tu_script.js

// // Realiza una solicitud GET al servidor para obtener los resultados de la consulta.
// fetch('../consulta','SELECT * FROM private.prueba')
//   .then(response => response.json())
//   .then(data => {
//     // Manipula los datos recibidos y muéstralos en la página HTML.
//     const resultadosDiv = document.getElementById('resultados');
//     // Aquí puedes construir y agregar elementos HTML para mostrar los datos.
//     const ul = document.createElement('ul');
//     data.forEach(item => {
//       const li = document.createElement('li');
//       li.textContent = `${item.columna1}: ${item.columna2}`; // Ajusta según tus columnas.
//       ul.appendChild(li);
//     });
//     resultadosDiv.appendChild(ul);
//   })
//   .catch(error => console.error('Error:', error));




// // $(function () {
// //     //variales
// //     var message = $('.message');
    
// //     message.focus()
    
// //     $('.message-box').submit(function (e){
// //         e.preventDefault();
        
// //         // console.log(message);
// //         console.log($('.message').val());
// //         // message.();

// //     }); 
// // });

// En tu_script.js

document.addEventListener('DOMContentLoaded', () => {
    const consultaBtn = document.getElementById('consultaBtn');
    // const resultadosDiv = document.getElementById('resultados');
  
    consultaBtn.addEventListener('click', () => {
      // Realiza una solicitud GET al servidor para obtener los resultados de la consulta.
      fetch('/consulta1')
        .then(response => response.json())
        .then(data => {
          // Manipula los datos recibidos y muéstralos en la página HTML.
          const resultadosDiv = document.getElementById('resultados');
          const ul = document.createElement('ul');
          data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre}: ${item.precio}`; // Ajusta según tus columnas.
            ul.appendChild(li);
          });
          resultadosDiv.appendChild(ul);
        console.log(data);

        })
        .catch(error => console.error('Error:', error));
    });
  });

// app.get('/consulta', (req, res) => {
//     // Aquí ejecutas la consulta SQL a la base de datos y obtienes los resultados.
//     client.query(req.query.query, (error, result) => {
//       if (error) {
//         throw error;
//       }
//       // Envía los resultados como respuesta al cliente en formato JSON.
//       res.json(result.rows);
//     });
//   });

// // Define the query
// const query = 'SELECT * FROM public.prueba WHERE nombre = "producto1"';

// // Make the GET request
// fetch(`/consulta?q=${encodeURIComponent(query)}`)
//   .then(response => {
//     // Check if the request was successful
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     // Parse the response data as JSON
//     return response.json();
//   })
//   .then(data => {
//     // Log the response data to the console
//     console.log(data);
//   })
//   .catch(error => {
//     // Log any errors to the console
//     console.error('There has been a problem with your fetch operation:', error);
//   });
