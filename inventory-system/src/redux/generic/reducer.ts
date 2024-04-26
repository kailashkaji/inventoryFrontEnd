import { actionTypes } from "./constant"

const initialState = {
  text:  "",
  }
  
export const helloworldReducer = (state=initialState, action : {type:  string; data?: string}) =>{
  const updateState = Object.assign({}, state);  
  switch(action.type){
        case actionTypes.RECEIVE_HELLO_WORLD:
            return {
              ...state,
                text: action.data
            }
            default:
              return updateState;
    }
};

export default helloworldReducer;