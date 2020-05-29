import { window } from "vscode";
import { spawn } from "child_process";

export default function runCommand(command: string, ...args: string[]): void {
  const channel = window.createOutputChannel("Heroku Extension");
  channel.show();

  const make = spawn(command, args);

  make.stdout.on("data", (data: any) => {
    channel.append(`${data}`);
  });

  make.stderr.on("data", (data: any) => {
    channel.append(`${data}`);
  });

  make.on("error", (error: any) => {
    channel.append(`${error}`);
  });

  make.on("close", (code: any) => {
    window.showInformationMessage(`Finished with code ${code}`);
  });
}
