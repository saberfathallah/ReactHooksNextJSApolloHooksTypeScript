/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(withA11y);

const req = require.context('../src', true, /stories.tsx?$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
