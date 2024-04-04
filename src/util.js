export function formatDateTime(timestamp) {
    const date = new Date(timestamp*1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
}


export function formatDateTimeChart(timestamp) {
    const date = new Date(timestamp * 1000);
    const datePart = date.toLocaleString('en-US', { month: 'short', day: '2-digit' });
    const timePart = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    return `${datePart} ${timePart.replace(/:/g, ':')}`;
}

export function filterCards(email, jobArray){
    const tempArray = [];
    for (var i=0; i<jobArray.length; i++){
        if (jobArray[i].user === email){
            tempArray.push(jobArray[i])
        }
    }
    return tempArray;
}