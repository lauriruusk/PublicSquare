
const SignUp = (props) => {

    const handleRegister = (event) => {
        event.preventDefault();
        props.handler(event.target.email.value, event.target.pword.value)
    }
    return (
        <>
            <form onSubmit={handleRegister}>
                <input id="email" type="text" placeholder="username" />
                <input id="pword" type="password" placeholder="password" />
                <input type="submit" value="Register"/> 
            </form>
        </>
    )

}

export default SignUp;