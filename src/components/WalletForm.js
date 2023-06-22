import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, addExpenses, editExpense,
  editToExpense } from '../redux/actions';

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

  componentDidUpdate(prevProps) {
    const { editor, expenses, idToEdit } = this.props;
    if (editor !== prevProps.editor) {
      if (editor) {
        const editedExpense = expenses.find((expense) => +expense.id === +idToEdit);
        console.log(editedExpense);

        if (editedExpense) {
          this.setState({
            value: editedExpense.value,
            description: editedExpense.description,
            currency: editedExpense.currency,
            method: editedExpense.method,
            tag: editedExpense.tag,
          });
        }
      } else {
        this.setState({
          value: '',
          description: '',
        });
      }
    }
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

    this.setState({ // limpar os inputs
      value: '',
      description: '',
    });
  };

  handleEditClick = (e) => {
    e.preventDefault();
    const { dispatch, idToEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
    };
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    dispatch(editExpense(false, idToEdit));
    dispatch(editToExpense(expense));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
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
              onClick={ editor ? this.handleEditClick : this.handleButtonClick }
            >
              {editor ? 'Editar despesa' : 'Adicionar despesas'}

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
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
