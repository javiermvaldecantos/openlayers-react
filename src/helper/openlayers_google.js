import Map from 'ol/Map.js';
import GoogleLayer from 'olgm/layer/Google.js';
import {defaults} from 'olgm/interaction.js';
import OLGoogleMaps from 'olgm/OLGoogleMaps.js';
import View from 'ol/View';

const openlayers = (() => {
  // let map = null;

  const generateMap = (mapWrapperId) => {
    // This dummy layer tells Google Maps to switch to its default map type
    const googleLayer = new GoogleLayer();

    var map = new Map({
      // use OL3-Google-Maps recommended default interactions
      interactions: defaults(),
      layers: [
        googleLayer
      ],
      target: mapWrapperId,
      view: new View({
        center: [-7908084, 6177492],
        zoom: 12
      })
    });

    var olGM = new OLGoogleMaps({map: map}); // map is the ol.Map instance
    olGM.activate();
  }

  return {
    generateMap
  }

})();

export default openlayers;