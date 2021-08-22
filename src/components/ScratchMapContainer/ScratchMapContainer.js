import React from 'react';
import './ScratchMapContainer.scss';
import ScratchMapControls from './ScratchMapControls';
import ScratchMap from './ScratchMap';
import openlayers from '../../helper/openlayers_scratch';

class ScratchMapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visitedPlaces: [],
      markers: [],
      markerFormParams: {
        latitude: '',
        longitude: ''
      }
    }
  }

  render() {
    return (
      <div className="scratch-map-container">
        <div className="scratch-map-container--wrapper row">
          <div className="scratch-map-container--controls-wrapper col-md-4">
            <ScratchMapControls
              visitedPlaces={this.state.visitedPlaces}
              markers={this.state.markers}
              markerFormParams={this.state.markerFormParams}
              onMarkerFormChange={this.updateMarkerFormParams.bind(this)}
              onMarkerFormSubmit={this.addNewMarker.bind(this)} />
          </div>
          <div className="scratch-map-container--map-wrapper col-md-8">
            <ScratchMap
              visitedPlaces={this.state.visitedPlaces}
              onNewVisitedPlace={this.addNewVisitedPlace.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }

  updateMarkerFormParams(paramName, paramValue) {
    let newMarkerFormParams = {
      ...this.state.markerFormParams
    }

    newMarkerFormParams[paramName] = paramValue;

    this.setState({ markerFormParams: newMarkerFormParams });
  }

  addNewMarker(event) {
    event.preventDefault();
    const coords = [
      parseFloat(this.state.markerFormParams.longitude || 0),
      parseFloat(this.state.markerFormParams.latitude || 0)
    ];

    let newMarkers = [
      ...this.state.markers
    ];
    newMarkers.push(coords);
    this.setState({ markers: newMarkers });

    openlayers.addMarkerToScratchingLayerSource(coords);
  }

  addNewVisitedPlace(coords) {
    let newVisitedPlaces = [
      ...this.state.visitedPlaces
    ];

    newVisitedPlaces.push(coords);

    this.setState({ visitedPlaces: newVisitedPlaces })
  }
}

export default ScratchMapContainer;