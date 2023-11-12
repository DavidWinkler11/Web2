import React from 'react';
import ReactDOM from 'react-dom/client';
import XSSInjection from './XSSInjection';
import SensitiveDataExposure from './SensitiveDataExposure';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <XSSInjection />
    <hr></hr>
    <SensitiveDataExposure />
  </React.StrictMode>
);


