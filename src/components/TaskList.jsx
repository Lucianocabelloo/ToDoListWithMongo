/* eslint-disable react/prop-types */
import Task from "./Task";

const TaskList = ({
  listaDeTareas,
  setListaDeTareas,
  setEditar,
  setId,
  setValue,
}) => {
  console.log(listaDeTareas);
  return (
    <>
      <div className="flex flex-col gap-5">
        {listaDeTareas.map((tarea) => {
          return (
            <Task
              key={tarea._id}
              tarea={tarea}
              setListaDeTareas={setListaDeTareas}
              setEditar={setEditar}
              setId={setId}
              setValue={setValue}
            ></Task>
          );
        })}
      </div>
    </>
  );
};

export default TaskList;
