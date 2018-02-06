import * as actionTypes from "./actionTypes";
import firebase from "../../js/firebase";
import userModel from "../../js/models/user";

export const onJoinStart = ()=>{
    return {
        type: actionTypes.ON_JOIN_START
    }
};

export const onJoinFail = ()=>{
    return {
        type : actionTypes.ON_JOIN_FAIL
    }
};

export const onJoinSuccess = (key,userName)=>{
    return {
        type : actionTypes.ON_JOIN_SUCCESS,
        userId:key,
        ownerName:userName
    }
};

export const onJoin =(userName)=>{
    return dispatch=>{
        dispatch(onJoinStart());
        let database = firebase.database();
        let key = database.ref('/users/').push().key;
        //let chatWith
        let user = userModel(key,userName,[]);
        database.ref('/users/'+ key).set(user).then(()=>{
            dispatch(onJoinSuccess(key,userName));
            console.log('success');
        }).catch((err)=>{
            dispatch(onJoinFail());
            console.log(err);
        });
    }
}; 