import type {User, ReturnJSONUsers} from "@/interfaces";

export default defineEventHandler(
  async (event): Promise<ReturnJSONUsers> => {
    const body = await readBody(event);
    const user = body as User;

console.log("user---", user);

    let userList = new Map<number, User>();
    let maxId: number = 0;
    let nextId: number = 0;
    const storage = useStorage();
    const userListStorage = await storage.getItem("local: user-management_users");
    let duplicateFlg: boolean = false;
    let resultCode: number = 0;
// console.log("dデフォルトりおゆ", userListStorage);

    if (userListStorage != undefined) {
      userList = new Map<number, User>(userListStorage as any);
      maxId = Math.max(...[...userList.values()].map(user => user.id));
      duplicateFlg = [...userList.values()].some(userRec => userRec.loginId === user.loginId);
    } else {
      maxId = 0;
    }
    
    if ( duplicateFlg == false ){
      nextId = maxId + 1;
      user.id = nextId;

  // console.log("userList---", userList);


      userList.set(user.id, user);

      await storage.setItem("local: user-management_users", [...userList]);

      const tempListStorage = await storage.getItem("local: user-management_users");
      // console.log("てんっぷ", tempListStorage);

      resultCode = 1;
    } else {
      resultCode = 99;
    }

console.log("resultCode", resultCode);

    return {
      result: resultCode,
      data: [user]
    };
  }
);
