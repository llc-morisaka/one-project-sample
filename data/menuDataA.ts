import type { MenuItem } from "@/interfaces";

export const menuData: MenuItem[] = [
  {
    name: 'あああああ',
    to: '/',
  },
  {
    name: 'いいいいい',
    to: '/weather/weatherShow',
  },
  {
    name: 'ううううう',
    to: '/about',
  },
  {
    name: 'aaa',
    children: [
      { name: 'aaa_1', to: '/aaa_1' },
      { name: 'aaa_2', to: '/aaa_2' },
    ],
  },
  {
    name: 'ccc',
    children: [
      {
        name: 'ccc1',
        children: [
          { name: 'ccc1_1', to: '/ccc1_1' },
          { name: 'ccc1_2', to: '/ccc1_2' },
        ],
      },
    ],
  },
];
