// POST用のプログラムだけど、送られてきた値の一部を返すだけで何もしない
import type { SendJSONVcard, ReturnJSONVcard } from "@/interfaces";

export default defineEventHandler(
  async (event): Promise<ReturnJSONVcard> => {
    const body = await readBody(event);
    const vcard = body as SendJSONVcard;
    return {
      result: 1,
      prompt: vcard.textAreaVal,
      sectionId: vcard.sectionId,
      generatedFileName: vcard.generatedFileName
    };
  }
);
