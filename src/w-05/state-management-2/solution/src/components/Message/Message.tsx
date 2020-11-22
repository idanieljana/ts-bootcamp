import React from 'react';
import styles from './Message.pcss';

interface MessageProps {
  text: string;
}
// eslint-disable-next-line max-len
export const Message: React.FC<MessageProps> = ({ text }) => <div className={styles.text}>{text}</div>;
