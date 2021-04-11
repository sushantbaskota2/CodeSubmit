import {createStore, AnyAction} from 'redux';
import {MakeStore, createWrapper, HYDRATE} from 'next-redux-wrapper';
import {CLIENT_LOGIN, CLIENT_SIGNOUT} from './actions/types'
export interface State {
    server: any;
    client: any;
}

const reducer = (state: State = {server: {tick: 'lamo'}, client:{user:null, isLoggedIn:null}}, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                server: {
                    ...state.server,
                    ...action.payload.server
                }
            }
        case 'SERVER_ACTION':
            return {
                ...state,
                server: {
                    ...state.server,
                    tick: action.payload
                }
            };
        case CLIENT_LOGIN:
            return {
                ...state,
                client: {
                    ...state.client,
                    user: action.payload,
                    isLoggedIn:true
                }
            };
        case CLIENT_SIGNOUT:
            return {
                ...state,
                client: {
                    ...state.client,
                    user:null,
                    isLoggedIn:false
                }
            }
        default:
            return state;
    }
};

// const composeEnhancers= composeWithDevTools({realtime:true});

// create a makeStore function
const makeStore: MakeStore<State> = () => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, {debug: true});