import React from 'react';

type Handler = () => void;

interface CardProps {
  type: string;
  onClick: Handler;
  children: React.ReactElement;
  className: string | undefined;
}

// eslint-disable-next-line react/prefer-stateless-function
export class Card extends React.Component<CardProps> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const {
      type, onClick, className, children,
    } = this.props;
    return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
      <li data-type={type} onClick={onClick} className={className}>
        {children}
      </li>
    );
  }
}
