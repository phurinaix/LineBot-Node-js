var asyncTime = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve('success');
    }, 5000);
});

module.exports = {
    asyncTime
}