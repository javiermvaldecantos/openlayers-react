import { Map, View, Feature } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';


const openlayers = (() => {
  let map = null;

  let baseLayer = null;
  
  let scratchingLayerSource = null;
  let scratchingLayer = null;

  const generateMap = (mapWrapperId, visitedPlaces) => {
    generateBaseLayer();
    generateScratchingLayer(visitedPlaces);

    map = new Map({
      target: mapWrapperId,
      layers: [
        baseLayer,
        scratchingLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }

  const getMap = () => {
    return map;
  }

  const generateBaseLayer = () => {
    baseLayer = new TileLayer({
      id: 'base-layer',
      source: new OSM()
    });
  }

  const getBaseLayer = () => {
    return baseLayer;
  }

  const generateScratchingLayerSource = (visitedPlaces) => {
    scratchingLayerSource = new VectorSource({
      url: 'https://raw.githubusercontent.com/bernardobelchior/openlayers-scratch-map-tutorial/start/countries.geojson',
      format: new GeoJSON(),
    });

    scratchingLayerSource.once('addfeature', () => {
      const length = visitedPlaces.length;
      for (let i = 0; i < length; i++) {
        const place = visitedPlaces[i];
        const coordinate = fromLonLat(place);
        removeCountryFromScratchingLayerSource(coordinate);
      }
    });
  }

  const getScratchingLayerSource = () => {
    return scratchingLayerSource;
  }

  const removeCountryFromScratchingLayerSource = (coordinate) => {
    const featuresAtCoordinate = scratchingLayerSource.getFeaturesAtCoordinate(coordinate);
    const length = featuresAtCoordinate.length;

    if (length > 0) {
      for (let i = 0; i < length; i++) {
        scratchingLayerSource.removeFeature(featuresAtCoordinate[i])
      }
      return true;  // return true if a country was removed
    } else {
      return false; // return false if no country was removed
    }
  }

  const addMarkerToScratchingLayerSource = (coordinate) => {

    const geometry = new Point(fromLonLat(coordinate));
    const style = new Style({
      image: new CircleStyle({  // we need to add an image to the point or it will not be visible
        radius: 7,
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({ color: '#fff' })
      })
    });
    const feature = new Feature({ name: 'marker', geometry: geometry });
    feature.setStyle(style)
    scratchingLayerSource.addFeature(feature);
  }

  const generateScratchingLayer = (visitedPlaces) => {
    generateScratchingLayerSource(visitedPlaces);

    scratchingLayer = new VectorLayer({
      id: 'scratching-layer',
      source: scratchingLayerSource,
      style: new Style({  // fill the map with gold color
        fill: new Fill({
          color: '#D4AF37'
        })
      })
    });
  }

  const getScratchingLayer = () => {
    return scratchingLayer;
  }

  const setNewView = () => {
    if (map) {
      map.setView(new View({
        center: [0,0],
        zoom: 2
      }));
    }
  }

  return {
    getMap,
    generateMap,
    generateBaseLayer,
    getBaseLayer,
    generateScratchingLayerSource,
    getScratchingLayerSource,
    removeCountryFromScratchingLayerSource,
    addMarkerToScratchingLayerSource,
    generateScratchingLayer,
    getScratchingLayer,
    setNewView
  }
})();

export default openlayers;