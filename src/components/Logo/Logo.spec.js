import React, { Fragment } from 'react';
// setup file
import { configure } from 'enzyme';
import {Avatar} from 'antd';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';
import Logo from './Logo';

describe('Logo', () => {
    it('should render a Logo component.', () => {
    
        const wrapper = shallow(<Logo url="http://www.google.fr"/>);
        const actualResult = wrapper.exists();
        const expectedResult = true;
        expect(actualResult).toBe(expectedResult);
    });

    xit('should render a Avatar component.', () => {
        const url = "http://www.google.fr";
        const wrapper = shallow(<Logo url={url}/>);
        expect(wrapper.find(Avatar)).to.have.lengthOf(1);
        //expect(wrapper.contains(<Avatar shape="square" size={64} src={url} />).to.equal(true));
    });

   
});
