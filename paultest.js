 function recursiveFunction() {
    // Your code here
    console.log("HelloWorld")
    let str_num = "55"
    console.log(str_num)
    console.log(typeof(str_num))
    console.log(Number(str_num))
    console.log(typeof(Number(str_num)))
    // Get the current date and time
    const currentDate = new Date();

    // Extract the current hour
    const currentHour = currentDate.getHours();

    // Extract the current minute
    const currentMinute = currentDate.getMinutes();

    console.log(`Current Hour: ${currentHour}`);
    console.log(typeof(currentHour))

    console.log(`Current Minute: ${currentMinute}`);

    // Call the function itself after 5 seconds
    setTimeout(recursiveFunction, 5000); // 5000 milliseconds = 5 seconds
  }
  
  // Start the recursive function initially
  recursiveFunction();   
  // Replace 'prayerTime' with the actual time of the prayer in HH:MM format
const prayerTime = '12:30';

// Convert the prayer time to hours and minutes
const [prayerHour, prayerMinute] = prayerTime.split(':').map(Number);

// Calculate the end time 15 minutes after the prayer time
const endHour = prayerHour + Math.floor((prayerMinute + 15) / 60);
const endMinute = (prayerMinute + 15) % 60;

// Set up the end time in HH:MM format
const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

console.log(`Prayer Time: ${prayerTime}`);
console.log(`End Time: ${endTime}`);
