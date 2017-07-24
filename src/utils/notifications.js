function getUserPermission() {
    Notification.requestPermission().then(function(result) {
        console.log('Notification status is: ', result);
    });
}

module.exports = {
    getUserPermission
};