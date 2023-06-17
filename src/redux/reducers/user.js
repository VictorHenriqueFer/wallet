import { EMAIL_USER_SUBMIT } from '../actions';

const initialState = {

  email: '', // string que armazena o email da pessoa usuária

};

const user = (state = initialState, action) => {
  switch (action.type) {
  case EMAIL_USER_SUBMIT:
    return { ...state, email: action.email };
  default:
    return state;
  }
};
export default user;
