import { workspace, window, ConfigurationTarget } from "vscode";

const appName = "heroku-vscode.applicationName";

async function requestApplicationName(): Promise<void> {
  const name = await window.showInputBox({
    placeHolder: "application name",
  });

  if (!name || name === "") {
    window.showErrorMessage("Invalid name");
    return;
  }

  try {
    await workspace.getConfiguration().update(
      appName,
      name,
      ConfigurationTarget.Workspace,
    );
  } catch (err) {
    window.showErrorMessage(`error: ${err}`);
  }
}

function getApplicationName(): string | undefined {
  return workspace.getConfiguration().get(appName);
}

export { requestApplicationName, getApplicationName };
