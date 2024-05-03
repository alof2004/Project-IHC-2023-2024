import React from 'react';
import '../css/Ajuda.css';
import { Nav } from 'react-bootstrap';
import NavBar from './NavBar';
import NavBarClient from './NavBarClient';

const ShoppingHelp = () => {
  const accordionItems = ['Your Account', 'Payment & Pricing', 'Returns & Refunds', 'Shipping & Pickup', 'Viewing & Changing Orders'];

  return (
    <>
      <NavBarClient /> {/* Adicionando margem inferior */}
      <div className="help-wrapper">
        <h1 className="main-title">Ajuda</h1>
        {accordionItems.map((val, key) => (
          <React.Fragment key={key}>
            <input type="radio" id={`radio${val}`} name="accordion" defaultChecked={key === 0} style={{ display: 'none' }} />
            <label className="item" htmlFor={`radio${val}`}>
              <div className="title">{val}</div>
              <div className="content">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis aliquid harum velit sed similique exercitationem, quasi in, nulla quos accusamus nemo vel dolores. Est id sint dolore, deserunt dolorum accusantium.
              </div>
            </label>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ShoppingHelp;
