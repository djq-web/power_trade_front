export type NavKey =
  | 'dashboard'
  | 'trading-calendar'
  | 'long-term'
  | 'spot'
  | 'settings'
  | 'user';

export type INavItem = {
  title: string;
  value: NavKey;
  path?: string;
};
