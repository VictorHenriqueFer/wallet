import { WALLET_USER_SUBMIT, EXPENSES_USER_SUBMIT } from '../actions';

const initialState = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

};

const wallet = (state = initialState, action) => {
  const lastExpense = state.expenses[state.expenses.length - 1]
    ? state.expenses[state.expenses.length - 1].id + 1 : 0;
  const expense = {
    id: lastExpense,
    ...action.payload,
  };
  switch (action.type) {
  case WALLET_USER_SUBMIT:
    return { ...state, currencies: action.currencies };
  case EXPENSES_USER_SUBMIT:
    return { ...state, expenses: [...state.expenses, expense] };
  default:
    return state;
  }
};

export default wallet;
