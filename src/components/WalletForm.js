/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
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
      <section
        className="w-full px-10 bg-null"
      >
        <div className=" flex items-center justify-center ">
          <form>
            <div className="flex">
              <div className="flex w-full mt-6">
                <label
                  htmlFor="description"
                  className="whitespace-nowrap text-azul mt-1 mr-1"
                >
                  Descrição da despesa:
                </label>
                <input
                  className="block w-30 px-2 py-1 text-azul
               placeholder-gray-500 bg-white border border-azul rounded-lg text-azul"
                  data-testid="description-input"
                  label="Descrição: "
                  type="text"
                  value={ description }
                  name="description"
                  onChange={ this.handleChange }
                />
              </div>
              <div className="flex">
                <label
                  htmlFor="tag"
                  className="whitespace-nowrap ml-10 mt-7 text-azul"
                >
                  Categoria da despesa
                </label>
                <select
                  className="px-1 py-1 text-azul ml-2 mt-6 bg-white border rounded-lg
                  border-azul"
                  data-testid="tag-input"
                  value={ tag }
                  name="tag"
                  onChange={ this.handleChange }
                >
                  <option className="text-azul">Alimentação</option>
                  <option className="text-azul">Lazer</option>
                  <option className="text-azul">Trabalho</option>
                  <option className="text-azul">Transporte</option>
                  <option className="text-azul">Saúde</option>
                </select>
              </div>
            </div>
            <div className="flex">

              <div className="flex w-full mt-6">
                <label
                  htmlFor="value"
                  className="whitespace-nowrap mt-1 mr-2 text-azul"
                >
                  Valor:
                </label>
                <input
                  className="block w-24 px-2 py-1
              placeholder-gray-500 bg-white border rounded-lg text-azul border-azul"
                  data-testid="value-input"
                  label="Valor: "
                  type="number"
                  value={ value }
                  name="value"
                  onChange={ this.handleChange }
                />
              </div>

              <div className="flex mr-8">
                <label
                  htmlFor="method"
                  className="whitespace-nowrap mt-7 text-azul"
                >
                  Método de pagamento
                </label>
                <select
                  className="px-1 py-1  ml-2 mt-6 bg-white border rounded-lg
                   border-azul text-azul"
                  data-testid="method-input"
                  value={ method }
                  name="method"
                  onChange={ this.handleChange }
                >
                  <option>Dinheiro</option>
                  <option>Cartão de crédito</option>
                  <option>Cartão de débito</option>
                </select>
              </div>
              <div className="flex">
                <label
                  htmlFor="currency"
                  className="whitespace-nowrap ml-10 mt-7 text-azul"
                >
                  Moeda:
                </label>
                <select
                  className="px-1 py-1 ml-2 mt-6 bg-white border rounded-lg
                  border-azul text-azul"
                  data-testid="currency-input"
                  name="currency"
                  value={ currency }
                  onChange={ this.handleChange }
                >
                  {currencies.map((walletCurrency) => (
                    <option key={ walletCurrency }>{walletCurrency}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8">

              <button
                className="px-12 py-2 mb-6 text-sm font-medium tracking-wide text-white
            capitalize transition-colors duration-300 transform bg-verde rounded-lg
             hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300
             focus:ring-opacity-50"
                onClick={ editor ? this.handleEditClick : this.handleButtonClick }
              >
                {editor ? 'Editar despesa' : 'Adicionar despesas'}

              </button>
            </div>
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
