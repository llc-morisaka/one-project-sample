import type { User, ReturnJSONUsers } from "@/interfaces";

export default  defineEventHandler(
  async (event): Promise<ReturnJSONUsers> => {

    // 空の会員リストMapオブジェクトの用意
    let userList = new Map<number, User>();

    let resultVal = 0;

    //throw createError("擬似エラー発生１");
    try {
      const storage = useStorage();
      const userListStorage = await storage.getItem("local:user-management_users");
      // throw createError("擬似エラー発生２");
      if(userListStorage != undefined) {
        userList = new Map<number, User>(userListStorage as any);
      }
      resultVal = 1;
    } catch(err) {
      console.log("エラー----",err);
    }

    const userListValues = userList.values();
    const userListArray = Array.from(userListValues);
    return {
      result: resultVal,
      data: userListArray
    }
  }
);