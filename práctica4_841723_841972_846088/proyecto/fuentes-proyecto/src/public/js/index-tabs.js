const targets = document.querySelectorAll('[data-target]');
const contents = document.querySelectorAll('[data-content]');

targets.forEach( target => {

    target.addEventListener('click', () => {
        
        // nav bar seleccionar opcion correcta
        targets.forEach( target => {
            target.classList.remove('active');
        })
        target.classList.toggle('active');

        // h1 de la pagina (contenido de pag)
        contents.forEach( content => {
            content.classList.remove('active');
        })
        const t = document.querySelector(target.dataset.target);
        t.classList.toggle('active');
    })
})