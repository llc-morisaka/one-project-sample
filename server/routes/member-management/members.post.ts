import type {Member, ReturnJSONMembers} from "@/interfaces";
import Member from "~/layouts/member.vue";

export default defineEventHandler(
	async (event): Promise<ReturnJSONMembers> => {
		let resultVal = 0;
		const memberListArray: Member[] = [];

   // throw createError("擬似エラー発生");

	 try {
		const body = await readBody(event);
		// throw createError("擬似エラー発生");
		const member = body as Member;
		let memberList = new Map<number, Member>();
		const storage = useStorage();
		const memberListStorage = await storage.getItem("local:member-management_members");
		if(memberListStorage != undefined) {
			memberList = new Map<number, Member>(memberListStorage as any);
		}
		memberList.set(member.id, member);
		await storage.setItem("local:member-management_members", [...memberList]);
		memberListArray[0] = member; 
	  resultVal = 1;
	} catch(err) {
		console.log(err);
	}

		return {
			result: resultVal,
			data: memberListArray
		};
	}
);
