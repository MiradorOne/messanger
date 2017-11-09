import * as firebase from 'firebase';

export default class Notifications {
    constructor() {
        this.messaging = firebase.messaging();

        this.getUserPermission = this.getUserPermission.bind(this);
    }
    
    spawnNotification(theBody,theIcon,theTitle = 'New message') {
        var options = {
            body: theBody,
            icon: theIcon
        }
        var n = new Notification(theTitle,options);
        setTimeout(n.close.bind(n), 5000); 
    }

    getUserPermission() {
        Notification.requestPermission().then(function(result) {
        });
    }
}