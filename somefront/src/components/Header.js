
import LoginForm from "./LoginForm";
import LoggedInForm from "./LoggedInForm";
import './Header.css'
const Header = (props) => {

    return (
        <>
            <header>
                Header placeholder
                {props.login ? <LoggedInForm /> : <LoginForm handler={props.handler} reghandler={props.rhandle} />}
            </header>
        </>
    )
}

export default Header;