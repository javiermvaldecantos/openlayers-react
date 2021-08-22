import React from 'react';
import './App.scss';
import ScratchMapContainer from '../ScratchMapContainer';
// import VectorMap from '../VectorMap';
// import VectorTileMap from '../VectorTileMap';
// import GoogleMap from '../GoogleMap';

const App = () => (
  <div className="app container-fluid">
    {/* Map with "scratchable" layer, and inputs to add dots */}
    <ScratchMapContainer />

    {/* Vector tiles test */}
    {/* <VectorMap /> */}

    {/* Vector tiles test */}
    {/* <VectorTileMap /> */}
    
    {/* Google Maps test */}
    {/* <GoogleMap /> */}
  </div>
);

export default App;
