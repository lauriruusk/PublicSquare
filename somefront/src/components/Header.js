
import LoginForm from "./LoginForm";
import LoggedInForm from "./LoggedInForm";
import './Header.css'
const Header = (props) => {

    return (
        <>
            <header>
                <p>Log in to continue</p>
                {props.login ? <LoggedInForm /> : <LoginForm handler={props.handler} reghandler={props.rhandle} />}
            </header>
        </>
    )
}

export default Header;