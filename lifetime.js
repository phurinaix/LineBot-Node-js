function lifeTime(time) {
    var now = new Date();
    var next = new Date(now.getTime() + time * 60000);

    var seconds = next.getSeconds();
    var minutes = next.getMinutes();
    var hours = next.getHours();
    var dayOfMonth = next.getDate();
    var month = next.getMonth() + 1;
    var dayOfWeek = next.getFullYear();

    return `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

module.exports.lifeTime = lifeTime;