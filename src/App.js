import React from 'react';
import { Toaster } from 'react-hot-toast';
import PageTitle from './components/Pagetitle';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import style from './styles/modules/app.module.scss';

function App() {
  return (
    <>
      <div className="container">
        <PageTitle> TODO APP</PageTitle>
        <div className={style.app__wrapper}>
          <AppHeader />
          <AppContent>hello</AppContent>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.5rem',
          },
        }}
      />
    </>
  );
}

export default App;
