
import LoginForm from "./LoginForm";
import LoggedInForm from "./LoggedInForm";
const Header = (props) => {

    return (
        <>
            <header>
                Header placeholder
                {props.login ? <LoggedInForm /> : <LoginForm handler={props.handler} />}
            </header>
        </>
    )
}

export default Header;