import React from 'react';
import styles from './PlayButton.pcss';

export interface PlayButtonProps {
  text: string;
  onClick: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ onClick, text }) => <button type="button" className={styles.playButton} onClick={onClick}>{text}</button>;
