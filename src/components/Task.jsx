/* eslint-disable react/prop-types */
import { Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";
import { borrarTareasAPI, obtenerTareaAPI } from "../helpers/queries";
import Swal from "sweetalert2";


const Task = ({
  tarea,
  setListaDeTareas,
  setEditar ,
  setId,
  setValue,
}) => {


  const [click, setclick] = useState(true);

  // Función para eliminar la tarea

  const borrarTarea = async () => {
    const respuesta = await borrarTareasAPI(tarea._id);
    if (respuesta === 200) {
      console.info("La tarea se elimino con exito");
    }
    const respuestaTareas = await obtenerTareaAPI();
    if (respuestaTareas.status === 200) {
      const tareasRestantes = await respuestaTareas.json();
      setListaDeTareas(tareasRestantes);
    }
  };


  const editarTarea = async () => {
    Swal.fire({
      title: "Estás seguro que deseas editar esta tarea?",
      text: "Editarás el contenido de la tarea",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setEditar(true);
        setId(tarea._id);
        setValue("Task", "EDITANDO");
      }
    });
  };
  
  

  const containerClassName = click
    ? "bg-green-700 p-3 rounded-md flex items-center justify-between flex-col md:flex-row gap-5"
    : "bg-red-900 p-3 rounded-md flex items-center justify-between line-through text-lg flex-col md:flex-row gap-5";

  return (
    <div className={containerClassName}>
      <h2>{tarea.Task} </h2>
      <ButtonGroup className="gap-0.3  ">
        <Button
          onClick={() => editarTarea(tarea, tarea.id)}
          variant="ghost"
          color="secondary"
          className=" text-slate-200	font-semibold"
        >
          Editar
        </Button>
        <Button
          onClick={() => borrarTarea(tarea.id)}
          variant="ghost"
          color="danger"
          className=" text-slate-200	 font-semibold"
        >
          Borrar
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Task;
