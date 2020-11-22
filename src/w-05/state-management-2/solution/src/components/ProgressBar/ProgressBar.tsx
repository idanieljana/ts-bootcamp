import React from 'react';
import cn from 'classnames';
import styles from './ProgressBar.pcss';

interface ProgressBarProps {}
export const ProgressBar: React.FC<ProgressBarProps> = () => (
  <div className={styles.progressBar}>
    <div className={cn(styles.line, styles.animated)} />
  </div>
);
