import React from 'react';
import './ScratchMapContainer.scss';
import openlayers from '../../helper/openlayers_scratch';

class ScratchMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.map = null;  // this variable will hold the OpenLayers map object
  }

  render() {
    return (
      <div className="scratch-map" id="scratch-map">
      </div>
    );
  }

  componentDidMount() {
    openlayers.generateMap('scratch-map', this.props.visitedPlaces);

    this.map = openlayers.getMap();
    this.map.on('click', (event) => {
      const coordinate = event.coordinate;
      if (openlayers.removeCountryFromScratchingLayerSource(coordinate)) {
        this.props.onNewVisitedPlace(coordinate);
      }
    });
  }
}

export default ScratchMap;