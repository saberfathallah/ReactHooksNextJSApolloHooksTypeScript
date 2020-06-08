import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

global.fetch = require('jest-fetch-mock');

configure({ adapter: new EnzymeAdapter() });
