export interface User {
  id: number;
  name: string;
  loginId: string;
  password: string;
  authLevel: 1 | 2 | 3 | 9;
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

export interface InputArea {
  cardTitle?: string;
  cardText?: string;
  sectionId: string;
  initialText: string;
  useFlg: boolean;
}


export interface SendJSONVcard {
  textAreaVal: string,
  sectionId: string,
  generatedFileName: string
}



export interface ReturnJSONVcard {
  result?: number;
  prompt: string,
  sectionId: string,
  generatedFileName: string
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

