import React, { Fragment } from 'react';
// setup file
import { configure } from 'enzyme';
import {Row} from 'antd';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
    it('should render a Button component.', () => {
        const menuItems= ['sarra', 'hellal'];
    
        const wrapper = shallow(<Button menuItems={menuItems}/>);
        const actualResult = wrapper.exists();
        const expectedResult = true;
        expect(actualResult).toBe(expectedResult);
    })
});
