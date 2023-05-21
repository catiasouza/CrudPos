function Botao({props, onClick}) {
    return (
        <div>
          <input type="submit" value={props} onClick={onClick}/>  
        </div>
    )
}

export default Botao