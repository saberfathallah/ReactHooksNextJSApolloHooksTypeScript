import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import Button from './Button';

storiesOf('Button', module).add('with text', () => (
  <Button
    text={text('text', 'Ajouter au panier')}
  />
),
{
  notes:
      'The aim of this component is to display an button with a text',
});
