// src/pages/AccountActivationPage.jsx
import React from "react";
import { useParams } from "react-router-dom";

const AccountActivationPage = () => {
  const { activationToken } = useParams();

  return (
    <div>
      <h1>Account Activation</h1>
      <p>Your activation token: {activationToken}</p>
    </div>
  );
};

export default AccountActivationPage;
