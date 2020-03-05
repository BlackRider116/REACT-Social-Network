import React from "react";
import Preloader from "../../../common/Preloader/Preloader";
import Pagination from "../../../common/Pagination/Pagination";
import UserPage from "./UserPage";

const Users = props => {
  // debugger
  return (
    <div>
      <Pagination
        totalItemsCount={props.totalCount}
        usersCount={props.usersCount}
        numberPage={props.numberPage}
        onNumberPage={props.onNumberPage}
      />
      {props.isLoading ? <Preloader /> : <UserPage {...props} />}
      <Pagination
        totalItemsCount={props.totalCount}
        usersCount={props.usersCount}
        numberPage={props.numberPage}
        onNumberPage={props.onNumberPage}
      />
    </div>
  );
};

export default Users;
