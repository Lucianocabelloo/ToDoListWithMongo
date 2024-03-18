const URI_TAREA = import.meta.env.VITE_URI_API

// Realizamos el metodo get

export const obtenerTareaAPI = async () =>{
    try {
        const respuesta = await fetch(URI_TAREA);
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

// Realizamos el metodo Post

export const crearTareasApi = async (tareaNueva) =>{
    try {
        const respuesta = await fetch(URI_TAREA, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tareaNueva)
        })
        return respuesta;
    } catch (error) {
        console.log("Error al enviar los datos", error);
    }
}

// Realizamos el metodo delete

export const borrarTareasAPI = async (id) =>{
    try {
        const repuesta = await fetch(`${URI_TAREA}/${id}`, {
            method:'DELETE'
        })
        return repuesta
    } catch (error) {
        console.error("Se detecto el error", error)
    }
}

// Realizamos el modo editar

export const editarTareasAPI = async (tareaNueva, id) =>{
    try {
        const repuesta = await fetch(`${URI_TAREA}/${id}`, {
            method:'PUT',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(tareaNueva)
        })
        return repuesta
    } catch (error) {
        console.error("Se detecto el error", error)
    }
}