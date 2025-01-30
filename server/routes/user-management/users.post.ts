import type {User, ReturnJSONUsers} from "@/interfaces";

export default defineEventHandler(
  async (event): Promise<ReturnJSONUsers> => {
    const body = await readBody(event);
    const user = body as User;

console.log("user---", user);

    let userList = new Map<number, User>();
    const storage = useStorage();

    const userListStorage = await storage.getItem("local: user-management_users");
    if (userListStorage != undefined) {
      userList = new Map<number, User>(userListStorage as any);
    }
    userList.set(user.id, user);
    await storage.setItem("local: user-management_users", [...userList]);


    const tempListStorage = await storage.getItem("local: user-management_users");
console.log("てんっぷ", tempListStorage);

    return {
      result: 1,
      data: [user]
    };
  }
);
