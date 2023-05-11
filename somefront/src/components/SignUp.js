
const SignUp = (props) => {

    const handleRegister = (event) => {
        event.preventDefault();
        // console.log(event.target.uname.value, event.target.pword.value);
        props.handler(event.target.uname.value, event.target.pword.value)
    }
    return (
        <>
            <form onSubmit={handleRegister}>
                <input id="uname" type="text" placeholder="username" />
                <input id="pword" type="password" placeholder="password" />
                <input type="submit" value="Register"/> 
            </form>
        </>
    )

}

export default SignUp;