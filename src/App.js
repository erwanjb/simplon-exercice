import React from 'react';
import NavMain from './component/navMain/navMain'
import './App.css';
import 'toastr/build/toastr.css';

function App() {
  return (
    <div className="App">
      <NavMain></NavMain>
      <p class="info">Pour commencer allez dans client et créez un client, ensuite vous pouvez lui rattachez un site dans site et lui donner des dates d'hébergement, puis vous pouvez gérer toutes les relance des sites dans relance. Vous pouvez consulter la fiche client d'un client dans le grid client ou tous les hébergements et les relances sont disponibles</p>
    </div>
  );
}

export default App;
