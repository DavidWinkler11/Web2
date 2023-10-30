import React from "react";
import { Link } from "react-router-dom";

const AccountButton = () => {
  return (
    <div>
      <Link to="/" className="account-button">
        Account
      </Link>
      <Link to="/competitions" className="competition-button">
      Competitions
      </Link>
    </div>
  
  );
};

export default AccountButton;