
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {
  //Objeto funcionario
  const funcionario = {
    matricula: '',
    nome: '',
    codigo: '',
    departamento: ''
  }

  // UseState
  const[btnCadastrar, setBtnCadastrar] = useState(true);
  const[funcionarios, setFuncionario] = useState([]);
  const[objFuncionario, setObjFuncionario] = useState(funcionario);

  // UseEffect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno=> retorno.json())
    .then(retorno_convertido=> setFuncionario(retorno_convertido));
  }, []);

  //Obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjFuncionario({...objFuncionario, [e.target.name]:e.target.value});
  }

  //Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body:JSON.stringify(objFuncionario),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
    setFuncionario([...funcionarios, retorno_convertido]);
    limparFormulario();

    })
  }

  //Alterar produto
  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body:JSON.stringify(objFuncionario),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
    
    //Cópia do vetor de funcionarios
    let vetorTemp = [...funcionario];

    //Índice
    let indice = vetorTemp.findIndex((p) => {
      return p.codigo === objFuncionario.matricula;
    });

    //Alterar funcionario do vetorTemp
    vetorTemp[indice] = objFuncionario;

    //Atualizar vetor de funcionarios
    setFuncionario(vetorTemp);

    limparFormulario();

    })
  }


  //Remover produto
  const remover = () => {
    fetch('http://localhost:8080/remover/'+objFuncionario.matricula, {
      method: 'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
    
      //Cópia do vetor de funcionarios
      let vetorTemp = [...funcionario];

      //Índice
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objFuncionario.matricula;
      });

      //Remover funcionario do vetorTemp
      vetorTemp.splice(indice, 1);

      //Atualizar vetor de funcionarios
      setFuncionario(vetorTemp);

      //Limpar formulario
      limparFormulario();

    })
  }

  //Limpar formulário
  const limparFormulario = () => {
    setObjFuncionario(funcionario);
    setBtnCadastrar(true);
  }

  //Selecionar Funcionario
  const selecionarFuncionario = (indice) => {
    setObjFuncionario(funcionarios[indice]);
    setBtnCadastrar(false);
  } 

  return (
    <div>
       <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objFuncionario} cancelar={limparFormulario} remover={remover} alterar={alterar}></Formulario>
       <Tabela vetor={funcionarios} selecionar={selecionarFuncionario}></Tabela>
    </div>
  );
}

export default App;
