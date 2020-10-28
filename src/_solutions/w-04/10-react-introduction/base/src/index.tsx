import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';
import '../public/css/reset.min.css';

const root = document.querySelector('#root');
render(<App name="Memorix" />, root);
