import * as actionTypes from "../actions/actions";

const initialState ={
    jobs: [],
    loading:false,
    addSuc:false,
    user:"",
    };

    function historyListReducer(state = initialState, action) {

        switch (action.type) {
            case actionTypes.GET_CARDS:
                console.log("reducer fired");
                return{...state, user:action.data.user, loading:true}
            case actionTypes.GET_CARDS_SUCCESS:
                return{...state, jobs:action.data, loading:false }
            case actionTypes.ADD_CARD :
                console.log("reducer fired add new card");
                return {...state,user:action.data.user, addSuc: false}
            case actionTypes.ADD_CARD_SUCCESS :
                return {...state, addSuc: true}
            default:                
                return state            
        }
    }
    export default historyListReducer;
    