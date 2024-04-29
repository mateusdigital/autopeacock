//----------------------------------------------------------------------------//
//                               *       +                                    //
//                         '                  |                               //
//                     ()    .-.,="``"=.    - o -                             //
//                           '=/_       \     |                               //
//                        *   |  '=._    |                                    //
//                             \     `=./`,        '                          //
//                          .   '=.__.=' `='      *                           //
//                 +                         +                                //
//                      O      *        '       .                             //
//                                                                            //
//  File      : extension.ts                                                  //
//  Project   : autopeacock                                                   //
//  Date      : 2024-04-29                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//----------------------------------------------------------------------------//


//
// Imports
//

// -----------------------------------------------------------------------------
import * as vscode from "vscode";
import * as crypto from "crypto";


//
// Public Functions
//

// -----------------------------------------------------------------------------
export function activate(context: vscode.ExtensionContext)
{
  //
  const command_disposable = vscode.commands.registerCommand("autopeacock.autoSetColor", ()=>{
    _ChangePeacockColor();
  });

  context.subscriptions.push(command_disposable);

  //
  _ChangePeacockColor();
}

// -----------------------------------------------------------------------------
export function deactivate() { }

//
// Private Functions
//

// -----------------------------------------------------------------------------
function _ChangePeacockColor()
{
  const workspace_folders = vscode.workspace.workspaceFolders;
  if(!workspace_folders) {
    return;
  }

  const workspace_folder = workspace_folders[0];
  const workspace_path   = workspace_folder.uri.fsPath;

  const color_to_peacock = _GenerateHash(workspace_path);

  try {
    vscode.commands.executeCommand("peacock.enterColor", color_to_peacock);
    vscode.window.showInformationMessage(`AutoPeacock ${color_to_peacock}`);
  } catch (error) {
    debugger;
  }
}

// -----------------------------------------------------------------------------
function _GenerateHash(input: string) {
    const hash = crypto
      .createHash("sha256")
      .update(input)
      .digest("hex");

    const r = hash[0] + hash[1];
    const g = hash[2] + hash[2];
    const b = hash[3] + hash[4];

    return `#${r}${g}${b}`;
}