import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const LoginForm = (props) => {
    const [login, setLogin] = useState(true)
    return (
        <div className="reglog">
            {login ? <SignIn handler={props.handler} /> : <SignUp handler={props.reghandler} />}
            <label for="reg">Register</label>
            <input type="checkbox" id="reg" onClick={() => setLogin(current => !current)} />
        </div>
    )
}

export default LoginForm;