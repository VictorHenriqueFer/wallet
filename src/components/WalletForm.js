import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valor: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    category: 'Alimentação',

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
    );
  };

  handleButtonClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies(currencies));
  };

  render() {
    const { valor, description, currency, method, category } = this.state;
    const { currencies } = this.props;
    return (
      <section>
        <div>
          <form>
            <input
              data-testid="value-input"
              label="Valor: "
              type="number"
              value={ valor }
              name="valor"
              onChange={ this.handleChange }
            />
            <input
              data-testid="description-input"
              label="Descrição: "
              type="text"
              value={ description }
              name="description"
              onChange={ this.handleChange }
            />
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((walletCurrency) => (
                <option key={ walletCurrency }>{walletCurrency}</option>
              ))}
            </select>
            <select
              data-testid="method-input"
              value={ method }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartão de crédito">Cartão de crédito</option>
              <option value="cartão de débito">Cartão de débito</option>
            </select>
            <select
              data-testid="tag-input"
              value={ category }
            >
              <option value="alimentaçao">Alimentação</option>
              <option value="lazer ">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saúde">Saúde</option>
            </select>
            <button
              onClick={ this.handleButtonClick }
              data-testid="total-field"
            >
              Adicionar despesa

            </button>
          </form>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
