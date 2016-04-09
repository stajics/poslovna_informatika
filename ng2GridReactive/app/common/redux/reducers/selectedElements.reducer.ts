
import {Reducer, Action} from '@ngrx/store';

export const selectedElements: Reducer<any> = (state: any = {}, action: Action) => {

  switch (action.type) {
    case 'SELECT_ELEMENT':
      var element = new Object();
      element[action.payload.owner] = action.payload.data;
      return Object.assign({}, state, element);

    case 'CLEAR_SELECTION':
      var element = new Object();
      if(action.payload === undefined){
        return Object.assign({});
      }else{
        element[action.payload.owner] = {};
      }
      return Object.assign({}, state, element);

    case 'SET_CHILD_VALUE':
      var valueFromModal = new Object();
      var editedElement = new Object();
      valueFromModal[action.payload.childKey] = action.payload.data;
      editedElement[action.payload.owner] = Object.assign({},state[action.payload.owner],valueFromModal);
      console.log(Object.assign({}, state, editedElement))
      return Object.assign({}, state, editedElement);

    default:
      return state;
  }
}
