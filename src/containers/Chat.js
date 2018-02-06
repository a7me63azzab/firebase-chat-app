import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Grid,Col,Row} from 'react-bootstrap';
import MessageBox from "../components/MessageBox";
import Message from "../components/Message";
import User from "../components/User";
import {connect} from "react-redux";
import firebase from "../js/firebase";
import uuidv4 from "uuid/v4";
import _ from "lodash";
import messageModel from "../js/models/message";
import userModel from "../js/models/user";
import 'antd/dist/antd.css';
import { Button, notification } from 'antd';
import notificationModel from "../js/models/notification";


var database= firebase.database();

class Chat extends Component{

    state={
        users:[],
        messages:[],
        chatId:null,
        notificationId:null
    };


    
    componentWillMount(){

        database.ref('/users').on('value',(snapshot)=>{
            if(snapshot.val() !== null){
                this.getAllUsers(snapshot.val());
            }
        });



        //list all messages added in the current chat id
        if(this.state.chatId !==null){
            let app = database.ref(`${this.state.chatId}`);
            app.on('value', snapshot => {
                if(snapshot.val() !== null){
                    this.getAllData(snapshot.val());
                }
            
            });
        }

        // listen to all changes in notifications model
        database.ref('/notifications').on('value',(snapshot)=>{
            if(snapshot.val() !== null){
                this.getAllNotifications(snapshot.val());
            }
        });


    }

    otherIdExits=(otherId)=>{
         // check if the user chat with this other user or not 
        //  var chatWithList;
         let exist = false;
         database.ref(`/users/${this.props.ownerId}/chatWith/`).on('value',(snapshot)=>{
             if(snapshot.val() !== null){
                // chatWithList = snapshot.val();
                let otherIdIndex = snapshot.val().findIndex(item => item.otherId === otherId);
                if(otherIdIndex !== -1){
                        exist = true;
                    }
             }
             console.log('chatWith:',snapshot.val());
         });

         return exist;
         
    };

    getAllNotifications(values){
        let notificationsVal = values;
        let notifications = _(notificationsVal)
        .keys()
        .map(notificationKey=>{
            let notification = _.clone(notificationsVal[notificationKey]);
            return notification;
        }).value();
        let indexNotify = notifications.findIndex(notification=>this.props.ownerId === notification.otherId);
        if(indexNotify !== -1){
            let notificationId = notifications[indexNotify].id;
            let senderId = notifications[indexNotify].ownerId;
            //get sender name 
            let senderIndex = this.state.users.findIndex(user=> senderId === user.id );
            let senderName = this.state.users[senderIndex].name;
            let chatNotifyId = notifications[indexNotify].chatId;
            this.openNotification(notificationId,senderId,senderName,chatNotifyId);
        }

    }

     close = () => {
        console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
      };
      
     openNotification = (notificationId,senderId,senderName,chatNotifyId) => {
         let user={
             id:senderId,
             name:senderName
         };
        const key = `open${Date.now()}`;
        const btn = (
          <Button type="primary" size="small" onClick={this.openChat(user)}>
            Open Chat
          </Button>
        );
        notification.open({
          message: `New Message`,
          description: `${senderName} send a message to you`,
          btn,
          key,
          onClose: this.close(),
        });
      };

    openChat=(user)=>{
        this.userClickedHandler(user)
    }

    getAllData(values){
        let messagesVal = values;
        let messages = _(messagesVal)
                          .keys()
                          .map(messageKey => {
                              let cloned = _.clone(messagesVal[messageKey]);
                              cloned.key = messageKey;
                              return cloned;
                          })
                          .value();
          this.setState({
            messages: messages
          });
      }

      getAllUsers(values){
          let usersVal = values;
          let users = _(usersVal)
          .keys()
          .map(userKey => {
              let clonedUser = _.clone(usersVal[userKey]);
              return clonedUser; 
          }).value();
          console.log('users:=>',users);
          this.setState({
              users:users
          });

      }



