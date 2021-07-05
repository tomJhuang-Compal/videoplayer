import React, { useState } from 'react';
import styles from './index.module.css';

type CounterProps = {
  value: number;
};

export const Counter: React.FC<CounterProps> = ({ value }) => {
  const [counter, setCounter] = useState(0);

  const setCounterUp = () => setCounter(counter + value);

  return (
    <div className={styles.container}>
      {counter}
      <button onClick={setCounterUp} style={{ marginLeft: 15 }}>
        Like +{value}
      </button>
      <div className={styles.hiContainer}>fxHI</div>
      <div className={styles.erContainer}>tesst</div>
      <div className={styles.good}>good</div>
      <div className={styles.testXX}>testXX</div>
      <div className={styles.how}>testXX</div>
      <div className={styles.sdsff}>ffdf</div>
    </div>
  );
};
