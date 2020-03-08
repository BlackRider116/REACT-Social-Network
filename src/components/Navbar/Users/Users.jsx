import React from "react";
import Preloader from "../../../common/Preloader/Preloader";
import Pagination from "../../../common/Pagination/Pagination";
import UserPage from "./UserPage";

const Users = ({totalCount, usersCount, numberPage, onNumberPage, ...props}) => {
  const page = { totalCount, usersCount, numberPage, onNumberPage };
  return (
    <div>
      <Pagination {...page} />
      {props.isLoading ? <Preloader /> : <UserPage {...props} /> }     
    </div>
  );
};

export default Users;