    userClickedHandler=(user)=>{
        this.setState({
            messages:[]
        });
        //get owner user id
        let ownerId = this.props.ownerId;

        //get owner user name
        let ownerName = this.props.ownerName;

        //get other user id 
        let otherId = user.id;

        // check if the user chat with this other user before or not 
        if(!this.otherIdExits(otherId)) {
                var chatId = database.ref('/').push().key;
                var notificationId = database.ref('/notifications/').push().key;

                //get all chatWith users
                let chatWith; 
                database.ref(`/users/${this.props.ownerId}/chatWith/`).on('value',(snapshot)=>{
                    chatWith = snapshot.val();
                });
                    
                //update owner user by adding users he talking with them
                let nowChatWith={
                    otherId:otherId,
                    chatId:chatId
                };

                if(chatWith!==null){
                    chatWith.push(nowChatWith);
                }else{
                    chatWith=[nowChatWith];
                }
                
                //update owner user by adding users he talking with them
                let ownerUser = userModel(ownerId,ownerName,chatWith);
                database.ref('/users/' + ownerId).set(ownerUser).then(()=>{
                    console.log('owner user updated successfully');
                }).catch((err)=>{
                    console.log('user updated failed',err);
                });

                //update other user by adding users want to talk with him
                //get all otherChatWith users
                let otherChatWith; 
                database.ref(`/users/${user.id}/chatWith/`).on('value',(snapshot)=>{
                    otherChatWith = snapshot.val();
                });
                    
                //update owner user by adding users he talking with them
                let userNeedToChat={
                    otherId:ownerId,
                    chatId:chatId
                };

                if(otherChatWith!==null){
                    otherChatWith.push(userNeedToChat);
                }else{
                    otherChatWith=[userNeedToChat];
                }
                let otherUser = userModel(user.id,user.name,otherChatWith);
                database.ref('/users/' + user.id).set(otherUser).then(()=>{
                    console.log('owner user updated successfully');
                }).catch((err)=>{
                    console.log('user updated failed',err);
                });

                
                //add notification into the queue waiting for other user to response 
                var notification = notificationModel(notificationId,ownerId,otherId,chatId);
                database.ref('/notifications/'+notificationId).set(notification).then(()=>{
                    console.log('success');
                }).catch((err)=>{
                    console.log('conversation error :',err);
                });

                //send welcome message to other user
                let message = messageModel(`Hello, ${user.name}`);
                database.ref(`/${chatId}`).push(message).then(()=>{
                    console.log('message sent');
                }).catch((err)=>{
                    console.log('message failed',err);
                });



                let app = database.ref(`${chatId}`);
                app.on('value', snapshot => {
                    if(snapshot.val() !== null){
                        this.getAllData(snapshot.val());
                    }
                
                });

                this.setState({
                        chatId:chatId,
                        notificationId:notificationId
                    });
   
        }else{
            //when select a user he chat with him before

            //get the id of the chat created between them before
            let chatIdBetweenUs;
            database.ref(`/users/${this.props.ownerId}/chatWith/`).on('value',(snapshot)=>{
                let otherIdIndex = snapshot.val().findIndex(item => item.otherId === otherId);
                chatIdBetweenUs = snapshot.val()[otherIdIndex].chatId;
            });

            // list all messages between us
            let app = database.ref(`${chatIdBetweenUs}`);
            app.on('value', snapshot => {
                if(snapshot.val() !== null){
                    this.getAllData(snapshot.val());
                }
            });
            this.setState({
                chatId:chatIdBetweenUs
            });

            console.log('>>>>>');
        }
            
       
        
        
    };

    

    sendClickedHandler = ()=>{
        let app = database.ref(`${this.state.chatId}`);
            app.on('value', snapshot => {
                if(snapshot.val() !== null){
                    this.getAllData(snapshot.val());
                }
            
            });
    };



    render(){
        let messageNodes = this.state.messages.map((message) => {
            return (
                <Message key={uuidv4()} message={message.message}/>
            )
          });
    
          let allUsersWithoutCurrentUser = _.filter(this.state.users,(user)=> { return (user.id !== this.props.ownerId)});
          console.log('allUsersWithoutCurrentUser:',allUsersWithoutCurrentUser);
          let usersList = allUsersWithoutCurrentUser.map(user => {
              return(
                <User userName={user.name} key={user.id} clicked={()=>this.userClickedHandler(user)}/>
              );
          });
        return(
            <Grid style={{marginTop:'50px'}}>
                <Row className="show-grid" >
                    <Col sm={6} md={2} style={{borderRightStyle:'solid', borderRightColor:'#80d7ff',borderRightWidth:'3px'}}>
                        {usersList}
                    </Col>
                    <Col xs={6} md={4}>
                        {messageNodes}
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} xsOffset={2}>
                        <MessageBox db={database} chatId={this.state.chatId} sendClicked={this.sendClickedHandler}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
};

const mapStateToProps = state =>{
    console.log(state);
    return{
        ownerId:state.Join.ownerId,
        ownerName:state.Join.ownerName
    };
};
export default connect(mapStateToProps)(Chat);