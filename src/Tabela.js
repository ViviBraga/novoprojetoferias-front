function Tabela({vetor, selecionar}) {
    return(
        <table className="table">

            <thead>
                <tr>
                    <th>#</th>
                    <th>Matricula</th>
                    <th>Nome</th>
                    <th>Código Departamento</th>
                    <th>Nome do departamento</th>
                </tr>
            </thead>
            <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{indice+1}</td>
                            <td>{obj.matricula}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.codigo}</td>
                            <td>{obj.departamento}</td>
                            <td><input type="button" onClick={() => {selecionar(indice)}} value="Selecionar" className="btn btn-primary" /></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Tabela;