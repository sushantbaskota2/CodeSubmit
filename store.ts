import {createStore, AnyAction} from 'redux';
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import {CLIENT_LOGIN, CLIENT_SIGNOUT} from './actions/types'
export interface State {
    server: any;
    client: any;
}

const reducer = (state: State = {server: {tick: 'init'}, client:{user:null}}, action: AnyAction) => {
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

// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, {debug: true});