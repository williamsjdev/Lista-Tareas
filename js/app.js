//* Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//* EventListener 
eventListener();

function eventListener() {

    //! Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweets);

    //! Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    }) 
}



//* Funciones 
function agregarTweets(e) {
    e.preventDefault();

    //! Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //! Validacion 
    if(tweet === '') {
        mostrarError('El Campo No Puede ir Vacio');
        
        return;  //!Evita que se ejecuten mas lineas 
    }
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //! Añadir tweets
    tweets = [...tweets, tweetObj];

    //! Agregar HTML

    crearHTML();

    //! Reiniciar el formulario
    formulario.reset();

}

//! Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


    //! Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);


    //! Elimina la alerta 
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


//! Muestra un listado de los tweets
function crearHTML() {
    limpiarHTML()

    if(tweets.length > 0 ) {
        tweets.forEach( tweet => {

            //! Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //! Añadir la funcion de eleminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            
            //! Crear el HTML
            const li = document.createElement('li');
            
            //! Añadir texto
            li.innerText = tweet.tweet;

            //! Asignar el boton
            li.appendChild(btnEliminar);

            //! Insertarlo en el HTML
            listaTweets.appendChild(li);

        });
    }

    sincronizarStorage();
}

//! Agrega los tweets al localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//! Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();
}

//! Limpiar HTML 
function limpiarHTML() {
    while( listaTweets.firstChild ) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

