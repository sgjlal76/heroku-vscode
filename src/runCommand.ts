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

    let lastReportedData = "";
    c.stderr.on("data", (data: any) => {
      // Heroku uses stderr for out of band information... which is very spammy.
      // https://devcenter.heroku.com/articles/cli-style-guide#stdout-stderr
      console.log(`${data}`);

      // Keep the last printed data in order to be able to report a
      // recognisable error.
      lastReportedData = `${data}`;
    });

    c.on("error", (error: any) => {
      print(`[ERROR] ${error}`);
    });

    c.on("close", (code: number) => {
      if (code === 0) {
        resolve("command run successfuly");
      } else {
        const errorMessage = toRecognisableError(lastReportedData);
        reject(`finished with code ${code}: ${errorMessage}`);
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

function toRecognisableError(content: string) {
  if (content.includes("Missing required flag")) {
    return "missing default application in configuration. Run 'Heroku: Configure Application'";
  } else if (
    content.includes("couldn't find that app") || content.includes("404")
  ) {
    return "can't find application configured. Reconfigure it with 'Heroku: Configure Application'";
  } else if (content.includes("ENOTFOUND")) {
    return "network unavailable";
  }

  // Not desirable error message, but eventually users will bring it up,
  // enabling us to fix it.
  return content;
}
export { runCmdSilently, runCmdWithOutput };
