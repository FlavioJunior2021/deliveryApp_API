import React from 'react';
import { Header } from './components/Header';
import { Orders } from './components/Orders';

import { GlobalStyles } from "./style/GlobalStyles";

export function App(){
  return(
    <React.Fragment>
      <GlobalStyles />
      <Header />
      <Orders />
    </React.Fragment>
  );
};
