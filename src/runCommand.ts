import { window, workspace } from "vscode";
import { spawn } from "child_process";

function runCmdSilently(cmd: string, ...args: string[]) {
  return runCmd(console.log, cmd, ...args);
}

function runCmdWithOutput(cmd: string, ...args: string[]) {
  const channel = window.createOutputChannel("Heroku Extension");
  channel.show();

  const print = (data: string) => channel.append(data);
  return runCmd(print, cmd, ...args);
}

type PrintFn = (data: string) => void;

function runCmd(print: PrintFn, cmd: string, ...args: string[]) {
  return new Promise<string>((resolve, reject) => {
    const dir = getTopLevelDirectory();
    if (!dir) {
      reject("no workspace open");
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
        resolve("command run successfuly");
      } else {
        reject(`command finished with code ${code}`);
      }
    });
  });
}

function getTopLevelDirectory(): string | undefined {
  const wsFolders = workspace.workspaceFolders;
  if (!wsFolders || !wsFolders[0]) {
    return;
  }

  return wsFolders[0].uri.fsPath;
}

export { runCmdSilently, runCmdWithOutput };
