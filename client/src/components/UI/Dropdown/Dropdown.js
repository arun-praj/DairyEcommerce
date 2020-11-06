import React from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";

export const Dropdown = (props) => {
   return (
      <div>
         <div className='dropdown'>
            <Link className='dropdown__button' to={props.to}>
               {props.button}
            </Link>
            <div className='dropdown__box'>
               <div className='dropdown__box__container'>{props.children}</div>
            </div>
         </div>
      </div>
   );
};

export const Dropgroup = (props) => {
   return <div className='dropdown__group'>{props.children}</div>;
};
export const DropLink = (props) => {
   return (
      <Link style={props.style} className='dropdown__link' to={props.to} onClick={props.onClick}>
         {props.value}
      </Link>
   );
};
