import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import type { Page } from "Types/Components";

interface RegisterPageProps extends Page {

}

function RegisterPage({ widthConstrained }: RegisterPageProps) {
  const Localizations_Common = useTranslation().t;
  const Localizations_RegisterPage = useTranslation("RegisterPage").t;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Insert register code here

  }

  const TextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    switch (id) {
      case "emailField":
        setEmail(value);
        break;
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
      <Typography variant="h6" align="center">{Localizations_RegisterPage("Typography-FormCaption")}</Typography>
      <form className="AuthForm RegisterForm" onSubmit={register}>
        <TextField id="emailField" className="RegisterFormItem" autoFocus label={Localizations_RegisterPage("TextField_Label-Email")} placeholder={Localizations_RegisterPage("TextField_Placeholder-Email")} value={email} onChange={TextFieldChanged} />
        <TextField id="usernameField" className="RegisterFormItem" label={Localizations_RegisterPage("TextField_Label-Username")} placeholder={Localizations_RegisterPage("TextField_Placeholder-Username")} value={username} onChange={TextFieldChanged} />
        <TextField id="passwordField" className="RegisterFormItem" type="password" label={Localizations_RegisterPage("TextField_Label-Password")} placeholder={Localizations_RegisterPage("TextField_Placeholder-Password")} value={password} onChange={TextFieldChanged} helperText={
          <>
            <Typography variant="caption" color="red">{Localizations_RegisterPage("TextField_HelperText-ForgottenPasswordWarning").toUpperCase()}</Typography>
            <br />
            <Typography variant="caption" color="red">{Localizations_RegisterPage("TextField_HelperText-ForgottenPasswordWarningExplanation")}</Typography>
          </>
        }/>
        <Button className="RegisterFormItem" variant="outlined" type="submit">{Localizations_RegisterPage("Button_Text-Login")}</Button>
      </form>
      <Typography marginTop={1.5}>{Localizations_RegisterPage("Typography-HaveAccountQuestion")} <Link to="/login">{Localizations_RegisterPage("Link-ToLoginForm")}</Link></Typography>
    </div>
  );
}

export default RegisterPage;
