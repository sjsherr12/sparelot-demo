import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, HashRouter, useLocation } from "react-router-dom";
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import WebApp from "WebApp";
import MobileApp from "MobileApp";
import isStandalone from "isStandalone";
import { app_auth } from "app/backend/fb_cfg";
import { onAuthStateChanged } from "firebase/auth";
import { Box, Typography } from "@mui/material";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

const renderApp = () => {
  const standalone = isStandalone();
  const RouterType = standalone ? HashRouter : BrowserRouter;

  root.render(
    <RouterType>
      <HelmetProvider>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                touch-action: pan-x pan-y;
                overflow: visible;
                overscroll-behavior: ${standalone ? 'none' : 'auto'};
              }
            `
          }}
        />

        {standalone ? <MobileApp /> : <WebApp />}
    </HelmetProvider>
    </RouterType>
  );
}

renderApp();