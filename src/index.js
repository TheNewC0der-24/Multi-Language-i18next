import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import "/node_modules/flag-icons/css/flag-icons.min.css";

import './index.css';
import App from './App';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ar', 'fr', 'hi'],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    },
  });

const loading = (
  <div className='p-5 text-center'>
    <h2>Loading...</h2>
  </div>
)

ReactDOM.render(
  <Suspense fallback={loading}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
