import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({}) 
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  console.log(params)
  const {id} = params

  useEffect(() => {

    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_URL}api/usuarios/confirmar/${id}`
        const {data} = await axios(url)
        console.log('data',data)

        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    confirmarCuenta();

  }, []) //para que el componente se ejecute no mas una sola vez

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize ">
        confirma tu cuenta y comienza a crear tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white" >
        
        {msg && <Alerta alerta={alerta} /> }

        {cuentaConfirmada && (
          <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicia sesion
        </Link>
        )}

      </div>

    </>
  )
}

export default ConfirmarCuenta