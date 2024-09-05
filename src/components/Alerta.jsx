
function Alerta({alerta}) {
  return (
    <div className={`${alerta.error ? 'bg-red-400 to-red-600' : 'bg-sky-400'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white front-bold text-sm my-10 `} >
        {alerta.msg}
    </div>
  )
}

export default Alerta