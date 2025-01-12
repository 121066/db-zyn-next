const weekDayMap = {
    'Monday': '星期一',
    'Tuesday': '星期二',
    'Wednesday': '星期三',
    'Thursday': '星期四',
    'Friday': '星期五',
    'Saturday': '星期六',
    'Sunday': '星期日'
};

export function getChineseWeekDay(englishWeekDay) {
    return weekDayMap[englishWeekDay] || englishWeekDay;
}
/***
 * 处理月份记录数组
 */ 
// export function handleMonthRecord(list: Array<Record<string, any>>) {
   
// }
