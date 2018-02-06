import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Navbar,Nav ,NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'

const header =(props)=>{
    return(
        <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Firebase-Chat</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem>
                        <Link to="/join">Join</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/chat">Chat</Link>
                    </NavItem>
                </Nav>
            </Navbar>
    );
};
export default header;