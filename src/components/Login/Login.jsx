import React from "react";
import { reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required
} from "../../utilities/validation/validation";
import { fieldValue } from "../../common/FormControl/FormControl";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/reduceAuth";
import { Redirect } from "react-router-dom";
import styles from "../../common/FormControl/FormControl.module.css";
import stylesLogin from "../../styles/Login.module.css";

const maxLength30 = maxLengthCreator(30);

const LoginForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {fieldValue([required, maxLength30], "email", "input", "Email")}
      </div>
      <div>
        {fieldValue(
          [required, maxLength30],
          "password",
          "input",
          "Password",
          "password"
        )}
      </div>
      <div>
        {fieldValue(null, "rememberMe", "input", null, "checkbox")} remember me
      </div>
      {props.error && <div className={styles.errorText}>{props.error}</div>}
      {props.captchaUrl && <img className={stylesLogin.captcha} src={props.captchaUrl} alt="captcha"/>}
      {props.captchaUrl && <div>{fieldValue(required, "captcha", "input")}</div> } 
      <div>
        <button>Sign in</button>
      </div>
    </form>
  );
};

const ReduxLoginForm = reduxForm({ form: "login" })(LoginForm);

const Login = props => {
  const onSubmit = formData => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
      <div>
        <div>Если не можете залогиниться, значит ваш браузер блокирует файлы cookie</div>
        <b>Тестовый аккаунт:</b>
        <div className={stylesLogin.tests}>
          <b>Email:</b> free@samuraijs.com
        </div>
        <div className={stylesLogin.tests}>
          <b>Password:</b> free
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
  };
};

export default connect(mapStateToProps, { login })(Login);
