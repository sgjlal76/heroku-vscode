import { commands, ExtensionContext } from "vscode";
import { requestApplicationName } from "./configuration";
import * as heroku from "./heroku";

// Map<string, function>
const comms: { [k: string]: (...args: any[]) => any } = {
  "heroku-vscode.configure": requestApplicationName,
  "heroku-vscode.openApplication": heroku.open,
  "heroku-vscode.containerPush": heroku.pushContainer,
  "heroku-vscode.containerRelease": heroku.releaseContainer,
  "heroku-vscode.containerDeploy": heroku.deployContainer,
  "heroku-vscode.logs": heroku.tailLogs,
};

export function activate(context: ExtensionContext) {
  for (const k in comms) {
    if (comms.hasOwnProperty(k)) {
      const func = comms[k];
      context.subscriptions.push(commands.registerCommand(k, func));
    }
  }
}

export function deactivate() {}
