import { getApplicationName } from "./configuration";
import { runCmdWithOutput, runCmdSilently } from "./runCommand";

export function open() {
  runForDefaultAppSilently("heroku", "open");
}

export function pushContainer() {
  runForDefaultApp("heroku", "container:push", "web");
}

export function releaseContainer() {
  runForDefaultAppSilently("heroku", "container:release", "web");
}

function runForDefaultApp(command: string, ...args: string[]) {
  runCmdWithOutput(command, ...withApplicationFlag(args));
}

function runForDefaultAppSilently(command: string, ...args: string[]) {
  runCmdSilently(command, ...withApplicationFlag(args));
}

function withApplicationFlag(args: string[]) {
  const app = getApplicationName();
  if (app && app !== "") {
    args = args.concat("-a", app);
  }
  return args;
}
