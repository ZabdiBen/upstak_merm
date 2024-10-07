import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
import Alerta from "../components/Alerta"
import io from 'socket.io-client'

let socket;

const Proyectos = () => {

  
  const {proyectos, alerta} = useProyectos()

  useEffect( () => {
    //!No me conecta con import.meta.env.URL
    // socket = io(import.meta.env.VITE_URL)
    socket = io('https://waiting-real-snap.glitch.me/')
    socket.emit('prueba', proyectos)

    socket.on('respuesta', (persona) => {
      console.log('desde el frontend', persona)
    })
  })

  const {msg} = alerta

  return (
    <>
      <h1 className="text-4xl font-black" >Proyectos</h1>

      {msg &&  <Alerta alerta={alerta} /> }

      <div className="bg-white shadow mt-10 rounded-lg " >
        {proyectos.length ? 
          proyectos.map(proyecto => (
            <PreviewProyecto 
              key={proyectos._id}
              proyecto={proyecto}
            />
          ))
        : <p className="text-center text-gray-600 uppercase p-5" >No hay proyectos aun</p> }
      </div>
    </>
  )
}

export default Proyectos
