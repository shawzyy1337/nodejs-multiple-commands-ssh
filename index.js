const readline = require('readline');
const SSH = require('simple-ssh');
const server = require('./server.json');

console.log("\x1b[36m[+]\x1b[0m Initiating sending to " + server.length + " servers.");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sendToServers(commands, index) {
  if (index >= server.length) {
    console.log("\n\x1b[33m[!]\x1b[0m Sending completed.");
    rl.close();
    return;
  }

  const currentServer = server[index];
  console.log("\n\x1b[35m[-]\x1b[0m Sending commands to server #" + (index + 1) + " (" + currentServer.Host + ")");

  const ssh = new SSH({
    host: currentServer.Host,
    port: currentServer.Port,
    user: currentServer.User,
    pass: currentServer.Pass
  });

  ssh.exec(commands, {}).start();

  setTimeout(function () {
    sendToServers(commands, index + 1);
  }, 1000);
}

rl.question('Enter the commands to be sent: ', (commands) => {
  console.log("\n\x1b[36m[*]\x1b[0m The commands to be sent are: " + commands + "\n");
  sendToServers(commands, 0);
});
