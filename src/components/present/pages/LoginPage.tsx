function LoginPage () {
  return (
        <div className="container login__container">
            <form className="login__form form">
                <label className="login__label" htmlFor="login">Login</label>
                <input placeholder="Enter login" className="form__input" id="login"></input>
                <label className="login__label" htmlFor="password">Password</label>
                <input placeholder="Enter password" className="form__input" id="password" type="password"></input>
                <button className="form__button">Login</button>
            </form>
        </div>
  )
}

export default LoginPage
