import React from 'react';
import './Header.css';

export const Header=(props)=>{
    return(
        <div className="container p-3 my-3 bg-info" id="header">
            <h3>{props.content}</h3>
        </div>
    )
}
