import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaCarSide, FaMotorcycle } from 'react-icons/fa';

import api from './services/api';

import logo from './assets/webmotors.svg';

import './App.css';

function App() {
  const [makes, setMakes] = useState([]);
  const [makeId, setMakeId] = useState('');
  const [models, setModels] = useState([]);
  const [modelId, setModelId] = useState('');
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    async function loadMakes() {
      const response = await api.get('/Make');
  
      setMakes(response.data);
    }
  
    async function loadModels() {
      const response = await api.get('/Model', { params: { MakeID: makeId }});
  
      setModels(response.data);
    }
  
    async function loadVersions() {
      const response = await api.get('/Version', { params: { ModelID: modelId }});
  
      setVersions(response.data);
    }

    loadMakes();
    loadModels();
    loadVersions();
  }, [makeId, modelId]);

  

  return (
    <div className='container'>
      <header>
        <img src={logo} alt="webmotors"/>
        <div className='category-box'>
          <div className='left'>
            <div className='category selected'>
              <FaCarSide />
              <div>
                <span>COMPRAR</span>
                <strong>CARROS</strong>
              </div>
            </div>
            <div className='category'>
              <FaMotorcycle />
              <div>
                <span>COMPRAR</span>
                <strong>MOTOS</strong>
              </div>
            </div>
          </div>
          <div>
          <button>Vender meu carro</button>
          </div>
        </div>
      </header>
      <div className='content'>
        
        <div className='selection-box'>
          <div>
            <input type="checkbox" name="new" id="new"/>
            <label htmlFor="new">Novos</label>
          </div>
          <div>
            <input type="checkbox" name="used" id="used"/>
            <label htmlFor="used">Usados</label>
          </div>
        </div>
        
        <form>
          <div className='input-box'>
            <input id='location' type='text' value='Onde: São Paulo - SP'/>
            <select style={{ width: 110 }}>
              <option>Raio: 100km</option>
            </select>
            <select id='make' value={makeId} onChange={(e) => setMakeId(e.target.value)}>
              <option>Todas</option>
              {makes.map(make => (
                <option key={make.ID} value={make.ID}>{make.Name}</option>
              ))}
            </select>
            <select id='model' value={modelId} onChange={(e) => setModelId(e.target.value)}>
              <option>Todos</option>
              {models.map(model => (
                <option key={model.ID} value={model.ID}>{model.Name}</option>
              ))}
            </select>
          </div>
          <div className='input-box'>
          <select id='year'>
              <option>Ano Desejado</option>
            </select>
            <select id='price'>
              <option>Faixa de Preço</option>
            </select>
            <select id='version'>
              <option>Versão: Todas</option>
              {versions.map(version => (
                <option key={version.ID} value={version.ID}>Versão: {version.Name}</option>
              ))}
            </select>
          </div>
          <div className='search-box'>
            <button id='advanced-search'>
              <MdKeyboardArrowRight />
              Busca Avançada
            </button>
            <div>
              <button id='clear-filters'>Limpar filtros</button>
              <button id='see-offers'>VER OFERTAS</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
