const EMAIL_USER_SUBMIT = 'EMAIL_USER_SUBMIT';
const WALLET_USER_SUBMIT = 'WALLET_USER_SUBMIT';
const EXPENSES_USER_SUBMIT = 'EXPENSES_USER_SUBMIT';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const EDIT_TO_EXPENSE = 'EDIT_TO_EXPENSE';

const saveUser = (email) => ({
  type: EMAIL_USER_SUBMIT,
  email,
});
const getCurrencies = (currencies) => ({
  type: WALLET_USER_SUBMIT,
  currencies,
});
const addExpenses = (expenses) => ({
  type: EXPENSES_USER_SUBMIT,
  payload: expenses,
});
const deleteExpense = (id) => ({
  type: 'DELETE_EXPENSE',
  id,
});
const editExpense = (editor, idToEdit) => ({
  type: 'EDIT_EXPENSE',
  editor,
  idToEdit,
});
const editToExpense = (expense) => ({
  type: 'EDIT_TO_EXPENSE',
  expense,
});
export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const arrayWallet = Object.keys(data)
    .filter((item) => item !== 'USDT');
  dispatch(getCurrencies(arrayWallet));
};

export { saveUser, getCurrencies, addExpenses, deleteExpense, editExpense,
  editToExpense,
  EXPENSES_USER_SUBMIT, EMAIL_USER_SUBMIT, WALLET_USER_SUBMIT,
  DELETE_EXPENSE, EDIT_EXPENSE, EDIT_TO_EXPENSE };
