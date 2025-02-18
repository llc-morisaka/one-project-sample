import type { MenuItem } from "@/interfaces";

export const menuData: MenuItem[] = [
  {
    name: 'タブのあるページ',
    to: '/sampleTab',
  },
  {
    name: 'メニュー２',
    to: '/weather/weatherShow',
  },
  {
    name: 'メニュー３',
    to: '/about',
  },
  {
    name: 'メニュー４',
    children: [
      { name: 'メニュー4のサブメニュー1', to: '/aaa_1' },
      { name: 'メニュー4のサブメニュー2', to: '/aaa_2' },
    ],
  },
  {
    name: 'メニュー5',
    children: [
      {
        name: 'メニュー5のサブメニュー1',
        children: [
          { name: 'メニュー5のサブメニュー1のサブメニュー1', to: '/ccc1_1' },
          { name: 'メニュー5のサブメニュー1のサブメニュー2', to: '/ccc1_2' },
        ],
      },
      {
        name: 'メニュー5のサブメニュー2',
        children: [
          { name: 'メニュー5のサブメニュー2のサブメニュー1', to: '/ccc1_1' },
          { name: 'メニュー5のサブメニュー2のサブメニュー2', to: '/ccc1_2' },
        ],
      },
    ],
  },
];
