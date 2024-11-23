import React from 'react';
import type { AppProps } from 'next/app';
import { AppOutline, HistogramOutline } from 'antd-mobile-icons';
import { useRouter } from 'next/navigation';
import { NavBar, TabBar } from 'antd-mobile';
import styles from './app.module.scss';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const tabs = [
    {
      key: 'home',
      title: 'Control',
      icon: <AppOutline />,
      onClick: () => {
        router.push('/');
      },
    },
    {
      key: 'data',
      title: 'Data',
      icon: <HistogramOutline />,
      onClick: () => {
        router.push('/data');
      },
    },
  ];
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <NavBar back={null}>
          <p className={styles.title}>Smart Light</p>
        </NavBar>
      </header>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <footer className={styles.footer}>
        <TabBar safeArea>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} onClick={item.onClick} />
          ))}
        </TabBar>
      </footer>
    </div>
  );
};

export default App;
