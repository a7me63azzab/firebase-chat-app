import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {ListGroup,ListGroupItem} from 'react-bootstrap';

const Message =(props)=>{
        return(
            <ListGroup>
                <ListGroupItem >
                        {props.message}
                </ListGroupItem>
            </ListGroup>
        );
}
export default Message;