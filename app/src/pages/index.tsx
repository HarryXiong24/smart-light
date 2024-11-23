import React, { useEffect, useState } from 'react';
import { Switch } from 'antd-mobile';
import styles from './index.module.scss';

const Control = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getLightState = async () => {
    const res = await fetch('/api/control-light', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const result = await res.json();
      setIsOpen(result.isOpen);
    }
  };

  const handleState = async (checked: boolean) => {
    await fetch(`/api/handle-state?isOpen=${checked ? 1 : 0}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsOpen(checked);
  };

  useEffect(() => {
    getLightState();
  }, []);

  return (
    <div className={styles.control}>
      <div className={styles['operation-item']}>
        <p className={styles.title}>Turn on/off the light</p>
        <Switch
          checked={isOpen}
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
