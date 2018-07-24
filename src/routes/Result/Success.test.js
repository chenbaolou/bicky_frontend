import React from 'react';
import { shallow } from 'C:/Users/chenb/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/enzyme';
import Success from './Success';

it('renders with Result', () => {
  const wrapper = shallow(<Success />);
  expect(wrapper.find('Result').length).toBe(1);
  expect(wrapper.find('Result').prop('type')).toBe('success');
});
