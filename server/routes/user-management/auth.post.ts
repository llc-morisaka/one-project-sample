import type { User, ReturnJSONAuth } from "@/interfaces"

export default defineEventHandler(
  async (event): Promise<ReturnJSONAuth> => {

    let resultVal = 0;
    let tokenVal = "";
    let loginUser: User | null = null;
    
    let userListMap: any;


    try {
      const body = await readBody(event);

      const storage = useStorage();
      const userListStorage = await storage.getItem("local: user-management_users");// この時点では配列

      if(userListStorage != undefined) {
        userListMap = new Map<number, User>(userListStorage as any);// 一旦マップにする

      }

      const userListIte = userListMap.values();// イテレータにする
      const userListArray: User[] = Array.from(userListIte);// イテレータからまた配列にする

      const user = userListArray.find(u => u.loginId === body.loginId && u.password === body.password);

      resultVal = 1;
      if (user) {

        tokenVal = "abcseffghijkim";  // 仮のトークン

        // ログインユーザー情報を格納
        loginUser = {
          id: user.id,
          name: user.name,
          loginId: user.loginId,
          password: "",  // パスワードは不要
          authLevel: user.authLevel
        };
      }


    } catch(err) {
      console.error("失敗", err);
      throw createError({
        statusCode: 500,
        statusMessage: "サーバーエラーが発生しました",
        data: { error: err }
      });
    }

    return {
      result: resultVal,
      token: tokenVal,
      user: loginUser
    };
  }
);
