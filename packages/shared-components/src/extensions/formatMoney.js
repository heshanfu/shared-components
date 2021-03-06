import { padEnd } from 'lodash';

const trimZeroes = str => {
  if (str[str.length - 1] === '0') {
    return trimZeroes(str.slice(0, -1));
  } else if (str.indexOf('.') > str.length - 2) {
  }
  return padEnd(str, 2, '0');
};

export default money => {
  if (typeof money === 'string' || typeof money === 'number') {
    const [dollars, cents] = ('' + money).split('.');
    return `${dollars}.${trimZeroes(`${cents || '00'}00`)}`;
  }
  // we don't recognize this money type...
  return money;
};
