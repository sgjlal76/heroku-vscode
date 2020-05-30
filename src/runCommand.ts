import { window, workspace } from "vscode";
import { spawn } from "child_process";

export function runCmdSilently(command: string, ...args: string[]): void {
  runCmd(console.log, command, ...args);
}

export function runCmdWithOutput(command: string, ...args: string[]): void {
  const channel = window.createOutputChannel("Heroku Extension");
  channel.show();

  const print = (data: string) => channel.append(data);
  runCmd(print, command, ...args);
}

type PrintFn = (data: string) => void;

function runCmd(print: PrintFn, cmd: string, ...args: string[]): void {
  const dir = getTopLevelDirectory();
  if (!dir) {
    window.showErrorMessage("unable to run command: no workspace open.");
    return;
  }

  const c = spawn(cmd, args, { cwd: dir });

  c.stdout.on("data", (data: any) => {
    print(`${data}`);
  });

  c.stderr.on("data", (data: any) => {
    // Heroku uses stderr for out of band information... which is very spammy.
    // https://devcenter.heroku.com/articles/cli-style-guide#stdout-stderr
    console.log(`${data}`);
  });

  c.on("error", (error: any) => {
    print(`[ERROR] ${error}`);
  });

  c.on("close", (code: number) => {
    if (code === 0) {
      window.showInformationMessage(`command run successfuly`);
    } else {
      window.showWarningMessage(`command finished with code ${code}`);
    }
  });
}

function getTopLevelDirectory(): string | undefined {
  const wsFolders = workspace.workspaceFolders;
  if (!wsFolders || !wsFolders[0]) {
    return;
  }

  return wsFolders[0].uri.fsPath;
}
