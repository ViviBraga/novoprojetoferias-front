function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
    return(
        <form>
            <input type='text' value={obj.matricula} onChange={eventoTeclado} name='matricula' placeholder="Matricula" className="form-control"/>
            <input type="text" value={obj.nome} onChange={eventoTeclado} name='nome' placeholder="Nome" className="form-control"/>
            
            {
                botao
                ?
                <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary"/>
                
                :
                <div>
                    <input type="button" onClick={alterar} value="Alterar" className="btn btn-secondary"/>
                    <input type="button" onClick={remover} value="Remover" className="btn btn-secondary"/>
                    <input type="button" onClick={cancelar} value="Cancelar" className="btn btn-secondary"/>
                </div>
            }
        </form>
    )
}

export default Formulario;