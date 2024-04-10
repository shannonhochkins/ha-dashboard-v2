export type ResponsiveTypes = "desktop" | "tablet" | "mobile" | "fridge";

// [min width, min height, max width, max height]
export const BREAKPOINTS: { [key in ResponsiveTypes]: string } = {
  tablet: `@media only screen and (min-width: 768px) and (max-width: 1023px) and (max-height: 1454px)`,
  desktop: `@media only screen and (min-width: 1024px)`,
  fridge: `@media only screen and (min-width: 980px) and (max-width: 982px) and (min-height: 1455px) and (max-height: 1457px)`,
  mobile: `@media only screen and (max-width: 767px)`,
};

export const mq = (names: ResponsiveTypes[], cssValues: string) => {
  return names.map(
    (name) => `
    ${BREAKPOINTS[name]} {
      ${cssValues}
    }
  `,
  );
};
