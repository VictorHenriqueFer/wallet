// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_USER_SUBMIT } from '../actions';

const initialState = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

};

const despesasWallet = (state = initialState, action) => {
  switch (action.type) {
  case WALLET_USER_SUBMIT:
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
};

export default despesasWallet;
