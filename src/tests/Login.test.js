import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste o Login', () => {
  it('Verifique se existe o campo e-mail', () => {
    renderWithRouterAndRedux(<Login />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });
  it('Verifique se possui o botão Entrar', () => {
    renderWithRouterAndRedux(<Login />);
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });
  it('Verifique se existe o campo de senha', () => {
    renderWithRouterAndRedux(<Login />);
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });
  it('Verifique se é enviado a ação do savedEmail e feita e enviada para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(email, 'alguem@alguem.com');
    userEvent.type(password, '123456');
    userEvent.click(button);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
