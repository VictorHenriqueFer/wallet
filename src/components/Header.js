import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  getTotalExpense = () => {
    const { expenses } = this.props;
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
      <section>
        <div data-testid="email-field">
          Email:
          {' '}
          {email}
        </div>
        <div data-testid="total-field">
          {this.getTotalExpense()}
        </div>
        <div data-testid="header-currency-field">
          Cambio:
          {' '}
          BRL
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
