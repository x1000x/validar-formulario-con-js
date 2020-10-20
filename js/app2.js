//1.- crea la funcion eventListener y bloque el boton de enviar 
//2.- crea algunas variables, pone las cajas del formulario de color rojo al estar vacias
//3.- 


//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail');

//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    



//event listener
eventListener();
function eventListener(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campso del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //enviar mail
    formulario.addEventListener('submit', enviarMail);

    //resetear el formulario
    btnReset.addEventListener('click', resetearFormulario)
}

//funciones

function iniciarApp(){
btnEnviar.disabled = true;
btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function validarFormulario(e){
 if(e.target.value.length > 0){   

    //elimina los errores de la vista
    const error = document.querySelector('p.error');
    if(error){
        error.remove();
    }
    e.target.classList.remove('border','border-red-500');
    e.target.classList.add('border','border-green-500'); 
 }
else{
    e.target.classList.remove('border','border-green-500');
    e.target.classList.add('border','border-red-500');
    mostrarError('Todos los campos son obligatorios');
}

if (e.target.type === 'email'){
    
   // const resultado = e.target.value.indexOf('@');
    if(er.test(e.target.value)){
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }


        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500'); 
    } 
    else{
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');
       mostrarError('El mail no es valido')
    }
}
    if (er.test(email.value) && asunto.value !=='' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }else{
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    };

}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500','background-red-100','text-red-500', 'p-3', 'mt-5', 'text-center','error')

    const errores = document.querySelectorAll('.error')

    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }   
}

function enviarMail(e){
e.preventDefault();

//mostrar spinner
const spinner = document.querySelector('#spinner');
spinner.style.display = 'flex';

//despues de 3 segundos desaparece el spinner

setTimeout( ()=>{
    spinner.style.display = 'none';

    //mensaje que dice que se envio correctamente
    const parrafo = document.createElement('p');
    parrafo.textContent = 'el mensaje fue enviado exitosamente';
    parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500','text-white','font-bold','uppercase' )

//inserte el mensaje antes del spinner
formulario.insertBefore(parrafo ,spinner);

setTimeout( () =>{
    parrafo.remove();
    resetearFormulario();
},2000)

},2000)
}

function resetearFormulario(){
    formulario.reset();

    iniciarApp();
};