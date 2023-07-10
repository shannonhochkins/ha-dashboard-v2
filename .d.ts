import { SupportedServices, ServiceFunction } from 'ha-component-kit';

declare module '*.jpg' {
  const value: string;
  export default value;
}
declare module '*.png' {
  const value: string;
  export default value;
}