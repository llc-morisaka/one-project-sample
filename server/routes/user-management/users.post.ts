import type {User, ReturnJSONUsers} from "@/interfaces";

export default defineEventHandler(
  async (event): Promise<ReturnJSONUsers> => {
    const body = await readBody(event);
    const user = body as User;
    console.log("ゆーざ", user);
      
    return {
      result: 1,
      data: [user]
    };
  }
);
