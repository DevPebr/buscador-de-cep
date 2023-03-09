import React, {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import './App.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  const hundleSearch = async() => {
    // 01001000/json/

    if(input === "") {
      alert("Preencha o campo");
      return
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');

    } catch (error) {
      console.log(error);
      alert("Ops, erro ao buscar!");
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador Cep</h1>

      <div className="containerInput">
        <input type="text"
         placeholder='Digite seu Cep...'
          value={input}
           onChange={(e) => setInput(e.currentTarget.value)} 
           maxLength={10}/>
        <button className="buttonSearch" title='Buscar' onClick={hundleSearch}>
          {/* Procurar */}
          <FiSearch size={25} color='#fff'/>
          </button>
      </div>

    {Object.keys(cep).length > 0 && (
      <main className="main">
      <h2>Cep: {cep.cep}</h2>

      <span>{cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>Localidade: {cep.localidade} - {cep.uf}</span>
      <span>DDD: {cep.ddd}</span>
    </main>
    )}

    </div>
  );
}

export default App;
