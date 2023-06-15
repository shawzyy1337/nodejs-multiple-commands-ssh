const readline = require("readline");
const SSH = require("simple-ssh");
const server = require("./server.json");

console.log(
  "\n\x1b[36m[+]\x1b[0m Initiating sending to " + server.length + " servers."
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function sendToServers(commands, index, callback) {
  if (index >= server.length) {
    console.log("\n\x1b[33m[!]\x1b[0m Sending completed.\n");
    callback();
    return;
  }

  const currentServer = server[index];
  console.log(
    "\n\x1b[35m[-]\x1b[0m Sending commands to server #" +
      (index + 1) +
      " (" +
      currentServer.host +
      ")"
  );

  const ssh = new SSH({
    host: currentServer.host,
    port: currentServer.port,
    user: currentServer.user,
    pass: currentServer.password,
  });

  ssh.exec(commands, {
    out: function (stdout) {
      console.log("\n\x1b[32m[+] Response from server:\n");
      console.log(stdout);
      console.log("\x1b[0m");
    },
  }).start({
    success: function () {
      setTimeout(function () {
        sendToServers(commands, index + 1, callback);
      }, 1000);
    },
    fail: function (err) {
      console.log("\n\x1b[31m[-] Error executing command:\n");
      console.log(err);
      console.log("\x1b[0m");
      setTimeout(function () {
        sendToServers(commands, index + 1, callback);
      }, 1000);
    },
  });
}

rl.on("line", (input) => {
  if (input.toLowerCase() === "stop") {
    sendToServers("pkill -f perl", 0, function () {
      rl.close();
    });
  } else {
    console.log(
      "\n\x1b[36m[*]\x1b[0m The command to be sent is: " + input + "\n"
    );
    sendToServers(input, 0, function () {
      rl.prompt();
    });
  }
});

console.log(
  "\nYou can enter commands to be sent or type 'stop' to kill all Perl processes.\n"
);
