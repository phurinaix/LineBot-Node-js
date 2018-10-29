var asyncTime = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve('success');
    }, 1000);
});

module.exports = {
    asyncTime
}