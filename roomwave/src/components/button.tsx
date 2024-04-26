import React, { Fragment, ReactNode, ReactElement } from 'react';
import { render } from 'react-dom';
import '../css/RoomDetails.css';


interface ButtonProps {
 as?: React.ElementType;
 children: ReactNode;
 filled?: boolean;
 secondary?: boolean;
 [key: string]: any; // This line is a bit broad and might not be necessary. Consider specifying more precise types if possible.
}

const Button: React.FC<ButtonProps> = ({ as: Component = 'button', children, filled, secondary, ...rest }) => {
 return (
    <Component className={`dir-control ${secondary ? 'dir-control--secondary' : ''} ${filled ? 'dir-control--filled' : ''}`} {...rest}>
      {children}
      <span />
      <span />
      <span />
      <span />
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
    </Component>
 );
}

Button.defaultProps = {
 as: 'button'
}

const ButtonComponent = () => (
 <Fragment>
    <Button role="button">Contactar!</Button>
 </Fragment>
);

export default ButtonComponent;
