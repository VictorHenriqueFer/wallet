import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const {
      email,
    } = this.props;
    return (
      <section>
        <div data-testid="email-field">
          Email:
          {' '}
          {email}
        </div>
        <div data-testid="total-field">
          Despesas total:
          {' '}
          0
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
  ...state.user,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Header);
