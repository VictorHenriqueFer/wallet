import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  render() {
    const minSenha = 6;
    const { history, dispatch } = this.props;
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
            onClick={ () => dispatch(() => history.push('/carteira')) }
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
  history: PropTypes.shape(),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
