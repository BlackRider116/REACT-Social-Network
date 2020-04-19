import React from "react";
import styles from "../../styles/Navbar.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { newMessagesCountThunk } from "../../redux/reducers/reduceDialogs";
import { GlobalStateType } from "../../redux/reduxStore";
import { MailOutlined } from '@ant-design/icons';

const Navbar = () => {
  const newMessagesCount = useSelector((state: GlobalStateType) => state.messagesPage.newMessagesCount)
  const dispatch = useDispatch()
  dispatch(newMessagesCountThunk());

  return (
    <nav className={styles.nav}>
      <div className={styles.item}>
        <NavLink to="/profile" activeClassName={styles.active}>
          Профиль
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/dialogs" activeClassName={styles.active}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Сообщения</span>
            {newMessagesCount > 0 && <div className={styles.item_NewMessage}>
              <span>
                <MailOutlined />
              </span>
              <b>{newMessagesCount}</b>
            </div>}
          </div>
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/users" activeClassName={styles.active}>
          Пользователи
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/news" activeClassName={styles.active}>
          Новости
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/music" activeClassName={styles.active}>
          Музыка
        </NavLink>
      </div>
      <div className={`${styles.item} ${styles.setting}`}>
        <NavLink to="/setting" activeClassName={styles.active}>
          Настройки
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar

