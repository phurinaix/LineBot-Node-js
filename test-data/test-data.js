var modeData = [
    'รายงานผล\n VIP รอบที่ 63\n 348-52',
    'รายงานผล\n รอบที่ 63\n 686-31',
    'รายงานผล\n รอบที่ 63\n 686-31\n รายงานผล\n VIP รอบที่ 63\n 348-52',
    `จับยี่กี vip 14/10/18\n
        46 = 17:15 599-57\n
    `
];

function modeText(mode) {
    return modeData[mode - 1];
}

module.exports = {
    modeText
};