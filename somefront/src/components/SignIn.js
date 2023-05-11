
const SignIn = (props) => {

    const handleLogin = (event) => {
        event.preventDefault();
        props.handler(event.target.uname.value, event.target.pword.value)
    }
    return (
        <>
            <form onSubmit={handleLogin}>
                <input id="uname" type="text" placeholder="username" />
                <input id="pword" type="password" placeholder="password" />
                <input type="submit" value="Login"/> 
            </form>
        </>
    )

}

export default SignIn;