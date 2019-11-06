export default function(beforeTime, afterTime){
    let beforeSeconds = beforeTime.hour * 60 * 60 + beforeTime.min * 60 + beforeTime.second
    let afterSeconds = afterTime.hour * 60 * 60 + afterTime.min * 60 + afterTime.second

    let diffSeconds = afterSeconds - beforeSeconds

    let diffHour = 0
    let diffMin = 0

    diffMin = diffSeconds / 60
    diffSeconds = diffSeconds % 60

    diffHour = diffMin / 60
    diffMin = diffMin % 60

    return {
        hour : parseInt(diffHour),
        min : parseInt(diffMin),
        second : diffSeconds
    }
    console.log(parseInt(diffHour), parseInt(diffMin), diffSeconds);
    
    
}