import React from 'react';
import 'reset-css';
import styles from './App.pcss';
import { Advertising } from '../Advertising/Advertising';

export const App: React.FC = () => (
    <Advertising />
    // <div className={styles.appContainer}>
    //     <div className={styles.hr} />
    //     <div className={styles.app}>
    //
    //     </div>
    //     <div className={styles.hr} />
    // </div>
);
export default App;
