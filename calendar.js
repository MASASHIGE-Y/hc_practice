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

function buildCalendar(year, month) {
  const firstWeekday = new Date(year, month - 1, 1).getDay(); // 0=sunday
  const daysInMonth = new Date(year, month, 0).getDate();

  const weeks = [];
  let week = [];

  // 月初まで空白
  for (let i = 0; i < firstWeekday; i++) {
    week.push("  ");    // 1日、2日、3日の週がずれたので、スペースを1つ追加
  }    
   
  // 1日〜末日
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(String(day).padStart(2, " "));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  // 最後の週（あまり）
  if (week.length > 0) {
    while (week.length < 7) week.push(" ");
    weeks.push(week);
  }

  return weeks;
}

function printCalendar(year, month) {
  const title = `${month}月 ${year}`;
  console.log(title.padStart(14, " "));

  console.log(" 日 月 火 水 木 金 土");

  const weeks = buildCalendar(year, month);
  for (const week of weeks) {
    console.log(week.join(" "));
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