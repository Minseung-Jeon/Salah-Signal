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