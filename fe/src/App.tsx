import React from 'react';
import { Header } from './components/Header';
import { Orders } from './components/Orders';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from "./style/GlobalStyles";

export function App(){
  return(
    <React.Fragment>
      <GlobalStyles />
      <Header />
      <Orders />
      <ToastContainer position='bottom-center'/>
    </React.Fragment>
  );
};
