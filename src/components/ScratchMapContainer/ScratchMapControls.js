import React from 'react';

const ScratchMapControls = ({ visitedPlaces, markers, markerFormParams, onMarkerFormChange, onMarkerFormSubmit }) => {

  const markerFormParamsAreValid = () => {
    const latitudeIsValid = parseFloat(markerFormParams.latitude) <= 90 && parseFloat(markerFormParams.latitude) >= -90;
    const longitudeIsValid = parseFloat(markerFormParams.longitude) <= 180 && parseFloat(markerFormParams.longitude) >= -180;
    return latitudeIsValid && longitudeIsValid;
  }

  return (
    <div className="scratch-map-controls">
      <h3>Add a marker</h3>
      <form
        className="scratch-map-controls--marker-form"
        onSubmit={onMarkerFormSubmit}
        autoComplete="off"
      >
        <p className="scratch-map-controls--clarification-message">
          Latitude and longitude must have valid values
        </p>
        <div className="form-group">
          <label htmlFor="scratch-map-controls--latitude">Latitude</label>
          <input
            type="text"
            id="scratch-map-controls--latitude"
            className="scratch-map-controls--latitude form-control"
            value={markerFormParams.latitude}
            onChange={event => onMarkerFormChange('latitude', event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="scratch-map-controls--longitude">Longitude</label>
          <input
            type="text"
            id="scratch-map-controls--longitude"
            className="scratch-map-controls--longitude form-control"
            value={markerFormParams.longitude}
            onChange={event => onMarkerFormChange('longitude', event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="scratch-map-controls--submit-btn btn btn-primary"
          disabled={!markerFormParamsAreValid()}
        >
          Add
        </button>
      </form>

      <hr />

      <h3>Markers</h3>
      <p>Markers are added after filling out the form</p>
      <ul>
        {markers.map((marker, index) =>
          <li key={index}>{JSON.stringify(marker)}</li>
        )}
      </ul>

      <hr />

      <h3>Visited Places</h3>
      <p>Visited places are added after clicking on the map</p>
      <ul>
        {visitedPlaces.map((place, index) =>
          <li key={index}>{JSON.stringify(place)}</li>
        )}
      </ul>

    </div>
  )

}

export default ScratchMapControls;