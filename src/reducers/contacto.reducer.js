import { contactoConstants } from '../constants';
export function contactos(state = {}, action) {
  switch (action.type) {
    case contactoConstants.OBTIENETODOS_REQUEST:
      return {
        loading: true
      };
    case contactoConstants.OBTIENETODOS_SUCCESS:
      return {
        ...state,
        items: action.result
        
      };
    case contactoConstants.OBTIENETODOS_FAILURE:
      return { 
        error: action.error
      };
    case contactoConstants.ELIMINA_REQUEST:
        return { };
    case contactoConstants.ELIMINA_SUCCESS:
        return {
          ...state,
         elimina :action.resultdelete
         
        }
    case contactoConstants.ELIMINA_FAILURE:
        return {
          error: action.error
      }
    case contactoConstants.AGREGA_REQUEST:
        return { };
    case contactoConstants.AGREGA_SUCCESS:
          return {
           
           agrega :action.resultadd
          };
    case contactoConstants.AGREGA_FAILURE:
            return {
              error: action.error
          }
    case contactoConstants.GETID_SUCCESS:
        return {
           
        itemContacto: action.itemContacto
  
        }
    case contactoConstants.GETID_FAILURE:
         return {
              error: action.error
         } 
    case contactoConstants.EDITA_SUCCESS:
          return {
             
            resultedit: action.resultedit
    
          }
      case contactoConstants.EDITA_FAILURE:
           return {
                error: action.error
           }      
    default:
      return state
  }
}