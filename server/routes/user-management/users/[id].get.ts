import type { User, ReturnJSONUsers } from "@/interfaces"

export default defineEventHandler(
  async (event): Promise<ReturnJSONUsers> => {
    let resultVal = 0;
    const userListArray: User[] = [];
    
    // throw createError("擬似エラー発生");

    
    try {
      // ルートパラメータを取得
      const params = event.context.params;
      let userList = new Map<number,User>();
      const storage = useStorage();
      const userListStorage = await storage.getItem("local: user-management_users");
    
     // throw createError("擬似エラー発生");
    
      if(userListStorage != undefined) {
        userList = new Map<number, User>(userListStorage as any);
      }

      if (params != undefined ) {
        // ルートパラメータのidを数値に変換
        const idNo = Number(params!.id);

        // ルートパラメータに該当する会員情報オブジェクトを取得
        const user = userList.get(idNo);

        resultVal = 1;
        if (user != undefined) {
          userListArray[0] = user;
        }
      }
    } catch(err) {
      console.log(err);
    }

    // 送信データオブジェクトをリターン
    return {
      result: resultVal,
      data: userListArray
    };
  }
);
