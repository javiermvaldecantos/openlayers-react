import React from 'react';
import './VectorTileMap.scss';
import openlayers from '../../helper/openlayers_vectortiles';

class VectorTileMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="vector-tile-map" id="vector-tile-map">
      </div>
    );
  }

  componentDidMount() {
    openlayers.generateMap('vector-tile-map');
  }
}

export default VectorTileMap;