import React, { Fragment } from 'react';
// setup file
import { configure } from 'enzyme';
import {Row} from 'antd';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';
import Address from './Address';

describe('Address', () => {
    it('should render a Address component.', () => {
    
        const wrapper = shallow(<Address street="123 rue charonne" city="paris" postalCode="75011"/>);
        const actualResult = wrapper.exists();
        const expectedResult = true;
        expect(actualResult).toBe(expectedResult);
    });

   

    xit('should  a Address component.', () => {
    
        const wrapper = shallow(<Address street="123 rue charonne" city="paris" postalCode="75011"/>);
        const actualResult = wrapper.exists();
        const expectedResult = true;
        expect(wrapper.contains()).to.equal(true);
    });
});
