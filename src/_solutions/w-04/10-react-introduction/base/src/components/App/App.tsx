import React from 'react';
import styles from './App.pcss';
import Logo from '../Logo/Logo';

interface AppProps {
  name: string;
}

const App: React.FC<AppProps> = ({ name }) => (
  <div className={styles.app}>
    <hr className={styles.hrTop} />
    <h1 className={styles.name}>
      @{name}
    </h1>
    <h2 className={styles.year}>
      ©{(new Date()).getFullYear()}
    </h2>
    <div className={styles.levels}>
      <span className={styles.level}>Easy</span>
      <span className={styles.level}>Medium</span>
      <span className={styles.level}>Hard</span>
    </div>
    <Logo />
    <hr className={styles.hrBottom} />
  </div>
);

export default App;
