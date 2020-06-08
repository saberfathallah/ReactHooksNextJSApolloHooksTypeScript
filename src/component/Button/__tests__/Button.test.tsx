/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import Button from '../Button';

test('hello world', () => {
  const wrapper = mount(<Button text="Hello Jest!" />);
  expect(wrapper.text()).toMatch('Hello Jest!');
});
