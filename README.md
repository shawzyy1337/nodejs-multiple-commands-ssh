# Node.js Multiple Commands SSH

A Node.js script to execute multiple commands over SSH connections to multiple servers.

This script allows you to send commands to multiple servers specified in a JSON file. It establishes SSH connections to each server and executes the provided commands. You can send multiple commands sequentially, and there is also an option to stop the execution and kill all Perl processes.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nodejs-multiple-commands-ssh.git

2. Install the dependencies:
   ```bash
   npm install
3. Create the `server.json` file based on the provided `server.json.example` file. Add the details of the servers you want to connect to, including the host, port, username, and password.
4. Run the script:
   ```bash
   node index.js
5. Enter the commands you want to send to the servers. You can send multiple commands sequentially.

6. To stop the execution and kill all Perl processes on the servers, type `stop` in the command prompt.

**Note:** Exercise caution when using the command to kill Perl processes (`pkill -f perl`) as it can have serious consequences.

## Server Configuration (server.json)

The `server.json` file contains an array of server objects. Each object represents a server and should include the following properties:

- `host`: IP address or hostname of the server.
- `port`: SSH port of the server.
- `user`: Username for SSH authentication.
- `password`: Password for SSH authentication.

Ensure that the `server.json` file is properly configured before running the script.

## License

This project is licensed under the MIT License.
