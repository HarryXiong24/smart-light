import React from 'react';
import type { AppProps } from 'next/app';
import { AppOutline, HistogramOutline } from 'antd-mobile-icons';
import { useRouter } from 'next/navigation';
import { NavBar, Tabs } from 'antd-mobile';
import styles from './app.module.scss';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <NavBar back={null}>
          <p className={styles.title}>Smart Light</p>
        </NavBar>
      </header>
      <div>
        <Tabs
          defaultActiveKey='control'
          onChange={(key: string) => {
            if (key === 'control') {
              router.push('/');
            } else {
              router.push('/analyze');
            }
          }}
        >
          <Tabs.Tab
            title={
              <div className={styles.tab}>
                <AppOutline fontSize={24} />
                <p style={{ paddingLeft: '0.3rem' }}>Control</p>
              </div>
            }
            key='control'
          ></Tabs.Tab>
          <Tabs.Tab
            title={
              <div className={styles.tab}>
                <HistogramOutline fontSize={24} />
                <p style={{ paddingLeft: '0.3rem' }}>Analyze</p>
              </div>
            }
            key='analyze'
          ></Tabs.Tab>
        </Tabs>
      </div>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default App;
