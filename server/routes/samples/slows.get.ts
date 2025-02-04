export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
    "Cache-Control": "no-cache",
  });

  const stream = new ReadableStream({
    start(controller) {

      const sendProgress = async (progress: number) => {
        const chunk = JSON.stringify({ progress }) + "\n";
        controller.enqueue(new TextEncoder().encode(chunk));
      };

      (async () => {
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 600)); // 0.6秒ごとに進捗送信
          await sendProgress(i);
        }

        // 最終レスポンス
        const finalData = JSON.stringify({
          message: "処理が完了しました",
          timestamp: new Date().toISOString(),
        }) + "\n";
        controller.enqueue(new TextEncoder().encode(finalData));
        controller.close();
      })();

    },
  });

  return new Response(stream);
});
