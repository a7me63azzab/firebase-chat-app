import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import messageModel from "../js/models/message";
import topbar from "topbar";
// import _ from "lodash";
import {Button, Form, FormGroup, FormControl} from 'react-bootstrap';

class MessageBox extends Component{
    state={
        message:''
    };

    sendClickedHandler=(e)=>{
        e.preventDefault();
        topbar.show();
        // let messageId = this.props.db.ref(`/${this.props.chatId}/`).push().key;
        let message = messageModel(this.state.message);
        this.props.db.ref(`/${this.props.chatId}`).push(message).then(()=>{
            topbar.hide();
            console.log('message sent');
        }).catch((err)=>{
            topbar.hide();
            console.log('message failed',err);
        });
        this.setState({
            message:''
        });
    };

    inputChangeHandler=(e)=>{
        let message = e.target.value;
        if (message.trim() !== ''){
            this.setState({
                message:message
            });
        }
    };


    render(){
        return(
            <Form inline onSubmit={this.sendClickedHandler}>
                <FormGroup controlId="formInlineName">
                    <FormControl 
                        type="text" 
                        placeholder="message"
                        value={this.state.message}
                        onChange={this.inputChangeHandler}
                        />
                </FormGroup>{' '}
                <Button type="submit" onClick={this.props.sendClicked}>SEND</Button>
            </Form>
        );
    }
}
export default MessageBox;