"use strict";

function parseMonthArg(argv) {

  if (argv.length === 0) return null;

  if (argv.length === 2 && argv[0] === "-m") {
    const m = Number(argv[1]);
    if (!Number.isInteger(m) || m < 1 || m > 12) {
      throw new Error("月は1〜12で指定してください");
    }
    return m;
  }

  throw new Error("使い方： node calendar.js [-m 月]");
}

function getFirstWeekday(year, month) {
  return new Date(year, month - 1, 1).getDay(); // 0=sunday
}
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}


// 月初まで空白
function printCalendar(year, month) {
  const firstWeekday = getFirstWeekday(year, month);
  const daysInMonth = getDaysInMonth(year, month);

  // タイトル
  const title = `${year}年${month}月`;
  console.log(title.padStart(14, " "));
  console.log(" 日 月 火 水 木 金 土");

  // 月初までの空白
  process.stdout.write("   ".repeat(firstWeekday));


  let dayCount = firstWeekday;

  // 1日〜末日を出力
  for(let day = 1; day <= daysInMonth; day++) {
    process.stdout.write(String(day).padStart(3, " "));
    dayCount++;

    // 土曜日 or 月末で改行
    if(dayCount % 7 === 0 || day === daysInMonth) {
      process.stdout.write("\n");
    }
  }
}

function main() {
  const args = process.argv.slice(2);

  let month;
  try {
    month = parseMonthArg(args);
  } catch(error) {
    console.log(error.message);
    process.exit(1);
  }

  const now = new Date();
  const year = now.getFullYear();
  const targetMonth = month ?? (now.getMonth() + 1);

  printCalendar(year, targetMonth);
}

main();