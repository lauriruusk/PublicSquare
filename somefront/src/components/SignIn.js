
const SignIn = (props) => {

    const handleLogin = (event) => {
        event.preventDefault();
        props.handler(event.target.email.value, event.target.pword.value)
    }
    return (
        <>
            <form onSubmit={handleLogin}>
                <input id="email" type="text" placeholder="email address" />
                <input id="pword" type="password" placeholder="password" />
                <input type="submit" value="Login"/> 
            </form>
        </>
    )

}

export default SignIn;