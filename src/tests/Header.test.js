import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Header from '../components/Header';

describe('Teste o componente Header', () => {
  it('Renderize todos os campos com as instruções corretas', () => {
    const expenses = [
      {
        id: 0,
        value: '30',
        description: 'Dolar',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Comida',
        exchangeRates: {
          USD: {
            name: 'Dolar',
            ask: '4.7912',
          },
        },
      },
    ];
    const mockData = {
      getState: () => ({
        user: {
          email: 'alguem@alguem.com',
        },
        wallet: {
          expenses,
        },

      }),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    };
    render(
      <Provider store={ mockData }>
        <Header />
      </Provider>,
    );
    const field = screen.getByTestId('total-field');
    expect(field).toHaveTextContent(143.74);
  });
});
