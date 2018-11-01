const words = require('../words.js');

var modeData = {
    mode1: 'รายงานผล\n VIP รอบที่ 63\n 348-52',
    mode2: 'รายงานผล\n รอบที่ 63\n 686-31',
    mode3: 'รายงานผล\n รอบที่ 63\n 686-31\n รายงานผล\n VIP รอบที่ 63\n 348-52',
    mode4: `จับยี่กี vip 14/10/18\n
                46 = 17:15 599-57\n
            `
};

function modeText(text) {
    if (words.greeting.includes(text)) {
        return 'Hello';
    }

    // mode 1
    else if (words.mode_1.includes(text)) {
        return modeData.mode1;
    }

    // mode 2
    else if (words.mode_2.includes(text)) {
        return modeData.mode2;             
    }

    // mode 3
    else if (words.mode_3.includes(text)) {
        return modeData.mode3;
    }

    // mode 4
    else if (words.mode_4.includes(text)) {
        return modeData.mode4;
    }

    // mode 5
    else if (words.mode_5.includes(text)) {
        return modeData.mode5;
    }

    // mode 6
    else if (words.mode_6.includes(text)) {
        return modeData.mode6;
    }

    // mode 7
    else if (words.mode_7.includes(text)) {
        return modeData.mode7;
    }

    // another word
}

module.exports = {
    modeText
};