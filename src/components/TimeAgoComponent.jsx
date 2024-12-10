import moment from 'moment';
import React, { useEffect, useState } from 'react'

const TimeAgoComponent = ({timestamp}) => {
    const [timeAgoText, setTimeAgoText] = useState("");
    useEffect(() => {
        console.log(timestamp,"0000")
        const updateTimeAgo = () => { setTimeAgoText(moment(timestamp).fromNow()); };
        updateTimeAgo();
        const interval = setInterval(updateTimeAgo, 1000);
        return () => clearInterval(interval);
    }, [timestamp]);
    return <div>{timeAgoText}</div>;
}

export default TimeAgoComponent