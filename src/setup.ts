import { window } from "vscode";
import { runCmdWithOutput } from "./runCommand";

export default async function setup() {
  if (!herokuCLIExists()) {
    installHerokuCLI();
  }
}

async function herokuCLIExists() {
  try {
    await runCmdWithOutput("heroku", "-v");
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
