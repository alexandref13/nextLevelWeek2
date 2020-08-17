import React, { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/images/logo.svg'
import heart from '../../assets/images/icons/purple-heart.svg'

import './styles.css';

const Login: React.FC = () => {

const history = useHistory()

function handleNavigateTolandingPage(e:FormEvent) {
  e.preventDefault()

  history.push('/landing')
}

  return (
    <div id='container'>
      <div className='introdution'>
        <div className="logo">
          <img src={logo} alt='logo'/>
          <p>Sua plaforma de estudos online.</p>
        </div>
      </div>
      <div className='login-container'>
        <div className="login">
          <h1>Fazer login</h1>
          <main>
            <form onSubmit={handleNavigateTolandingPage}>
              <div className='input-group'>
                <input type='text' placeholder='E-mail' name='email' /> 
                <input type='text' placeholder='Senha' name='senha' /> 
              </div>
              <div className="forgot-password">
                <p>Lembrar-me</p>
                <a href='#'>Esqueci minha senha</a>
              </div>

              <button type="submit">Entrar</button>
            </form>
          </main>
          <footer>
              <div className="cadastro-container">
                <p className='first-text'>
                  Não tem conta? 
                  <a href='#'>Cadastre-se</a>
                </p>

                <p>
                  É de graça 
                  <img src={heart} alt='Purple Heart' />
                </p>

              </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login; 