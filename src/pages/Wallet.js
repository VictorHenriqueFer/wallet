import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import bgfundo from '../images/fotofundo.png';

class Wallet extends React.Component {
  render() {
    return (
      <div
        className="bg-cover h-screen w-full"
        style={ { backgroundImage: `url(${bgfundo})` } }
      >
        <div className="mx-20 bg-white">
          <Header />
          <WalletForm />
        </div>
        <div className="">
          <Table />
        </div>
      </div>
    );
  }
}

export default connect()(Wallet);
