import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import group1 from '../images/Group1.png';
import icon1 from '../images/Vector.png';
import moedas from '../images/Moedas.png';

class Header extends Component {
  getTotalExpense = () => {
    const { expenses } = this.props;
    console.log(expenses);
    const ask = expenses.map((expense) => {
      const { exchangeRates, currency, value } = expense;
      return +exchangeRates[currency].ask * +value;
    });

    return ask.length > 0
      ? ask.reduce((acumulador, item) => acumulador + item).toFixed(2) : '0.00';
  };

  render() {
    const { email } = this.props;
    return (
      <section
        className="flex justify-between w-full mx-auto
      shadow-md p-8"
      >
        <div>
          <img className=" block w-auto h-7 sm:h-8" src={ group1 } alt="" />
        </div>
        <div className="flex " data-testid="total-field">
          <img className="mr-2 w-auto h-7 sm:h-8 " src={ moedas } alt="" />
          <h3 className="text-azul mr-1">Total de despesas:</h3>
          <h3 className="text-azul">
            {this.getTotalExpense()}
          </h3>
          <h3 className="text-azul ml-1">BRL</h3>
        </div>
        <div
          data-testid="email-field"
          className="flex block mr-2"
        >
          <img className="w-auto h-7 sm:h-8 mr-2" src={ icon1 } alt="" />
          {' '}
          {email}
        </div>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
export default connect(mapStateToProps)(Header);
