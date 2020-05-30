import { window, workspace } from "vscode";
import { spawn } from "child_process";

export default function runCommand(command: string, ...args: string[]): void {
  const channel = window.createOutputChannel("Heroku Extension");
  channel.show();

  const dir = getTopLevelDirectory();
  if (!dir) {
    window.showErrorMessage("unable to run command: no workspace open.");
    return;
  }

  const make = spawn(command, args, { cwd: dir });

  make.stdout.on("data", (data: any) => {
    channel.append(`${data}`);
  });

  make.stderr.on("data", (data: any) => {
    // Heroku uses stderr for out of band information... which is very spammy.
    // https://devcenter.heroku.com/articles/cli-style-guide#stdout-stderr
    console.log(`${data}`);
  });

  make.on("error", (error: any) => {
    channel.append(`[ERROR] ${error}`);
  });

  make.on("close", (code: any) => {
    window.showInformationMessage(`Finished with code ${code}`);
  });
}

function getTopLevelDirectory(): string | undefined {
  const wsFolders = workspace.workspaceFolders;
  if (!wsFolders || !wsFolders[0]) {
    return;
  }

  return wsFolders[0].uri.fsPath;
}
