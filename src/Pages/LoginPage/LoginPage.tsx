import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LoginNewUser } from "Init/AuthHandler";


import type { Page } from "Types/Components";

interface LoginPageProps extends Page {

}

function LoginPage({ widthConstrained }: LoginPageProps) {
  const Localizations_Common = useTranslation().t;
  const Localizations_LoginPage = useTranslation("LoginPage").t;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Loggin in")

    // TODO: Insert login code here
    LoginNewUser(username, password).then((value: boolean) => {
      if (value) navigate("/chat");
      else console.error("Failed to log in");
    });
  }

  const TextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    switch (id) {
      case "usernameField":
        setUsername(value);
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
      <form className="LoginForm" onSubmit={login}>
        <TextField id="usernameField" className="LoginFormItem" autoFocus label={Localizations_LoginPage("TextField_Label-Username")} placeholder={Localizations_LoginPage("TextField_Placeholder-Username")} value={username} onChange={TextFieldChanged} />
        <TextField id="passwordField" className="LoginFormItem" type="password" label={Localizations_LoginPage("TextField_Label-Password")} placeholder={Localizations_LoginPage("TextField_Placeholder-Password")} value={password} onChange={TextFieldChanged} />
        <Button className="LoginFormItem" variant="outlined" type="submit">{Localizations_LoginPage("Button_Text-Login")}</Button>
      </form>
    </div>
  );
}

export default LoginPage;
