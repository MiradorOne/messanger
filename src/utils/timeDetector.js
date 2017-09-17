import moment from 'moment';

export const detectTime = (timestamp) => {
    const minutesFromTimestamp = +moment(timestamp).startOf('minute').fromNow().slice(0, 2);

    if (typeof timestamp === 'string' || typeof timestamp === 'number') {
        if (minutesFromTimestamp <= 30) { // Example: 13 min ago

            return moment(timestamp).startOf('minute').fromNow();
            
        } else if (minutesFromTimestamp > 30 && minutesFromTimestamp <= 1440) { // Example: 4:15 PM

            return moment(timestamp).format('LT');

        } else if (isNaN(minutesFromTimestamp)) { // For error timestamp cases (sometimes time is not recognized correctly)

            return moment(timestamp).startOf('minute').fromNow();

        } else { // Example: 3 days ago

            moment(timestamp).format('lll')

        }
    } else {
        return null
    }
};

