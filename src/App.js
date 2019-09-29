import React from 'react';
import './app.modules.scss';
import Login from './containers/login/login';
import ProductListing from './containers/productListing/productListing';

function App() {
  return (
    <div className="App">
      <ProductListing></ProductListing>
    </div>
  );
}

export default App;
