import React from 'react';
import { Switch } from 'antd-mobile';
import styles from './index.module.scss';

const Control = () => {
  const handleState = async (checked: boolean) => {
    console.log('checked', checked);
    await fetch(`/api/handle-state?isOpen=${checked ? 1 : 0}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <div className={styles.control}>
      <div className={styles['operation-item']}>
        <p className={styles.title}>Turn On/Off the light</p>
        <Switch
          defaultChecked={false}
          onChange={handleState}
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
