const EMAIL_USER_SUBMIT = 'EMAIL_USER_SUBMIT';
const WALLET_USER_SUBMIT = 'WALLET_USER_SUBMIT';

const saveUser = (email) => ({
  type: EMAIL_USER_SUBMIT,
  email,
});
const getCurrencies = (currencies) => ({
  type: WALLET_USER_SUBMIT,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const arrayWallet = Object.keys(data)
    .filter((item) => item !== 'USDT');
  dispatch(getCurrencies(arrayWallet));
};

export { saveUser, getCurrencies, EMAIL_USER_SUBMIT, WALLET_USER_SUBMIT };
