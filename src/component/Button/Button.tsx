import React from 'react';

type Props = {
  text: string;
};

const Button = ({ text }: Props): JSX.Element => (
  <div>
    <button type="button">{text}</button>
  </div>
);

export default Button;
