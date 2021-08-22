import React from 'react';
import './GoogleMap.scss';
import openlayers from '../../helper/openlayers_google';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  
  render() {
    return (
      <div className="google-map" id="google-map">
      </div>
    );
  }

  componentDidMount() {
    openlayers.generateMap('google-map');
  }
}

export default GoogleMap;