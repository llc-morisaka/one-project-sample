import type { User, ReturnJSONAuth } from "@/interfaces"
import { users } from "../../data/users";

export default defineEventHandler(
  async (event): Promise<ReturnJSONAuth> => {

    let resultVal = 0;
    let tokenVal = "";
    let loginUser: User | null = null;

    try {
      const body = await readBody(event);
      const user = users.find(u => u.loginId === body.loginId && u.password === body.password);
      
      resultVal = 1;
      if (user) {

        tokenVal = "abcseffghijkim";  // 仮のトークン

        // ログインユーザー情報を格納
        loginUser = {
          id: user.id,
          name: user.name,
          loginId: user.loginId,
          password: "",  // パスワードは不要
        };
      }
    } catch (err) {
      console.log("失敗", err);
    }

    return {
      result: resultVal,
      token: tokenVal,
      user: loginUser
    };
  }
);
