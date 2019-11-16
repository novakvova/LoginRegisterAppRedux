import ConfirmEmailService from './confirmEmailService';
import { push } from 'connected-react-router';

export const CONFIRMEMAIL_STARTED = "user/CONFIRMEMAIL_STARTED";
export const CONFIRMEMAIL_SUCCESS = "user/CONFIRMEMAIL_SUCCESS";
export const CONFIRMEMAIL_FAILED = "user/CONFIRMEMAIL_FAILED";

const initialState = {
    loading: false,
    success: false,
    failed: false,
    errors: {}
}

export const confirmEmailReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case CONFIRMEMAIL_STARTED: {
            console.log('-----Begin confirmEmail User--------');
            newState = {...state, loading: true};
            break;
        }
        case CONFIRMEMAIL_SUCCESS: {
            console.log('-----Success confirmEmail User--------');
            newState = {...state, loading: false};
            break;
        }
        case CONFIRMEMAIL_FAILED: {
            console.log('-----Filed confirmEmail User--------');
            newState = {
                ...state, 
                loading: false, 
                errors: action.servErrors
            };
            break;
        }
        default: {
            return state;
        }
    }
    return newState;
}

export const confirmEmailUser = (model) => {
    return (dispatch) => {
        dispatch({type: CONFIRMEMAIL_STARTED});
        ConfirmEmailService.confirmEmailUser(model)
            .then((response)=>
            {
                console.log('Server message', response.data);
                dispatch({type: CONFIRMEMAIL_SUCCESS});
                dispatch(push('/'));
            }, err => {
                dispatch({type: CONFIRMEMAIL_FAILED, servErrors: err.response.data});
                console.log('Server problen in controler message', err.response.data);
            })
            .catch(err=> {
                console.log('Global Server problen in controler message', err);
            });
        // setTimeout(()=> {
        //     dispatch({type: CONFIRMEMAIL_SUCCESS});
        // }, 2000);
    };
}