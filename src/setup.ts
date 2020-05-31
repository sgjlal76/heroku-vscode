import { window } from "vscode";
import { runCmdSilently } from "./runCommand";
import { execSync } from "child_process";

export default async function setup() {
  if (!herokuCLIExists()) {
    if (isUnix()) {
      installHerokuCLI();
    } else {
      window.showWarningMessage(
        "Please download the Heroku CLI in order to be able to use the extension",
      );
    }
  }
}

async function isUnix() {
  let os: string | null;

  try {
    os = execSync("uname").toString().trim();
  } catch (error) {
    console.log(error);
    return false;
  }

  switch (os) {
    case "Darwin":
    case "Linux":
      return true;
    default:
      return false;
  }
}

async function herokuCLIExists() {
  try {
    await runCmdSilently("heroku", "-v");
    return true;
  } catch (error) {
    return false;
  }
}

function installHerokuCLI() {
  const term = window.createTerminal();
  term.show(false);

  // https://devcenter.heroku.com/articles/heroku-cli#other-installation-methods
  term.sendText("curl https://cli-assets.heroku.com/install.sh | sh");
}
