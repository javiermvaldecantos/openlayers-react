import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// OpenLayers uses canvas and that makes errors when running tests. We need this module to remove those errors.
import 'jest-canvas-mock';

// Configure Enzyme
configure({ adapter: new Adapter() });

// Create URL object in case it's not defined
let URL = window.URL || {};
URL.createObjectURL = URL.createObjectURL || (() => {});