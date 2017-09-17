function getUserPermission() {
    Notification.requestPermission().then(function(result) {
    });
}

module.exports = {
    getUserPermission
};