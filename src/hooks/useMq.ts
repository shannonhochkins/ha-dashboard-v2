import { ResponsiveTypes } from '@types';

// [min width, min height, max width, max height]
const BREAKPOINTS: { [key in ResponsiveTypes]: string } = {
  tablet: `@media (min-width: 768px) and (max-width: 979px)`,
  desktop: `@media (min-width: 1024px)`,
  fridge: `@media only screen and (min-width: 980px) and (max-width: 982px) and (min-height: 1455px) and (max-height: 1457px)`,
  mobile: `@media (min-width: 767px)`,
}

export const useMq = (names: ResponsiveTypes[], cssValues: string) => {
  return names.map(name => `
    ${BREAKPOINTS[name]} {
      ${cssValues}
    }
  `) ;
};

