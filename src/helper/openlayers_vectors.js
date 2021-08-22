import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { Draw, Modify, Snap } from 'ol/interaction';
import GeometryType from 'ol/geom/GeometryType';
import {Style, Fill, Stroke} from 'ol/style';

import sync from 'ol-hashed';

const openlayers = (() => {
  let map = null;
  
  let vectorLayer = null;
  let vectorSource = null;

  let emptyVectorLayer = null;
  let emptyVectorSource = null;

  const generateMap = (mapWrapperId) => {
    generateVectorSource();
    generateVectorLayer();

    generateEmptyVectorSource();
    generateEmptyVectorLayer();

    const _map = new Map({  // we need to create a private constant _map for sync() to work properly
      target: mapWrapperId,
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    _map.addLayer(getVectorLayer())
    
    _map.addInteraction(new Modify({
      source: getVectorSource()
    }));

    _map.addInteraction(new Draw({
      type: GeometryType.POLYGON,
      source: getVectorSource()
    }));

    _map.addInteraction(new Snap({  // doesn't seem to be working
      source: getVectorSource()
    }));

    sync(_map);
    map = _map;
  }

  const getMap = () => {
    return map;
  }

  const generateVectorLayer = () => {
    const style1 = new Style({
      fill: new Fill({ color: 'red' }),
      stroke: new Stroke({ color: 'white' })
    });

    const style2 = new Style({
      fill: new Fill({ color: 'blue' }),
      stroke: new Stroke({ color: 'black' })
    })

    vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature, resolution) => {
        const name = feature.get('name') ? feature.get('name').toUpperCase() : '';
        return name < 'N' ? style1 : style2;
      }
    });
  }

  const getVectorLayer = () => {
    return vectorLayer;
  }

  const generateEmptyVectorLayer = () => {
    emptyVectorLayer = new VectorLayer({
      source: emptyVectorSource
    });
  }

  const getEmptyVectorLayer = () => {
    return emptyVectorLayer;
  }

  const generateVectorSource = () => {
    vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: 'https://raw.githubusercontent.com/openlayers/workshop/master/src/en/data/countries.json'
    })
  }

  const getVectorSource = () => {
    return vectorSource;
  }

  const generateEmptyVectorSource = () => {
    emptyVectorSource = new VectorSource();
  }

  const getEmptyVectorSource = () => {
    return emptyVectorSource;
  }

  return {
    generateMap,
    getMap,

    generateVectorLayer,
    getVectorLayer,
    generateEmptyVectorLayer,
    getEmptyVectorLayer,

    generateVectorSource,
    getVectorSource,
    generateEmptyVectorSource,
    getEmptyVectorSource
  }
})();

export default openlayers;