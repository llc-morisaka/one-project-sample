import type {Member, ReturnJSONMembers} from "@/interfaces"
// import { createMemberList } from "@/membersDB"

export default defineEventHandler(
  async (event): Promise<ReturnJSONMembers> => {
    let resultVal = 0;
    const memberListArray: Member[] = [];
    
    // throw createError("擬似エラー発生");

    
    try {
      // ルートパラメータを取得
      const params = event.context.params;
      let memberList = new Map<number,Member>();
      const storage = useStorage();
      const memberListStorage = await storage.getItem("local:member-management_members");
    
     // throw createError("擬似エラー発生");
    
      if(memberListStorage != undefined) {
        memberList = new Map<number, Member>(memberListStorage as any);
      }

      if (params != undefined ) {
        // ルートパラメータのidを数値に変換
        const idNo = Number(params!.id);

        // ルートパラメータに該当する会員情報オブジェクトを取得
        const member = memberList.get(idNo);

        resultVal = 1;
        if (member != undefined) {
          memberListArray[0] = member;
        }
      }
    } catch(err) {
      console.log(err);
    }

    // 送信データオブジェクトをリターン
    return {
      result: resultVal,
      data: memberListArray
    };
  }
);
