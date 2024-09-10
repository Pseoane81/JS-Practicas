const prompt = require("prompt-sync")({sigint: true});

// array para almacenar tareas
let tareas = []
let categoriasNombres = ["trabajo","Personal"]


// Agregar mas categorias
function mostrarCategorias(){
    console.log("Categorias existentes")
    categoriasNombres.forEach(function(categoria, indice){
                                console.log(indice + ": " + categoria)
    });
}

//agregar categorias por el usuario

function agregarCategoriaUsuario(nombreCategoria){
    categoriasNombres.push(nombreCategoria)
    console.log("Categoria " + nombreCategoria + "agregada correctamente")
}

// funcion para agregar una tarea
function agregarTarea(nombreRecibido, fechaLimiteRecibida = null){
    mostrarCategorias()

    let numeroCategoria = parseInt(prompt("Ingrese el numero de la categoria para a nueva Tarea: "))

    if(numeroCategoria >= 0 && numeroCategoria < categoriasNombres.length){
        tareas.push({nombre : nombreRecibido,
            completada : false,
            fechaLimite : fechaLimiteRecibida,
            categoria : numeroCategoria
    })
    console.log("Tarea agregada con exito")
    }else{
        console.log("Numero de categoria Incorrecto")
    }    
}

function eliminarTarea (indice){
        if (indice >= 0 && indice < tareas.length){
            tareas.splice(indice, 1)
            console.log("Tarea eliminada con exito!")
        }else{
            console.log("Indice de tarea invalido")
        }
}

function completarTarea(indice){
    if (indice >= 0 && indice < tareas.length){
        tareas[indice].completada = true
        console.log("Tarea marcada como correcta!")
    }else{
        console.log("Indice de tarea invalido")
    }
}

function modificarTarea(indice, nuevoNombre, nuevaFechaLimite = null, nuevoNumeroCategoria){
    if (indice >= 0 && indice < tareas.length){
        tareas[indice].nombre = nuevoNombre !== undefined ? nuevoNombre : tareas[indice].nombre
        tareas[indice].fechaLimite = nuevaFechaLimite !== undefined ? nuevaFechaLimite : tareas[indice].fechaLimite
        tareas[indice].categoria = nuevoNumeroCategoria !== undefined ? nuevoNumeroCategoria : tareas[indice].categoria
        console.log("Tarea Modificada")        
    }else{
        console.log("Indice de tarea invalido")
    }
}

// funcion que filtra tareas por categorias

function filtrarTareasCategorias(numeroCategoria) {
    let tareasFiltradas = tareas.filter(function(tarea){
        return tareas.categoria === numeroCategoria
    })
    return tareasFiltradas
}

function tareasCompletadas(numeroCategoria){
    let tareasCategorias = filtrarTareasCategorias(numeroCategoria)
    let tareasFiltradasTrue = tareasCategorias.reduce(function(contador, tarea){
        return tarea.completada ? contador + 1 : contador;
    }, 0);

    let tareasTotal = tareasCategorias.length

    console.log("Tareas de completadas de la categoria "+ numeroCategoria+": "+tareasFiltradasTrue+" de "+tareasTotal+"Tareas!")

}

function tareasNoCompletadas(){
    console.log("Tareas NO completadas")
    tareas.forEach(function(tarea){
        if(!tarea.completada){
            console.log("-Nombre " + tarea.nombre + ", Categoria: " + categoriasNombres[tarea.categoria])
        }
     })
}


function mostrarMenu(){
    console.log("--------Menu-------")
    console.log("1 - Agregar Tarea")
    console.log("2 - Eliminar Tarea")
    console.log("3 - Marcar Tarea como completada")
    console.log("4 - Modificar una tarea")
    console.log("5 - Mostrar las Tareas")
    console.log("6 - Ver todas las categorias")
    console.log("7 - Agregar categria")
    console.log("8 - Filtrar tareas por Categorias")
    console.log("9 - Ver tareas compeltadas por categoria")
    console.log("9 - Ver tareas NO compeltadas por categoria")
    console.log("0 - SALIR")

}

function interactuarConUsuario (){
    let opcion = -1

    while(opcion != 0){
        mostrarMenu()
        opcion = parseInt(prompt("Ingrese la Opcion Seleccionada: "))

        switch (opcion) {
            case 1:
                let nombreTareaNueva = prompt("Ingrese el nombre de la tarea a cargar: ")
                agregarTarea(nombreTareaNueva)
                break;
        
            case 2:
                let indiceAEliminar = parseInt(prompt("Ingrese el Indice de la Tarea a Eliminar: "))
                eliminarTarea(indiceAEliminar)
                break;

            case 3:
                let indiceACompletar = parseIntt(prompt("Ingrese el Indice de la Tarea a Completar: "))
                completarTarea(indiceACompletar)
                break;

            case 4:
                let indice = parseInt(prompt("Ingrese el indice a modificar: "))
                
                if(indice >= 0 && indice < tareas.length){
                    console.log("Que propiedad deseas modificar")
                    console.log("1 - Modificar el nombre")
                    console.log("2 - Modificar la fecha")
                    console.log("6 - Modificar la categoria")
                    let opcion = parseInt(prompt("Ingrese el numero a Modificar: ")) 

                    switch (opcion) {
                        case 1:
                            let nuevoNombre = prompt("Ingrese en nuevo nombre de la Tarea: ")
                            modificarTarea(indice, nuevoNombre)
                            break;
                        
                        case 2:
                            let nuevaFecha = prompt("Ingrese la nueva fecha limite: ")
                            modificarTarea(indice, undefined ,nuevaFecha)
                            break;

                        case 3:
                            let nuevoNumeroCategoria = parseInt(prompt("Ingrese nuevo Numero categoria: "))
                            if(nuevoNumeroCategoria >= 0 && nuevoNumeroCategoria < categoriasNombres.length){
                                modificarTarea(indice, undefined ,undefined,nuevoNumeroCategoria)
                            }
                            break;
                    
                        default:
                            break;
                    }
                }else{
                    console.log("Indice de tarea incorrecto")
                }

                
                break;

            case 5:
                console.log("-- LISTA DE TAREAS -- ")
                console.log(tareas)
                break;

            case 6:
                mostrarCategorias()
                break;

            case 7:
                let nuevaCategoria = prompt("Ingrese el nombre de la nueva Categoria: ")
                agregarCategoriaUsuario(nuevaCategoria)
                break;

            case 8:
                mostrarCategorias()
                let numeroCategoria = parseInt(prompt("Ingrese el numero de la categoria: "))
                let tareasFiltradasCategoria = filtrarTareasCategorias(numeroCategoria)
                console.log("Tareas de la categoria seleccionada")
                console.log(tareasFiltradasCategoria)
                break;

            case 9:
                mostrarCategorias()
                let nuroCategoria = parseInt(prompt("Ingrese el numero de la categoria a visualizar: "))
                tareasCompletadas(nuroCategoria)
                break;

            case 10:
                tareasNoCompletadas()
                break;


            default:
                console.log("Opcion Invalida")
                break;
        }
    }
}

interactuarConUsuario()


