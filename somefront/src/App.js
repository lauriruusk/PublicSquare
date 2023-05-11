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

  const handleLogin = async (username, password) => {
    // event.preventDefault();
    try {
      const kaytt = {
        username: username,
        token: '',
      };
      if(username === 'adname') {
        kaytt.token = await logAdmin({username: username, password: password});
      } else {
        kaytt.token = await logUser({username: username, password: password});
      }
      
      window.localStorage.setItem('loggeduser', JSON.stringify(kaytt));
      setLogin(true);
    } catch (e) {
      console.log(e.message);
    }

    
  }

  const handleRegister = async (userid, password) => {
    try {
      const kytt = {
        userid: userid,
        token: ''
      }
      kytt.token = await regUser({userid: userid, password: password});
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
