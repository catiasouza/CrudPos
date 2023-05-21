import React from "react";
import Botao from "./Botao";
import Input from "./Input";
import "./Formulario.css";
import {useState} from "react";

function Formulario({titulo}) {
    const url = "http://localhost:3000/posts";
    const [id, setId] = useState("");
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    const capturarDados = (e) => {
        if(e.target.name === "nome") {
            setNome(e.target.value);
        }else if(e.target.name === "sobrenome") {
            setSobrenome(e.target.value);
        }else if(e.target.name === "dataNascimento") {
            setDataNascimento(e.target.value);
        }else if(e.target.cpf === "cpf") {
            setCpf(e.target.value);
        }
    }

    const btnPesquisar = () => {
        getDados(url);
    }

    const btnSalvar = () => {
        inserirDados(url);
    }

    const btnAtualizar = () => {
        atualizarDados(url+id);
    }

    const btnDeletar = () => {
        deletarDados(url+id);
    }

    const getDados = (url) => {
        fetch(url).then(response => response.json()).then(data => {
            const pessoa = data.find(item => item.cpf === cpf);

           setNome(pessoa.name);
            setSobrenome(pessoa.sobrenome);
            setDataNascimento(pessoa.dataNascimento);
            setId(pessoa.id); 
        })
        .catch(error => console.error(error));
    }
    const inserirDados = (url) => {
        const dados = {
          nome: nome,
          sobrenome: sobrenome,
          cpf: cpf,
          data_nascimento: dataNascimento
        };
   
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dados)
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
      }
      // atualizar cadastro do json server via requisicao http com fetch utilizando o method put
   const atualizarDados = (url) => {
    const dados = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        data_nascimento: dataNascimento
      };

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
  }
 // deletar cadastro do json via requisicao http com o fetch utilizando o method delete
 const deletarDados = (url) => {

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

  }
    return (
        <div id = "formulario">
            <h1>{titulo}</h1>
            <Input props={"Nome: "} name={"nome"} value={nome} onChange={capturarDados}/>
            <Input props={"Sobrenome: "} name={"sobrenome"} value={sobrenome} onChange={capturarDados} />
            <div id = "pesquisar_cpf">
                <Input props={"CPF: "} name={"cpf"} onChange={capturarDados}/>
                <Botao props={"Pesquisar"} onClick={btnPesquisar} />
            </div>
            <Input props={"Data de Nascimento: "}name={"dataNascimento"} value={dataNascimento} onChange={capturarDados}/>
            <Botao props={"salvar"} onClick={btnSalvar}/>
            <Botao props={"Atualizar"} onClick={btnAtualizar} />
            <Botao props={"Deletar"} onClick={btnDeletar} />
        </div>
    )
}
export default Formulario