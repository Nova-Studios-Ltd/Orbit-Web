import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { LoginNewUser } from "Init/AuthHandler";


import type { Page } from "Types/Components";
import { LoginStatus } from "DataTypes/Enums";

interface LoginPageProps extends Page {

}

function LoginPage({ widthConstrained }: LoginPageProps) {
  const Localizations_Common = useTranslation().t;
  const Localizations_LoginPage = useTranslation("LoginPage").t;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failureStatus, setFailStatus] = useState(LoginStatus.PendingStatus);

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Loggin in")

    LoginNewUser(email, password).then((status: LoginStatus) => {
      if (status === LoginStatus.Success) navigate("/chat");
      else setFailStatus(status);
    });
  }

  const TextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    switch (id) {
      case "emailField":
        setEmail(value);
        break;
      case "passwordField":
        setPassword(value);
        break;
      default:
        console.warn(`A TextField is missing an ID or has an ID mismatch with its event handler. (Got ID ${id.length > 0 ? id : "undefined"})`);
        break;
    }
  }

  return (
    <div>
      <Typography variant="h6" align="center">{Localizations_LoginPage("Typography-FormCaption")}</Typography>
      <form className="AuthForm LoginForm" onSubmit={login}>
        <TextField id="emailField" className="LoginFormItem" autoFocus required label={Localizations_LoginPage("TextField_Label-Email")} placeholder={Localizations_LoginPage("TextField_Placeholder-Email")} value={email} onChange={TextFieldChanged} />
        <TextField id="passwordField" className="LoginFormItem" type="password" required label={Localizations_LoginPage("TextField_Label-Password")} placeholder={Localizations_LoginPage("TextField_Placeholder-Password")} value={password} onChange={TextFieldChanged} />
        <Button className="LoginFormItem" variant="outlined" type="submit">{Localizations_LoginPage("Button_Text-Login")}</Button>
      </form>
      <Typography marginTop={1.5}>{Localizations_LoginPage("Typography-DontHaveAccountQuestion")} <Link to="/register">{Localizations_LoginPage("Link-ToRegisterForm")}</Link></Typography>
    </div>
  );
}

export default LoginPage;
