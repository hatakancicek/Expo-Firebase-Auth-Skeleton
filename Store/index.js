import { createStore } from 'redux';

let reducer = (state = {}, action)  => {
    switch (action.type) {
      case "SET": {
          if (!action.target) return state
          let newState = {...state}
          if (!newState.loaded) newState.loaded = {}
          newState[action.target] = action.data
          newState.loaded[action.target] = true
          return newState
      }  

      case "DEL": {
        let newState = {...state}
          if (!action.target) return state
          if (!newState.loaded) newState.loaded = {}
          delete newState[action.target]
          newState.loaded[action.target] = false
          return newState
      }

      case "CLEAR": {
          return {

          };
      }

      default: return state
    }
} 
    
const Store = createStore(reducer)

export default Store;