export function useDateTime() {
  // 現在の日時を yyyy年mm月dd日 HH時MM分SS秒 の形式でフォーマットする関数
  // @returns {string} フォーマットされた日時文字列
  
  const formatDateTime = (padding: boolean): string => {

    const now = new Date();

    const year = now.getFullYear();
    let month: string;
    let date: string;
    let hours: string;
    let minutes: string;
    let seconds: string;


    if(padding === true) {
      month = String(now.getMonth() + 1).padStart(2, '0');
      date = String(now.getDate()).padStart(2, '0');
      hours = String(now.getHours()).padStart(2, '0');
      minutes = String(now.getMinutes()).padStart(2, '0');
      seconds = String(now.getSeconds()).padStart(2, '0');
    } else {
      month = String(now.getMonth() + 1);
      date = String(now.getDate());
      hours = String(now.getHours());
      minutes = String(now.getMinutes());
      seconds = String(now.getSeconds());

    }
    return `${year}年${month}月${date}日 ${hours}時${minutes}分${seconds}秒`;
  };

  return { formatDateTime };
}
