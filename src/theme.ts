import { isNumber, isObject } from 'lodash';


const namespace = 'ha';



export const theme = {
  // sidebar: {
  //   width: 280,
  //   background: 'rgba(17, 24, 39, 1)'
  // },
  menu: {
    background: 'rgba(17, 24, 39, 1)',
    animation: {
      duration: '0.7s',
      delay: 0,
    }
  },
  background: 'rgb(11, 15, 25)',
  highlight: 'rgb(45, 55, 72)',
  primary: '#57dfb1',
  gradient: {
    primary: 'linear-gradient(-45deg, rgb(18 25 41) 0%, rgb(11 15 25) 100% )',
    secondary: 'linear-gradient(-45deg, rgb(38 50 79) 0%, rgb(22 30 47) 100% )',
  },
  radial: {
    animation: {
      start: 'rgb(25 49 58)',
      end: 'rgba(17, 24, 39, 1)'
    }
  },
  media: {
    card: {
      primary: 'linear-gradient(175deg, #75ffef 0%, #50999f 100% )',
      secondary: 'linear-gradient(175deg, #f0e2f2 0%, #d0c0e2 100% )',
    }
  },
  secondary: '#1e1e21',
  button: {
    primary: {
      background: 'rgba(17, 24, 39, 0.9)',
      color: '#565656',
      border: '#437882'
    }
  },
  text: {
    grey: '#6e6e6e',
    dark: 'rgb(0, 0, 0)',
    light: 'rgba(255, 255, 255, 0.88)'
  }
};

function convertToCssVars(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const name = `${prefix ? `${prefix}-` : ''}${key}`;
    return `
      ${acc}
      ${isObject(value) ? convertToCssVars(value, name) : `--${namespace}-${name}: ${isNumber(value) ? `${value}` : value};`}
    `;
  },
  '');
}

export const cssTheme = convertToCssVars(theme);