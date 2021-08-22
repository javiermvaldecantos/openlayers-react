import React from 'react';
import './VectorMap.scss';
import openlayers from '../../helper/openlayers_vectors';

class VectorMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  
  render() {
    return (
      <div className="vector-map" id="vector-map">
      </div>
    );
  }

  componentDidMount() {
    openlayers.generateMap('vector-map');
  }
}

export default VectorMap;