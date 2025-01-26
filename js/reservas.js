// Definimos variables
const nombreInput = document.querySelector('#nombre');
const vueloInput = document.querySelector('#vuelo');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const aerolineaInput = document.querySelector('#aerolinea');
const formulario = document.querySelector('#nueva-reserva');
const contenedorReservas = document.querySelector('#reservas');
let editar 

class reservas {
    constructor(){
        this.reservas = []  // this es un apuntador
    }

    // agregar una cita
    agregarReserva(reserva){
        this.reservas = [...this.reservas,reserva]
        console.log(this.reservas)
    }

    eliminarReserva(id){
        this.reservas = this.reservas.filter(i=>i.id !== id)

    }

    editarReserva(reservasAct){
        this.reservas = this.reservas.map(i => i.id === reservasAct.id ? reservasAct : i)
        //sintaxis 
        // condicion: +> condicion - ? true - : false
    }
}



class useri{
    imprimirAlerta(mensaje,tipo){

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'text-white',
            'col-12')

        if(tipo==='error'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success')
        }

        // vamos a regresar el mensaje
        divMensaje.textContent = mensaje

        document.querySelector('#contenido').insertBefore(divMensaje,
            document.querySelector('.agregar-reserva'))


            setTimeout(()=>{
                divMensaje.remove()
            }, 3000)
    }

    //imprimiendo citas del arreglo
    imprimirReservas({reservas}){
    this.limpiarHTML()
    reservas.forEach(i => {
        const {nombre, vuelo, telefono, fecha, hora, aerolinea, id} = i 
        //creando html
        const divReserva = document.createElement('div')
        divReserva.classList.add('reserva', 'p-3')

        //agregar textos
        const nombreTexto = document.createElement('h2')
        nombreTexto.classList.add('card-title', 'font-weight-bolder')
        nombreTexto.textContent = nombre

        const vueloTexto = document.createElement('p')
        vueloTexto.textContent = 'Vuelo: ' + vuelo

        const telefonoTexto = document.createElement('p')
        telefonoTexto.textContent = 'Telefono: ' + telefono

        const fechaTexto = document.createElement('p')
        fechaTexto.textContent = 'Fecha: ' + fecha

        const horaTexto = document.createElement('p')
        horaTexto.textContent = 'Hora: ' + hora

        const aerolineaTexto = document.createElement('p')
        aerolineaTexto.textContent = 'Aerolinea: ' + aerolinea

        divReserva.dataset.id = id

        //agregando boton de eliminar a la cita agendada
        const btnEliminar = document.createElement('button')
        //asignando clase (CSS)
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2')
        //agregando el svg del boton
        btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

        //agregando el evento del boton eliminar
        btnEliminar.onclick = ()=> eliminarReserva(id)  

        //agregando boton de editar a la cita agendada
        const btnEditar = document.createElement('button')
        //asignando clase (CSS)
        btnEditar.classList.add('btn', 'btn-info')
        //agregando el svg del boton
        btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

        //agregando el evento del boton editar
        btnEditar.onclick = ()=>cargarEdicion(i)

        //esto para imprimir los datos de la cita agendada
        divReserva.appendChild(telefonoTexto)
        divReserva.appendChild(vueloTexto)
        divReserva.appendChild(nombreTexto)
        divReserva.appendChild(fechaTexto)
        divReserva.appendChild(horaTexto)
        divReserva.appendChild(aerolineaTexto)
        //Imprimiendo los botones de editar y eliminar
        divReserva.appendChild(btnEliminar)
        divReserva.appendChild(btnEditar)

        contenedorReservas.appendChild(divReserva)
        })
    }
      
    
        limpiarHTML(){
        while(contenedorReservas.firstChild){
            contenedorReservas.removeChild(contenedorReservas.firstChild)
         }
    }
}

// Eventos
eventos() 
//recuerda inicializar
function eventos(){
    nombreInput.addEventListener('input', datosReservas)
    vueloInput.addEventListener('input', datosReservas)
    telefonoInput.addEventListener('input', datosReservas)
    fechaInput.addEventListener('input', datosReservas)
    horaInput.addEventListener('input', datosReservas)
    aerolineaInput.addEventListener('input', datosReservas)
    formulario.addEventListener('submit', nuevaReserva)
    
}

// // Crear objeto para guardar la info de los inputs

const reservasObj ={
    nombre: '',
    vuelo: '',
    telefono: '',
    fecha: '',
    hora: '',
    aerolinea: ''
}


// instanciacion
const administrarReserva = new reservas()
const ui = new useri()

function datosReservas(e){
    //console.log(e.target.name); //name para evr si estas capturado el mismo elemento
    reservasObj[e.target.name] = e.target.value //.value para que agregue el value
     console.log(reservasObj);  //pruebaa que guarda el dato en la propiedad del obj que quieres
}


function nuevaReserva(e){
    //validar campos vacios y agregar una nueva cita
    e.preventDefault()

    // extraccion de la info
    const {nombre, vuelo, telefono, fecha, hora, aerolinea} = 
    reservasObj

    // validar
    if(nombre==='' || vuelo==='' || telefono==='' ||
    fecha===''|| hora==='' || aerolinea===''){
            //console.log('Todos los campos son obligatorios')
            ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        }else if(editar){
            //editar
            //console.log('editar')
            editar = false
            formulario.querySelector('button[type=submit]').textContent = 'Crear Reserva'
            administrarReserva.editarReserva({...reservasObj})
            ui.imprimirAlerta('Se ha actualizado la reserva correctamente')
            ui.imprimirReservas(administrarReserva)
        }else{
            // console.log('campos llenos')
            reservasObj.id = Date.now()
             console.log(reservasObj);
            
            administrarReserva.agregarReserva({...reservasObj})
            ui.imprimirAlerta('Se ha agendado su reserva satisfactoriamente')
            ui.imprimirReservas(administrarReserva)
    }

    formulario.reset()
    reiniciarObjeto()
    console.log(reservasObj);
    

    function reiniciarObjeto(){
        reservasObj.nombre = ''
        reservasObj.vuelo = ''
        reservasObj.telefono = ''
        reservasObj.fecha = ''
        reservasObj.hora = ''
        reservasObj.aerolinea = ''
        reservasObj.id = ''
    }
}


//funcion de eliminar RESERVAS desde los botones en las citas agendadas
function eliminarReserva(id){
    administrarReserva.eliminarReserva(id)
    // mensaje de lo que se ha hecho
    ui.imprimirAlerta('La reserva se ha eliminado correctamente')
    //eliminando
    ui.imprimirReservas(administrarReserva)
}


function cargarEdicion(reservaObjeto){
    const {nombre, vuelo, telefono, fecha, hora, aerolinea, id} = reservaObjeto

    //llenar los inputs con la informacion del div donde estoy editando
    nombreInput.value = nombre
    vueloInput.value = vuelo
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    aerolineaInput.value = aerolinea

    //llenar el objeto
    reservasObj.nombre = nombre
    reservasObj.vuelo = vuelo
    reservasObj.fecha = fecha
    reservasObj.hora = hora
    reservasObj.aerolinea = aerolinea
    reservasObj.telefono = telefono
    reservasObj.id = id

    formulario.querySelector('button[type=submit]').textContent = 'Actualizar'

    //console.log(citasObj);
    editar = true
}