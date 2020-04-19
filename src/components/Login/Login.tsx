import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import {
  maxLengthCreator,
  required
} from "../../utilities/validation/validation";
import { fieldValue } from "../../common/FormControl/FormControl";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/reduceAuth";
import { Redirect } from "react-router-dom";
import { Card, Button, ListGroup } from "react-bootstrap";
import styles from "../../styles/Login.module.scss";
import { GlobalStateType } from "../../redux/reduxStore";

const maxLength30 = maxLengthCreator(30);

const LoginForm: React.FC<InjectedFormProps<FormDataType, OwnProps> & OwnProps> = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={styles.inputForm}>
        <div className={styles.inputForm_Inputs}>
          {fieldValue([required, maxLength30], "email", "input", "Email", undefined)}
        </div>

        <div className={styles.inputForm_Inputs}>
          {fieldValue(
            [required, maxLength30],
            "password",
            "input",
            "Password",
            "password"
          )}
        </div>

        <div className={styles.rememberMe}>
          {fieldValue([], "rememberMe", "input", undefined, "checkbox")}
          <span>Запомнить</span>
        </div>

        <div className={styles.captcha}>
          {props.captchaUrl && <img src={props.captchaUrl} alt="captcha" />}
          {props.captchaUrl && (
            <div className={styles.inputForm_Inputs}>
              {fieldValue(required, "captcha", "input", undefined, undefined)}
            </div>
          )}
        </div>

        {props.error && (
          <div className={styles.error}>
            <span>{props.error}</span>
          </div>
        )}
        <div>
          <Button variant="success" type="submit">
            Войти
          </Button>
        </div>
      </div>
    </form>
  );
};
type OwnProps = { captchaUrl: string | null }
const ReduxLoginForm = reduxForm<FormDataType, OwnProps>({ form: "login" })(LoginForm);

type PropsType = MapStateToPropsType & MapDispatchToPropsType
type FormDataType = { email: string, password: string, rememberMe: boolean, captcha: string }
const Login: React.FC<PropsType> = props => {
  const onSubmit = (formData: FormDataType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className={styles.login}>
      <Card style={{ width: "400px" }}>
        <Card.Header style={{ textAlign: "center" }}>
          <h3>Логинизация</h3>
        </Card.Header>
        <ListGroup>
          <ListGroup.Item>
            <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
          </ListGroup.Item>
          <ListGroup.Item>
            <h5 style={{ textAlign: "center" }}>
              Тестовый аккаунт для просмотра:
            </h5>
            <div>
              <b>Email:</b> <span>free@samuraijs.com</span>
            </div>
            <div>
              <b>Password:</b> <span>free</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5 style={{ textAlign: "center", color: "gold" }}>Примечание !</h5>
            <div style={{ textIndent: "25px" }}>
              Если не можете залогиниться, значит браузер блокирует файлы
              cookie. Посмотрите в настройках браузера или используйте другой
              браузер. Связано это с CORS, SameSite.
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

type MapStateToPropsType = {
  captchaUrl: string | null
  isAuth: boolean
}
const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => {
  return {
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
  };
};
type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalStateType>(mapStateToProps, { login })(Login);
