import React from 'react';
import styles from './Game.pcss';

interface ProgressBarProps {
  className?: string;
}
export const ProgressBar: React.FC<ProgressBarProps> = ({ className }) => (
  <div className={styles.progressContainer}>
    <div className={className} />
  </div>
);
