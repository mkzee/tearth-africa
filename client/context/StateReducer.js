import { reducerCases } from "./constants";

export const initialState = {
    showLoginModal: false,
    showSignUpModal: true,
    userInfo: undefined
} 

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                showLoginModal: action.showLoginModal,
            };
        case reducerCases.TOGGLE_SIGNUP_MODAL:
            return {
                ...state,
                showSignUpModal: action.showSignUpModal
            };
        case reducerCases.CLOSE_AUTH_MODAL:
            return {
                ...state,
                showLoginModal: false,
                showSignUpModal: false
            }
        case reducerCases.SET_USER: 
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
            return state;
    }
}

export default reducer