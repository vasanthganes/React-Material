import React from 'react';
import { configure, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
// import { MemoryRouter } from 'react-router-dom';
// import { createMount } from '@material-ui/core/test-utils';

import Accounts from './accounts';

configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

const clickSpy = sinon.spy();
const props = {
    data: {"accountList":[{"accountNumber":"423 4567 8901","active":true,"type":"Savings","newcase":"1234","exception":true},{"accountNumber":"123 4567 8901","active":true,"type":"Savings"}]},
    navigatePage: clickSpy,
};

//let materialMount = createMount();

const wrapper = mount(<Accounts.WrappedComponent classes = {{paper:"paper"}} {...props} />);

//const route = materialMount( <MemoryRouter><Accounts.WrappedComponent classes = {{paper:"paper"}} {...props} /></MemoryRouter>);

//console.log(route.debug())

describe('tests for <Accounts> container', () => {

  it('should cardsContent class exsist',()=>{
        expect(wrapper.exists('.cardsContent')).to.equal(true);
  });

  it('should contain the data passed as props', () => {
        expect(wrapper.props().data).to.not.equal("");
       
  });
});


