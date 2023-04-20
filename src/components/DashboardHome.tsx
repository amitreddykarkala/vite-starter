import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const DashboardHome = () => {
  const [count, setCount] = useState(0);
  const { t, i18n } = useTranslation(['translation', 'ns1', 'ns2']);
  const changeLanguageHandler = (e: { target: { value: string }; }) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }
  return (
    <div className="flex w-full bg-slate-50 flex-col">
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <div className="flex">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="flex">
        Click on the Vite and React logos to learn more
      </p>
      {/* Select box to change language */}
      <div />
      <select className="bg-gray-300 mb-8 ml-4" style={{width: 200}} onChange={changeLanguageHandler}>
        <option value="en" >English</option>
        <option value="hn" >Hindi</option>
      </select>
      <div />
      <p className="ml-4" >{t('name')}</p> 
      <p className="ml-4" >{t('ns1:name1')}</p> 
      <p className="ml-4" >{t('ns2:name2')}</p> 
    </div>
  );
};

export default DashboardHome;
