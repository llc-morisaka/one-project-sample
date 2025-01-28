export interface User {
  id: number;
  name: string;
  loginId: string;
  password: string;
  authLebel: 1 | 2 | 3 | 9;
}

export interface ReturnJSONAuth {
  result: number;
  token: string;
  user: User | null;
}

export interface City {
  id: number;
  name: string;
  q: string;
}


export interface Breadcrumb {
  text: string;
  link?: string;
}

export interface MenuItem {
  name: string; // メニュー項目の名前
  to?: string; // リンク先（オプション）
  children?: MenuItem[]; // サブメニュー（オプション）
}

export interface ReturnJSONUsers {
  result: number;
  data: User[];
}




// 以下使ってない
export interface Member {
  id: number;
  name: string;
  email: string;
  points: number;
  note?: string;
}

export interface ReturnJSONMembers {
  result: number;
  data: Member[];
}

