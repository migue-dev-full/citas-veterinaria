// Definimos variables
const nombre = document.querySelector('#nombre');
const viaje = document.querySelector('#ida', '#vuelta');
const telefono = document.querySelector('#telefono');
const idP = document.querySelector("#idP");
const fechaIda = document.querySelector('#fechaIda');
const fechaRegreso = document.querySelector('#fechaRegreso');
const ida = document.querySelector('#ida');
const vuelta = document.querySelector('#vuelta');
const origen = document.querySelector('#paisOrigen');
const destino = document.querySelector('#paisDestino');
const formulario = document.querySelector('#nueva-reserva');
const contenedorReservas = document.querySelector('#reservas');
let editar = false;

class reservas {
    constructor(){
        this.reservas = []  // this es un apuntador
    }

    // agregar una reserva
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
        console.log(reservas);
        

    this.limpiarHTML()
    reservas.forEach(i => {
        console.log(i);
        
        const {id, nombre, idP, telefono, origen, destino, viaje, fechaIda, fechaRegreso} = i 
        //creando html
        const divReserva = document.createElement('div')
        divReserva.classList.add('reserva', 'p-3', 'mb-3', 'divRes')
        
        //agregar textos
        const nombreTexto = document.createElement('h2')
        nombreTexto.classList.add('card-title', 'font-weight-bolder', 'mb-3', 'nombre-reserva')
        nombreTexto.textContent = 'Nombre:' + nombre
       

        const idPTexto = document.createElement('p')
        idPTexto.classList.add('idsStyle')
        idPTexto.textContent = 'Id: ' + idP
     

        const telefonoTexto = document.createElement('p')
        telefonoTexto.classList.add('telStyle')
        telefonoTexto.textContent = 'Telefono: ' + telefono
     

        const origenTexto = document.createElement('p')
        origenTexto.classList.add('paisOrigen', 'mb-3');
        origenTexto.textContent = 'Origen: ' + origen
     

        const destinoTexto = document.createElement('p')
        destinoTexto.classList.add('paisOrigen');
        destinoTexto.textContent = 'Destino: ' + destino


        const viajeTexto = document.createElement('p')
        viajeTexto.classList.add('viajeText', 'justify-content-center', 'mt-3', 'mb-3');
        viajeTexto.textContent = 'Tipo de viaje: ' + viaje
        
        


        const fechaIdaTexto = document.createElement('p')
        fechaIdaTexto.classList.add('paisIgual','p-1', 'mb-1');
        fechaIdaTexto.textContent = 'Salida: ' + fechaIda

        const fechaRegresoTexto = document.createElement('p')
        fechaRegresoTexto.classList.add('paisIgual','p-1');
        fechaRegresoTexto.textContent = 'FechaRegreso: ' + fechaRegreso
        
        
        
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
        divReserva.appendChild(idPTexto)
        divReserva.appendChild(nombreTexto)
        divReserva.appendChild(origenTexto)
        divReserva.appendChild(destinoTexto)
        divReserva.appendChild(viajeTexto)
        divReserva.appendChild(fechaIdaTexto)
        divReserva.appendChild(fechaRegresoTexto)

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
    nombre.addEventListener('input', datosReservas)
    telefono.addEventListener('input', datosReservas)
    fechaIda.addEventListener('input', datosReservas)
    fechaRegreso.addEventListener('input', datosReservas)
    viaje.addEventListener("change", datosReservas)
    ida.addEventListener('change', datosReservas)
    vuelta.addEventListener('change', datosReservas)
    origen.addEventListener('change', datosReservas)
    destino.addEventListener('change', datosReservas)
    idP.addEventListener("input", datosReservas)
    formulario.addEventListener('submit', nuevaReserva)
    origen.addEventListener('change', validarPais);
    destino.addEventListener('change', validarPais);
   
    
}

// // Crear objeto para guardar la info de los inputs

const reservasObj ={
    nombre: '',
    idP: '',
    telefono: '',
    origen: '',
    destino: '',
    viaje: '',
    fechaIda: '',
    fechaRegreso: ''

}


// instanciacion
const administrarReserva = new reservas()
const ui = new useri()

function datosReservas(e){
    //console.log(e.target.name); //name para evr si estas capturado el mismo elemento
    reservasObj[e.target.name] = e.target.value //.value para que agregue el value

    if (e.target.name === 'ida' || e.target.name === 'vuelta') {
        reservasObj.viaje = e.target.value; // Guardar 'Solo ida' o 'Ida y vuelta'
    }


     console.log(reservasObj);  //pruebaa que guarda el dato en la propiedad del obj que quieres


    }

function validarPais(origen, destino) {
        if (reservasObj.origen === reservasObj.destino){
            ui.imprimirAlerta('El pais de origen y el pais destino no pueden ser iguales', 'error');
            return true;
        }
        return false;
    }


        

function nuevaReserva(e){
    //validar campos vacios y agregar una nueva cita
    e.preventDefault()
    datosReservas(e)
    

    if(validarPais()){
        return;
    }


    
    // extraccion de la info
    const {nombre, idP, telefono, origen, destino, ida, vuelta, viaje, fechaIda, fechaRegreso} = 
    reservasObj

    // validar
    if(nombre==='' || idP==='' || telefono==='' ||
    origen===''|| destino==='' || ida===''  || vuelta==='' || viaje===''  || fechaIda===''  ){
            //console.log('Todos los campos son obligatorios')
            ui.imprimirAlerta('Todos los campos son obligatorios', 'error')

        }else if(editar){
            //editar
            console.log(reservasObj)
            validarPais()
            
            formulario.querySelector('button[type=submit]').textContent = 'Guardar'
            administrarReserva.editarReserva({...reservasObj})
            ui.imprimirAlerta('Se ha actualizado la reserva correctamente')
            editar = false
            ui.imprimirReservas(administrarReserva)
        }else{
            // console.log('campos llenos')
            
            reservasObj.id = Date.now()
            console.log(reservasObj);
           

                // Crear objetos Date para las fechas
            const fechaIdaDate = new Date(fechaIda);
            const fechaRegresoDate = new Date(fechaRegreso);

            // Validar que fecha de ida no sea posterior a fecha de regreso
            if (fechaIdaDate > fechaRegresoDate) {
                ui.imprimirAlerta('La fecha de ida no puede ser posterior a la fecha de regreso', 'error');
                return; // Detener la creación de la reserva
            }
            




            administrarReserva.agregarReserva({...reservasObj})
            ui.imprimirAlerta('Se ha agendado su reserva satisfactoriamente')
    }
    ui.imprimirReservas({reservas: administrarReserva.reservas})
    formulario.reset()
    console.log(reservasObj);
    reiniciarObjeto()
    
  
    // console.log(reservasObj);
    

    function reiniciarObjeto(){
    reservasObj.nombre = '';
    reservasObj.idP = '';
    reservasObj.telefono = '';
    reservasObj.origen = '';
    reservasObj.destino = '';
    reservasObj.viaje = '';
    reservasObj.fechaIda = '';
    reservasObj.fechaRegreso = '';
    reservasObj.id = '';
    }
}


//funcion de eliminar RESERVAS desde los botones en las citas agendadas
function eliminarReserva(id){
    administrarReserva.eliminarReserva(id)
    // mensaje de lo que se ha hecho
    ui.imprimirAlerta('La reserva se ha eliminado correctamente')
    //eliminando
    ui.imprimirReservas({reservas: administrarReserva.reservas})
}


function cargarEdicion(reservaObjeto){
    const {id, nombre: nombreReserva, idP: idPReserva, telefono: telefonoReserva, origen: origenReserva, destino: destinoReserva, viaje: viajeReserva , fechaIda: fechaIdaReserva, fechaRegreso: fechaRegresoReserva} = reservaObjeto

    editar = true;
    //console.log(citasObj);
    formulario.querySelector('button[type=submit]').textContent = 'Actualizar'
    console.log(reservaObjeto);
    
    
     // Llenar los inputs con la informacion del div donde estoy editando
     nombre.value = nombreReserva;
     idP.value = idPReserva;
     telefono.value = telefonoReserva;
     origen.value = origenReserva;
     destino.value = destinoReserva;
     viaje.value = viajeReserva;
     fechaIda.value = fechaIdaReserva;
     fechaRegreso.value = fechaRegresoReserva;
 
     

    //llenar el objeto
    reservasObj.nombre = nombreReserva
    reservasObj.idP = idPReserva
    reservasObj.telefono = telefonoReserva
    reservasObj.origen = origenReserva
    reservasObj.destino = destinoReserva
    reservasObj.viaje = viajeReserva
    reservasObj.fechaIda = fechaIdaReserva
    // reservasObj.fechaRegreso = fechaRegresoReserva


    if (viajeReserva === ida) {
        reservasObj.fechaRegreso = ""; // Eliminar valor si es 'solo ida'
    } else if (viajeReserva === vuelta){
        reservasObj.fechaRegreso = fechaRegresoReserva;
    }


    reservasObj.id = id;
  
    ui.imprimirReservas({ reservas: administrarReserva.reservas });
     
}

// Obtener la fecha actual 
const fechaActual = new Date().toISOString().slice(0, 10);

fechaIda.setAttribute('min', fechaActual);



window.addEventListener('DOMContentLoaded', (event) => {
    validarPais();
   
});



    

let fechaRegresoDiv = document.getElementById("fechaRegresoDiv");
let tipo2 = document.getElementById("ida")
tipo2.addEventListener("click", (event) => {
    fechaRegresoDiv = document.getElementById("fechaRegresoDiv");
    fechaRegresoDiv.style.display = "none";
    fechaRegreso.required = false;
    fechaRegreso.value = "";
})

let tipo1 = document.getElementById("vuelta")

tipo1.addEventListener("click", (event) => {
    fechaRegresoDiv.style.display = "block";
    fechaRegreso.required = true;
})

