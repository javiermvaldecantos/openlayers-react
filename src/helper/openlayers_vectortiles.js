import 'ol/ol.css';
import { Map, View, Feature } from 'ol';
import MVT from 'ol/format/MVT';
import { Vector as VectorLayer, VectorTile as VectorTileLayer } from 'ol/layer';
import { Vector as VectorSource, VectorTile as VectorTileSource } from 'ol/source';
import {fromExtent} from 'ol/geom/Polygon';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke } from 'ol/style';
import { apply } from 'ol-mapbox-style';

const openlayers = (() => {
  let map = null;

  let vectorTileLayer = null;
  let vectorTileSource = null;

  let vectorLayer = null;
  let vectorSource = null;

  const generateMap = (mapWrapperId) => {
    generateVectorTileSource();
    generateVectorTileLayer();

    generateVectorSource();
    generateVectorLayer();
    
    map = apply(mapWrapperId, 'https://raw.githubusercontent.com/openlayers/workshop/master/src/en/data/bright.json');
    
    // map = new Map({
    //   target: mapWrapperId,
    //   view: new View({
    //     center: fromLonLat([-117.1625, 32.715]),
    //     zoom: 6
    //   })
    // });

    // map.addLayer(vectorTileLayer);

    map.addLayer(vectorLayer);

    map.on('pointermove', function(event) {
      vectorSource.clear();
      map.forEachFeatureAtPixel(event.pixel, function(feature) {
        const geometry = feature.getGeometry();
        vectorSource.addFeature(new Feature(fromExtent(geometry.getExtent())));
      }, {
        hitTolerance: 2
      });
    });
  }

  const getMap = () => {
    return map;
  }

  const generateVectorTileLayer = () => {
    vectorTileLayer = new VectorTileLayer({
      source: vectorTileSource
    })
  }

  const getVectorTileLayer = () => {
    return vectorTileLayer;
  }

  const generateVectorTileSource = () => {
    vectorTileSource = new VectorTileSource({
      attributions: [
        '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
        '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
      ],
      format: new MVT(),
      url: 'https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=ijle5zgMHPwmc6M82P6D',
      maxZoom: 14
    });
  }

  const getVectorSource = () => {
    return vectorSource;
  }

  const generateVectorLayer = () => {
    vectorLayer = new VectorLayer({
      map: map,
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 4
        })
      })
    })
  }

  const getVectorLayer = () => {
    return vectorLayer;
  }

  const generateVectorSource = () => {
    vectorSource = new VectorSource();
  }

  const getVectorTileSource = () => {
    return vectorTileSource;
  }

  return {
    generateMap,
    getMap,
    generateVectorTileLayer,
    getVectorTileLayer,
    generateVectorTileSource,
    getVectorTileSource,
    generateVectorLayer,
    getVectorLayer,
    generateVectorSource,
    getVectorSource
  }
})()

export default openlayers;