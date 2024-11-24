import React, { useEffect, useState } from 'react';
import { NoticeBar, Switch } from 'antd-mobile';
import styles from './index.module.scss';
import { ExclamationTriangleOutline } from 'antd-mobile-icons';

const Control = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const getLightState = async () => {
    try {
      const res = await fetch('/api/control-light', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const result = await res.json();
        setIsOpen(result.isOpen);
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  const handleState = async (checked: boolean) => {
    fetch(`/api/handle-state?isOpen=${checked ? 1 : 0}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
        } else {
          setIsOpen(checked);
          setIsError(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  };

  useEffect(() => {
    setIsError(false);
    getLightState();
  }, []);

  return (
    <div className={styles.control}>
      {isError ? (
        <NoticeBar
          closeable
          icon={<ExclamationTriangleOutline />}
          color='alert'
          content={'Network Error, failed to get the light state'}
          onClose={() => setIsError(false)}
        />
      ) : null}
      <div className={styles['operation-item']}>
        <p className={styles.title}>Turn on/off the light</p>
        <Switch
          checked={isOpen}
          onChange={(checked) => {
            handleState(checked);
          }}
          style={{
            '--checked-color': '#a03cf7',
            '--height': '36px',
            '--width': '60px',
          }}
        />
      </div>
    </div>
  );
};

export default Control;
