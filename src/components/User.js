import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {ListGroup,ListGroupItem} from 'react-bootstrap';

const User =(props)=>{
        return(
            <ListGroup>
                <ListGroupItem onClick={props.clicked} >{props.userName}</ListGroupItem>
            </ListGroup>
        );
}
export default User;