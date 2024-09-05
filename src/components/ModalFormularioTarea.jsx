import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";

const PRIORIDAD = ['Baja', 'Media', 'Alta']

const ModalFormularioTarea = () => {

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [prioridad, setPrioridad] = useState("");

  const params = useParams()

  const { modalFormularioTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea, tarea } = useProyectos();

  useEffect(() => {
    if(tarea?._id){
      setId(tarea._id)
      setNombre(tarea.nombre)
      setDescripcion(tarea.descripcion)
      setFechaEntrega(tarea.fechaEntrega?.split('T')[0])
      setPrioridad(tarea.prioridad)
      return
    }

    setId('')
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setPrioridad('')
  }, [tarea])

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre, descripcion, fechaEntrega, prioridad].includes('')){
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    await submitTarea({id, nombre, descripcion, fechaEntrega, prioridad, proyecto: params.id})

    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setPrioridad('')
  }

  const {msg} = alerta

  return (
    <>

      <Transition appear show={modalFormularioTarea} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleModalTarea}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between mb-5">
                    <Dialog.Title
                      as="h3"
                      className="flex justify-between text-lg font-medium leading-6 text-gray-900"
                    >
                      {id ? 'Editar Tarea' : 'Crear Tarea'}
                    </Dialog.Title>

                    <div className="">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleModalTarea}
                      >
                        X
                      </button>
                    </div>
                  </div>

                  {msg && <Alerta alerta={alerta} /> }

                  <form 
                    onSubmit={handleSubmit}
                    className="my-10" action=""
                  >
                    <div className="mb-5">
                      <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Nombre Tarea
                      </label>

                      <input
                        id="nombre"
                        placeholder="Nombre de la Tarea"
                        type="text"
                        className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="descripcion"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Descripcion de la Tarea
                      </label>

                      <textarea
                        id="descripcion"
                        placeholder="Descripcion de la Tarea"
                        className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="fecha-entrega"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Fecha Entrega
                      </label>

                      <input
                        id="fecha-entrega"
                        type="date"
                        className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fechaEntrega}
                        onChange={(e) => setFechaEntrega(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="prioridad"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Prioridad
                      </label>

                      <select
                        id="prioridad"
                        className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                      >
                        <option value="" >--SELECT--</option>

                        {PRIORIDAD.map(opcion => (
                          <option key={opcion} >{opcion}</option>
                        ))}

                      </select>
                    </div>

                    <input 
                    type="submit" 
                    className="bg-sky-600 hover:bg-sky-700 w-full text-white uppercase font-bold cursor-pointer transition-colors rounded py-3 mt-4 text-sm"
                    value={id ? 'Guardar Cambios' : 'Crear Tarea'}
                    />

                  </form>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalFormularioTarea;
