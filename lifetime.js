function lifeTime(time, dateNow) {
    // var now = new Date();
    var next = new Date(dateNow.getTime() + time * 60000);

    var seconds = next.getSeconds();
    var minutes = next.getMinutes();
    var hours = next.getHours();
    var dayOfMonth = next.getDate();
    var month = next.getMonth();
    var dayOfWeek = next.getDay();

    return `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

module.exports = {
    lifeTime
}