const EMAIL_USER_SUBMIT = 'EMAIL_USER_SUBMIT';
const saveUser = (email) => ({
  type: EMAIL_USER_SUBMIT,
  email,
});

export { saveUser, EMAIL_USER_SUBMIT };
