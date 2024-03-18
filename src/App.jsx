import { useState, useEffect } from 'react';
import "./App.css";
import { Input, Button } from "@nextui-org/react";
import TaskList from "./components/TaskList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSound from 'use-sound';
import backgroundMusic from "./assets/musica-navidad.mp3";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { crearTareasApi, editarTareasAPI, obtenerTareaAPI } from './helpers/queries';



function App() {

  

  const [play, { stop }] = useSound(backgroundMusic, { volume: 0.5, loop: true });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    if (isMusicPlaying) {
      play();
    } else {
      stop();
    }
  }, [isMusicPlaying, play, stop]);
  
  const handleToggleMusic = () => {
    setIsMusicPlaying(prevState => !prevState);
    if (!isMusicPlaying) {
      toast.info('🎵 Música iniciada', {
        info: "bg-blue-600",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.info('🔇 Música detenida', {
        info: "bg-blue-600",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  

  const [listaDeTareas, setListaDeTareas] = useState([]);
  const [editar, setEditar] = useState(false)
  const [id, setId] = useState("")


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();


  useEffect(() => {

 obtenerTareas()
  }, [])
  


const obtenerTareas = async () => {
    const respuesta = await obtenerTareaAPI();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaDeTareas(datos);
    } else {
      alert("ocurrio un error");
    }
  };




  const onSubmit = async (tareaNueva) => {
    if (editar) {
      const respuesta = await editarTareasAPI(tareaNueva, id);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Tarea modificada con éxito",
          text: "La tarea se modifico",
          icon: "success",
        });
        setEditar(false);
        setId("");
        reset();
        obtenerTareas()
      } else {
        Swal.fire({
          title: "Ocurrio un error",
          text: `La tarea no pudo ser modificada, intentelo nuevamente dentro de unos minutos`,
          icon: "error",
        });
      }
    } else {
      const respuesta = await crearTareasApi(tareaNueva);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "Tarea creada",
          text: `La tarea fue creada correctamente`,
          icon: "success",
        });
        reset();
        obtenerTareas()
      } else {
        Swal.fire({
          title: "Ocurrio un error",
          text: `La tarea no pudo ser creada, intentelo nuevamente dentro de unos minutos`,
          icon: "error",
        });
      }
    }
  };


  return (
    <>
    <ToastContainer/>
    <div className='flex gap-3'>
      <button onClick={handleToggleMusic}>Iniciar/Detener Música</button>
    </div>
      <h1 className=" text-6xl mb-10">Lista de tareas</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center gap-3 mb-20" >
        <Input type="text" label="Ingrese la tarea"   {...register("Task", {
              required: "La tarea es obligatoria",
              minLength: {
                value: 5,
                message: "Debe ingresar como minimo 10 caracteres",
              },
              maxLength: {
                value: 100,
                message: "Debe ingresar como maximo 100 caracteres",
              },
            })} />
        <Button type='submit' className=" p-7" size="md" radius="md" color="danger">
          Agregar Tarea
        </Button>
      </form>
      <div>
      <TaskList 
          listaDeTareas={listaDeTareas}
          setListaDeTareas={setListaDeTareas}
          setEditar={setEditar}
          setId={setId}
          setValue={setValue} />
      </div>
    </>
  );
}

export default App;
