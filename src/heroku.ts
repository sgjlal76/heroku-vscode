import { getApplicationName } from "./configuration";
import runCommand from "./runCommand";

function open() {
  runCommandWithApp("heroku", "open");
}

function pushContainer() {
  runCommandWithApp("heroku", "container:push", "web");
}

function releaseContainer() {
  runCommandWithApp("heroku", "container:release", "web");
}

function runCommandWithApp(command: string, ...args: string[]) {
  const app = getApplicationName();
  if (app && app !== "") {
    args = args.concat("-a", app);
  }

  runCommand(command, ...args);
}

export { open, pushContainer, releaseContainer};
