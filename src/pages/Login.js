import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValidEmail: false,

  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      this.setState((prevState) => ({
        isValidEmail: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(prevState.email),
      })),
    );
  };

  handleButtonClick = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(saveUser(email));
    history.push('/carteira');
  };

  render() {
    const minSenha = 5;
    const { email, password, isValidEmail } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            onClick={ this.handleButtonClick }
            disabled={ !(password.length > minSenha && isValidEmail) }
          >
            Entrar

          </button>

        </form>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
