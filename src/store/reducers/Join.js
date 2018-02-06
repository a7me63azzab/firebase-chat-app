import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";


const initialState={
    ownerId:null,
    ownerName:null,
    loading:false
};

const onJoinStart = (state,action)=>{
    return updateObject(state,{
        loading:true
    });
};

const onJoinFail = (state,action)=>{
    return updateObject(state,{
        loading:false
    });
};

const onJoinSuccess =(state,action)=>{
    return updateObject(state,{
        ownerId:action.userId,
        ownerName:action.ownerName,
        loading:false
    });
};

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ON_JOIN_START: return onJoinStart(state,action);
        case actionTypes.ON_JOIN_SUCCESS: return onJoinSuccess(state,action);
        case actionTypes.ON_JOIN_FAIL: return onJoinFail(state,action);
        default: return state;
    }
};

export default reducer;