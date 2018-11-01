const words = require('../words.js');

var modeData = {
    mode1: 'รายงานผล\n VIP รอบที่ 63\n 348-52',
    mode2: 'รายงานผล\n รอบที่ 63\n 686-31',
    mode3: `รายงานผล\n
            รอบที่ 63\n
            686-31\n
            ----------------\n
            รายงานผล\n
            VIP รอบที่ 63\n
            348-52`,
    mode4: `จับยี่กี vip 14/10/18\n
              46 = 17:15 599-57\n
              47 = 17:30 279-16\n
              48 = 17:45 051-56\n
              -----------------\n
              49 = 18:00 764-18\n
              50 = 18:15 296-44\n
              51 = 18:30 836-68\n
              52 = 18:45 203-33\n
              -----------------\n
              53 = 19:00 157-85\n
              54 = 19:15 329-93\n
              55 = 19:30 396-05\n
              56 = 19:45 761-39\n
              -----------------\n
              57 = 20:00 964-88\n
              58 = 20:15 497-15\n
              59 = 20:30 205-24\n
              60 = 20:45 714-74\n
              -----------------\n
              61 = 21:00 386-25\n
              62 = 21:15 075-02\n
              63 = 21:30 348-52\n
              64 = 21:45 654-33`,
    mode5: `จับยี่กี 14/10/18\n
              46 = 17:15 599-57\n
              47 = 17:30 279-16\n
              48 = 17:45 051-56\n
              -----------------\n
              49 = 18:00 764-18\n
              50 = 18:15 296-44\n
              51 = 18:30 836-68\n
              52 = 18:45 203-33\n
              -----------------\n
              53 = 19:00 157-85\n
              54 = 19:15 329-93\n
              55 = 19:30 396-05\n
              56 = 19:45 761-39\n
              -----------------\n
              57 = 20:00 964-88\n
              58 = 20:15 497-15\n
              59 = 20:30 205-24\n
              60 = 20:45 714-74\n
              -----------------\n
              61 = 21:00 386-25\n
              62 = 21:15 075-02\n
              63 = 21:30 348-52\n
              64 = 21:45 654-33`,
    mode6: 'hello',
    mode7: 'dddd'
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
        return modeData.mode3.replace(/\t+/g, "");
    }

    // mode 4
    else if (words.mode_4.includes(text)) {
        return modeData.mode4.replace(/\t+/g, "");
    }

    // mode 5
    else if (words.mode_5.includes(text)) {
        return modeData.mode5.replace(/\t+/g, "");
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