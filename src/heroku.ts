import { getApplicationName } from "./configuration";
import { runCmdWithOutput, runCmdSilently } from "./runCommand";
import { window } from "vscode";

export async function open() {
  try {
    await runForDefaultAppSilently("heroku", "open");
    window.showInformationMessage("Successfully opened website");
  } catch (error) {
    window.showErrorMessage(`unable to run command: ${error}.`);
  }
}

export async function deployContainer() {
  try {
    await runForDefaultApp("heroku", "container:push", "web");
    window.showInformationMessage(
      "Successfully pushed container. Proceeding to release...",
    );

    await runForDefaultAppSilently("heroku", "container:release", "web");
    window.showInformationMessage("Successfully released container");
  } catch (error) {
    window.showErrorMessage(`unable to run command: ${error}.`);
  }
}

export async function pushContainer() {
  try {
    await runForDefaultApp("heroku", "container:push", "web");
    window.showInformationMessage(
      "Successfully pushed container, to release run the 'Release Container' command",
    );
  } catch (error) {
    window.showErrorMessage(`unable to run command: ${error}.`);
  }
}

export async function releaseContainer() {
  try {
    await runForDefaultAppSilently("heroku", "container:release", "web");
    window.showInformationMessage("Successfully released container");
  } catch (error) {
    window.showErrorMessage(`unable to run command: ${error}.`);
  }
}

function runForDefaultApp(command: string, ...args: string[]) {
  return runCmdWithOutput(command, ...withApplicationFlag(args));
}

function runForDefaultAppSilently(command: string, ...args: string[]) {
  return runCmdSilently(command, ...withApplicationFlag(args));
}

function withApplicationFlag(args: string[]) {
  const app = getApplicationName();
  if (app && app !== "") {
    args = args.concat("-a", app);
  }
  return args;
}
