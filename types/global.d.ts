// Temporary minimal type declarations to allow editing without installing node_modules
// IMPORTANT: These are stop-gap declarations. For full type safety install
// react, react-dom, lucide-react and the appropriate @types packages.

declare module 'react' {
  export type ReactNode = any;
  export type ReactElement = any;
  export interface Attributes { key?: any }
  export interface ClassAttributes<T> {}
  export type PropsWithChildren<P> = P & { children?: ReactNode };

  // Functional component type
  export type FC<P = {}> = (props: PropsWithChildren<P>) => ReactElement | null;

  // Hooks (minimal)
  export function useState<S>(initialState: S | (() => S)): [S, (newState: S) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;

  export const Fragment: any;

  const React: {
    createElement: any;
    Fragment: any;
  };
  export default React;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export function jsxDEV(type: any, props: any, key?: any, __source?: any, __self?: any): any;
}

declare module 'lucide-react' {
  import { FC } from 'react';
  export const Github: FC<any>;
  export const Linkedin: FC<any>;
  export const Mail: FC<any>;
  export const ExternalLink: FC<any>;
  export const Code2: FC<any>;
  export const Smartphone: FC<any>;
  export const Database: FC<any>;
  export const Terminal: FC<any>;
  const _default: any;
  export default _default;
}
