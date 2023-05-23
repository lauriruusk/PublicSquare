import { useState, useEffect } from 'react';
// import axios from 'axios';
import './App.css';
import Header from './components/Header';
import PublicSquare from './components/PublicSquare';
import Footer from './components/Footer';
import {logUser, logAdmin, regUser} from './services/loginService.js'

const App = () => {
  const [login, setLogin] = useState(false);
  const [pubs, setPubs] = useState([]);
  // useEffect = (() => {
  //   axios.get('http://localhost:3001/').then(response => setPubs(response.data));
  // }, []);

  const handleLogin = async (email, password) => {
    // event.preventDefault();
    try {
      const kaytt = {
        username: email,
        token: '',
      };
      if(email === 'admin') {
        kaytt.token = await logAdmin({email: email, password: password});
      } else {
        kaytt.token = await logUser({email: email, password: password});
      }
      
      window.localStorage.setItem('loggeduser', JSON.stringify(kaytt));
      setLogin(true);
    } catch (e) {
      console.log(e.message);
    }

    
  }

  const handleRegister = async (email, password) => {
    try {
      const kytt = {
        email: email,
        token: ''
      }
      kytt.token = await regUser({email: email, password: password});
      window.localStorage.setItem('loggeduser', JSON.stringify(kytt));

    } catch (e) {
      console.log(e.message);
    }
  }


  return (
    <div>
      <Header login={login} handler={handleLogin} rhandle={handleRegister} />
      {login && <PublicSquare content={pubs} />}
      <Footer />
    </div>
  )
}

export default App;
