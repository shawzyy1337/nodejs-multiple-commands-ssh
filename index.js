const readline = require('readline');
const SSH = require('simple-ssh');
const server = require('./server.json');

console.log("\n\x1b[36m[+]\x1b[0m Initiating sending to " + server.length + " servers.");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stopExecution = false;

function sendToServers(commands, index) {
  if (index >= server.length || stopExecution) {
    if (stopExecution) {
      console.log("\n\x1b[33m[!]\x1b[0m All Perl processes have been killed. Sending stopped by user.");
    } else {
      console.log("\n\x1b[33m[!]\x1b[0m Sending completed.");
    }
    rl.close();
    return;
  }

  const currentServer = server[index];
  console.log("\n\x1b[35m[-]\x1b[0m Sending commands to server #" + (index + 1) + " (" + currentServer.Host + ")");

  const ssh = new SSH({
    host: currentServer.host,
    port: currentServer.port,
    user: currentServer.user,
    pass: currentServer.password
  });

  ssh.exec(commands, {}).start();

  setTimeout(function () {
    sendToServers(commands, index + 1);
  }, 1000);
}

rl.on('line', (input) => {
  if (input.toLowerCase() === 'stop') {
    stopExecution = true;
    sendToServers('pkill -f perl', 0);
  } else {
    console.log("\n\x1b[36m[*]\x1b[0m The command to be sent is: " + input + "\n");
    sendToServers(input, 0);
  }
});

console.log("\nYou can enter commands to be sent or type 'stop' to kill all Perl processes.\n");