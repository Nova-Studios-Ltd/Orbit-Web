import React, { useState } from 'react';
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

import { AutoLogin, Manager } from './Init/AuthHandler';
import { DarkTheme_Default } from 'Theme';
import { Localizations } from 'Localization/Localizations';

import AuthView from 'Views/AuthView/AuthView';
import ErrorView from 'Views/ErrorView/ErrorView';
import MainView from 'Views/MainView/MainView';
import ChatPage from 'Pages/ChatPage/ChatPage';
import LoginPage from 'Pages/LoginPage/LoginPage';
import SettingsPage from 'Pages/SettingsPage/SettingsPage';

import './App.css';

i18n.use(initReactI18next)
.init({
  resources: Localizations,
  lng: "en", // TODO: Remove this and add a language selection system later
  fallbackLng: "en"
});

function App() {

  const [widthConstrained, setWidthConstrainedState] = useState(window.matchMedia("(max-width: 600px)").matches);

  Manager.ContainsCookie("LoggedIn").then(async (value: boolean) => {
    if (!value) return;
    const loggedIn = await AutoLogin();
    if (loggedIn && !document.location.href.includes("/Chat")) {
      Manager.WriteCookie("LoggedIn", "false");
      document.location.assign("/Chat");
    }
  });

  window.addEventListener("resize", (event) => {
    setWidthConstrainedState(window.matchMedia("(max-width: 600px)").matches);
  });

  return (
    <div className="App">
      <ThemeProvider theme={DarkTheme_Default}>
        <Router>
          <Routes>
            <Route path="*" element={<ErrorView errorCode={404} />}></Route>
            <Route path="/" element={<AuthView widthConstrained={widthConstrained} page={<LoginPage />} />} />
            <Route path="/login" element={<AuthView widthConstrained={widthConstrained} page={<LoginPage />} />} />
            <Route path="/chat" element={<MainView page={<ChatPage />} />} />
            <Route path="/settings" element={<MainView page={<SettingsPage />} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
