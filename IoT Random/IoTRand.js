const { exec } = require('child_process');

let currentTime = new Date(); // Initialize current time to the current date and time

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function getNextHour() {
  const nextHour = new Date(currentTime);
  currentTime.setHours(currentTime.getHours() + 1);
  return nextHour.toISOString();
}

function sendCurlRequest() {
  const roomNum = getRandomInt(1, 20);
  const waterValue = getRandomFloat(0, 50);
  const time = getNextHour(); // Use the incremented time

  const command = `curl -X POST "http://localhost:3000/data" -H "Content-Type: application/json" -d "{\\"roomNum\\":${roomNum}, \\"waterValue\\":${waterValue}, \\"time\\":\\"${time}\\"}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

setInterval(sendCurlRequest, 500); // Adjust the interval to suit your needs
