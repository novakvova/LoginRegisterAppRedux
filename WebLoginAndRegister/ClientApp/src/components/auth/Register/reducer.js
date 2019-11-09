import registerService from './registerService';

export const REGISTER_STARTED = "user/REGISTER_STARTED";
export const REGISTER_SUCCESS = "user/REGISTER_SUCCESS";
export const REGISTER_FAILED = "user/REGISTER_FAILED";

const initialState = {
    loading: false,
    success: false,
    failed: false,
    errors: {}
}

export const registerReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case REGISTER_STARTED: {
            console.log('-----Begin register User--------');
            newState = {...state, loading: true};
            break;
        }
        case REGISTER_SUCCESS: {
            console.log('-----Success register User--------');
            newState = {...state, loading: false};
            break;
        }
        default: {
            return state;
        }
    }
    return newState;
}

export const registerUser = (model) => {
    return (dispatch) => {
        dispatch({type: REGISTER_STARTED});
        registerService.registerUser(model)
            .then((response)=>
            {
                console.log('Server message', response.data);
                dispatch({type: REGISTER_SUCCESS});
            }, err => {
                console.log('Server problen in controler message', err);
            })
            .catch(err=> {
                console.log('Global Server problen in controler message', err);
            });
        // setTimeout(()=> {
        //     dispatch({type: REGISTER_SUCCESS});
        // }, 2000);
    };
}