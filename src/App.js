import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Cookies from "js-cookie";

import { FaInfoCircle } from "react-icons/fa";
import { ImNpm } from "react-icons/im";
import { GrLanguage } from "react-icons/gr";

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "fr",
    name: "Français",
    country_code: "fr",
  },
  {
    code: "ar",
    name: "العربية",
    country_code: "sa",
    dir: "rtl"
  },
  {
    code: "hi",
    name: "हिन्दी",
    country_code: "in",
  },
]

function App() {

  const currentLanguageCode = Cookies.get('i18next') || 'en';
  const currentLanguage = languages.find(l => l.code === currentLanguageCode);

  const { t } = useTranslation();

  const releaseDate = new Date("2022-10-06");
  const timeDifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDifference / (1000 * 3600 * 24));

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow bg-light">
        <div className="container">
          <div className="navbar-brand"><ImNpm className="fs-4 me-2" />i18next</div>
          <div className="dropdown dropstart">
            <div className="dropdown-toggle" style={{ cursor: "pointer" }} data-bs-toggle="dropdown" aria-expanded="false">
              <GrLanguage className="fs-4" />
            </div>
            <ul className='dropdown-menu'>
              <li>
                <span className="dropdown-item-text">{t('language')}</span>
              </li>
              <li><hr className="dropdown-divider" /></li>
              {languages.map(({ code, name, country_code }) => (
                <li key={country_code}>
                  <button className="dropdown-item" onClick={() => i18next.changeLanguage(code)} disabled={code === currentLanguageCode}>
                    <span className={`fi fi-${country_code} mx-2`} style={{ opacity: code === currentLanguageCode ? 0.5 : 1 }}></span>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="alert mt-5" style={{ backgroundColor: "#f2eafe", color: "#6d2ae2" }} role="alert">
        <div className="text-center"><FaInfoCircle className="fs-4 me-2" />{t('days_since_release', { number_of_days })}</div>
      </div>

      <div className="container my-5">
        <div className="d-flex flex-column align-items-start">
          <h1 className="fw-normal mb-4">{t('welcome_message')},</h1>
          <p className="mb-3" style={{ lineHeight: "1.5" }}>{t('about')}</p>
          <h5><span className="badge text-wrap" style={{ backgroundColor: "#6d2ae2", color: "f2eafe", borderRadius: "0" }}>{t('about_sm')}</span></h5>
        </div>
      </div>
    </>
  );
}

export default App;
