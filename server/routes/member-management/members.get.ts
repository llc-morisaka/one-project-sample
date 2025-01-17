import type { Member, ReturnJSONMembers } from "@/interfaces";
import MemberList from "~/pages/member/memberList.vue";
// import { createMemberList } from "~/membersDB";

export default  defineEventHandler(
  async (event): Promise<ReturnJSONMembers> => {
    // 空の会員リストMapオブジェクトの用意
    let memberList = new Map<number, Member>();

    let resultVal = 0;

    //throw createError("擬似エラー発生１");
    try {
      const storage = useStorage();
      const memberListStorage = await storage.getItem("local:member-management_members");
      // throw createError("擬似エラー発生２");
      if(memberListStorage != undefined) {
        memberList = new Map<number, Member>(memberListStorage as any);
      }
      resultVal = 1;
    } catch(err) {
      console.log("エラー----",err);
    }

    const memberListValues = memberList.values();
    const memberListArray = Array.from(memberListValues);
    return {
      result: resultVal,
      data: memberListArray
    }
  }
);