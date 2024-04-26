/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions';
import group1 from '../images/Group1.png';
import bgfundo from '../images/fotofundo.png';

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
      <div
        className="flex block bg-cover h-screen w-full justify-center items-center"
        style={ { backgroundImage: `url(${bgfundo})` } }
      >

        <div
          className="w-full max-w-sm mx-auto overflow-hidden rounded-lg
       shadow-md bg-null"
        >
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src={ group1 } alt="" />
            </div>

            <h3
              className="mt-6 text-xl font-medium text-center
          text-gray-600 dark:text-gray-200"
            >
              Bem vindo
            </h3>

            <form>
              <div className="w-full mt-6">
                <input
                  data-testid="email-input"
                  type="email"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                  className="block w-full px-4 py-2 mt-2 text-gray-700
                placeholder-gray-500 bg-slate-300 border rounded-lg  focus:ring-opacity-40 focus:outline-none
                focus:ring focus:ring-blue-300"
                  placeholder="Email"
                  aria-label="D"
                />
              </div>

              <div className="w-full mt-6">
                <input
                  data-testid="password-input"
                  type="password"
                  name="password"
                  value={ password }
                  onChange={ this.handleChange }
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500
                  bg-slate-300 border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300
                focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Senha"
                  aria-label="Password"
                />
              </div>

              <div className="flex items-center justify-center mt-8">

                <button
                  onClick={ this.handleButtonClick }
                  disabled={ !(password.length > minSenha && isValidEmail) }
                  className="px-12 py-2 text-sm font-medium tracking-wide text-white
                capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg
                 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300
                 focus:ring-opacity-50"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>

        </div>
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
