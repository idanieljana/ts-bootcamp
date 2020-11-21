import React from 'react';
import cn from 'classnames';
import styles from './Cards.pcss';

type Handler = () => void;

interface CardProps {
  type: string;
  onClick: Handler;
  isFlipped: boolean;
}

// eslint-disable-next-line react/prefer-stateless-function
export class Card extends React.Component<CardProps> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const {
      type, onClick, isFlipped,
    } = this.props;
    return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
      <li onClick={onClick} className={cn(styles.card, isFlipped ? styles.flipped : '')}>
        <div>
          <span className={cn(styles.figure, styles.front)} />
          <span className={cn(styles.figure, styles.back)}> {type} </span>
        </div>
      </li>
    );
  }
}
