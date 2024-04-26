/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense, editToExpense } from '../redux/actions';

class Table extends Component {
  handleEditExpenses = (expense) => {
    const { dispatch } = this.props;
    console.log(expense);
    dispatch(editExpense(true, expense.id));
    dispatch(editToExpense(expense));
  };

  render() {
    const { expenses, dispatch } = this.props;
    return (
      <section className="container px-1 mx-auto">
        <div className="flex flex-col mt-4">
          <div className="">
            <div className="inline-block min-w-full py-2 align-middle md:px-2 lg:px-2">
              <div className="overflow-hidden md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                  <thead className=" ">
                    <tr className="divide-x divide-gray-200">
                      <th className="px-1 py-4 text-xs font-ligth ">Descrição</th>
                      <th className="px-1 py-4 text-xs font-ligth ">Tag</th>
                      <th className="px-1 py-4 text-xs font-ligth ">Método de pagamento</th>
                      <th className="px-1 py-4 text-xs font-ligth ">Valor</th>
                      <th className="px-1 py-4 text-xs font-ligth ">Moeda</th>
                      <th className="px-1 py-4 text-xs font-ligth ">Câmbio utilizado</th>
                      <th className="px-1 py-4 text-xs font-ligth ">Valor convertido</th>
                      <th className="px-1 py-4 text-xs font-ligth ">Moeda de conversão</th>
                      <th className="px-1 py-4 text-xs font-ligth ">Editar/Excluir</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {
                      expenses.map((expense) => (
                        <tr key={ expense.id }>
                          <td className="px-6 py-2 text-xs font-ligth whitespace-nowrap">{expense.description}</td>
                          <td className="px-6 py-2 text-xs font-ligth whitespace-nowrap">{expense.tag}</td>
                          <td className="px-6 py-2 text-xs font-ligth whitespace-nowrap">{expense.method}</td>
                          <td className="px-6 py-2 text-xs font-ligth whitespace-nowrap">
                            {(Number(expense.value).toFixed(2))}

                          </td>
                          <td className="px-6 py-2 text-xs font-ligth whitespace-nowrap">{expense.exchangeRates[expense.currency].name}</td>
                          <td className="px-6 py-2 text-xs font-ligth whitespace-nowrap">{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                          <td className="px-6 py-2 text-xs font-ligth whitespace-nowrap">
                            {(expense.value * expense.exchangeRates[expense.currency]
                              .ask).toFixed(2)}
                          </td>
                          <td className="px-6 py-2 text-xs font-ligth whitespace-nowrap">Real</td>
                          <td className="px-6 py-2 text-xs font-ligth whitespace-nowrap">
                            <button
                              data-testid="delete-btn"
                              onClick={ () => dispatch(deleteExpense(expense.id)) }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>

                            </button>
                            <button
                              className="px-2 py-2 text-gray-500 transition-colors duration-200 rounded-lgs"
                              data-testid="edit-btn"
                              onClick={ () => this.handleEditExpenses(expense) }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>

                            </button>

                          </td>

                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
