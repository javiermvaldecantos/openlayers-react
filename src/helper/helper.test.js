import React from 'react';
import { mount } from 'enzyme';
import openlayers from './openlayers_scratch';
import ScratchMapContainer from '../components/ScratchMapContainer';

test('Scratch map has two layers [TEST WITHOUT REACT]', () => {
  openlayers.generateMap('mock-map', []);

  const map = openlayers.getMap();

  expect(map.getLayers().getLength()).toBe(2);
});

test('Scratch map has two layers', () => {
  const scratch_map_container = mount(<ScratchMapContainer />);
  const scratch_map = scratch_map_container.find('ScratchMap');
  
  expect(scratch_map.instance().map.getLayers().getLength()).toBe(2);
});

test('Adding a marker adds a new feature to the vector layer', () => {
  const scratch_map_container = mount(<ScratchMapContainer />);
  const scratch_map_controls__latitude = scratch_map_container.find('ScratchMapControls #scratch-map-controls--latitude');
  const scratch_map_controls__longitude = scratch_map_container.find('ScratchMapControls #scratch-map-controls--longitude');
  const scratch_map_controls__form = scratch_map_container.find('ScratchMapControls .scratch-map-controls--marker-form');
  
  const scratch_map = scratch_map_container.find('ScratchMap');
  const layers = scratch_map.instance().map.getLayers();
  let scratchingLayer = null;
  layers.forEach(layer => {
    if (layer.get('id') === 'scratching-layer') {
      // this is the scratching layer
      scratchingLayer = layer;
    }
  });

  const scratchingLayerInitialLength = scratchingLayer.getSource().getFeatures().length;
  const initialNumberOfMarkers = scratch_map_container.state().markers.length;

  // Add a marker with lat = 0 and long = 0
  scratch_map_controls__latitude.simulate('change', { target: { value: '0' } });
  scratch_map_controls__longitude.simulate('change', { target: { value: '0' } });
  scratch_map_controls__form.simulate('submit');

  const scratchingLayerFinalLength = scratchingLayer.getSource().getFeatures().length;
  const finalNumberOfMarkers = scratch_map_container.state().markers.length;

  // number of markers should have increased by 1
  expect(scratchingLayerFinalLength).toBe(scratchingLayerInitialLength + 1);

  // we should have one more marker on the state
  expect(finalNumberOfMarkers).toBe(initialNumberOfMarkers + 1);
});