import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {connect} from "react-redux";
import * as actionCreators from "../store/actions/index";
import {withRouter} from "react-router-dom";
import topbar from "topbar";

class Join extends Component{
    state={
        name:''
    }
    // joinClickedHandler=(e)=>{
    //     topbar.show();
    //     e.preventDefault();
    //     let database = firebase.database();
    //     let key = database.ref('/users/').push().key;
    //     let userName=this.state.name;
    //     //let chatWith
    //     let user = userModel(key,userName,[]);
    //     database.ref('/users/'+ key).set(user);
    //     this.setState({
    //         name:''
    //     });
    //     topbar.hide();
    //     this.props.history.push('/chat');
    // }

    joinClickedHandler=(e)=>{
        e.preventDefault();
        topbar.show();
        var userName = this.state.name;
        this.props.onJoin(userName);
        this.setState({
                    name:''
             });
        if(!this.props.loading){
            topbar.hide();
            this.props.history.push('/chat');
          }
          
    };


    inputChangeHandler=(e)=>{
        var userName = e.target.value;
        this.setState({
            name:userName
        });
    }
    render(){
        return(
            <div style={{display: 'flex', justifyContent: 'center', marginTop:'50px'}}>
                <Form inline onSubmit={this.joinClickedHandler}>
                    <FormGroup controlId="formInlineName" >
                        <ControlLabel>UserName :</ControlLabel>{' '}
                        <FormControl 
                            type="text" 
                            value={this.state.name}
                            onChange={this.inputChangeHandler}
                            placeholder="Please enter your name" 
                        />
                    </FormGroup>{' '}
                    <Button type='submit'>JOIN</Button>
                </Form>
            </div>
        );
    }
};

const mapStateToProps = state =>{
    return{
        loading:state.Join.loading
    }
};
const mapDispatchToProps = dispatch =>{
    return{
        onJoin:(userName) => dispatch(actionCreators.onJoin(userName))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Join));