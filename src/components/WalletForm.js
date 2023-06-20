import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, addExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',

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

  currenciesAPI = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  };

  handleButtonClick = async (e) => {
    e.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await this.currenciesAPI(),

    };

    dispatch(addExpenses(expense));

    // dispatch(currenciesAPI());
    // puxar a api com a cotação atual, verificar se precisa passar o estado de parametro
    // salvar as informações no estado

    this.setState({ // limpar os inputs
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <section>
        <div>
          <form>
            <input
              data-testid="value-input"
              label="Valor: "
              type="number"
              value={ value }
              name="value"
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
              name="method"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
            <select
              data-testid="tag-input"
              value={ tag }
              name="tag"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
            <button
              onClick={ this.handleButtonClick }
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
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
