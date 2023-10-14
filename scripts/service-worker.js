function showSalahSignalNotification() {
    chrome.notifications.create({
        type:'basic',
        iconUrl:'icon-32.png',
        title: 'Time to Pray!',
        message: '[something here idk]', // FILL THIS IN

    })
}