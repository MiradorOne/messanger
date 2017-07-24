import moment from 'moment';

export const detectTime = (timestamp) => {
    const minutesFromTimestamp = +moment(timestamp).startOf('minute').fromNow().slice(0, 2);

    if (typeof timestamp === 'string' || typeof timestamp === 'number') {
        if (minutesFromTimestamp <= 30) {
            return moment(timestamp).startOf('minute').fromNow();
        } else if (isNaN(minutesFromTimestamp)) {
            return 'less then minute ago';
        } else if (minutesFromTimestamp > 30 && minutesFromTimestamp <= 1440) {
            return moment(timestamp).format('LT');
        } else {
            moment(timestamp).format('lll')
        }
    } else {
        return null
    }
};

