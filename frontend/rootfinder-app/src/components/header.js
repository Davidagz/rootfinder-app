import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import graph_image from './graph.svg'

function Header(){
    return (
        <div class="header">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <img 
                        alt=""
                        src={graph_image}
                        width="30"
                        height="30"
                        classname="d inline-block align-top"
                    /> {' '}
                    Rootfinder App 
                </Navbar.Brand>
            </Navbar>
        </div>
    )    
}

export default Header;