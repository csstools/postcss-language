/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as path from 'path';

import { languages, window, commands, workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind, RequestType, Range, TextEdit } from 'vscode-languageclient';
import { activateColorDecorations } from './colorDecorators';

import * as nls from 'vscode-nls';
let localize = nls.loadMessageBundle();

namespace ColorSymbolRequest {
  export const type: RequestType<string, Range[], any, any> = new RequestType('css/colorSymbols');
}

// this method is called when vs code is activated
export function activate(context: ExtensionContext) {

  // The server is implemented in node
  let serverModule = context.asAbsolutePath(path.join('server', 'out', 'postcssServerMain.js'));
  // The debug options for the server
  let debugOptions = { execArgv: ['--nolazy', '--debug=6004'] };

  // If the extension is launch in debug mode the debug server options are use
  // Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    documentSelector: ['postcss'],
    synchronize: {
      configurationSection: ['postcss']
    },
    initializationOptions: {
    }
  };

  // Create the language client and start the client.
  let client = new LanguageClient('postcss', localize('postcssserver.name', 'PostCSS Language Server'), serverOptions, clientOptions);

  let disposable = client.start();
  // Push the disposable to the context's subscriptions so that the
  // client can be deactivated on extension deactivation
  context.subscriptions.push(disposable);

  client.onReady().then(_ => {
    let colorRequestor = (uri: string) => {
      return client.sendRequest(ColorSymbolRequest.type, uri).then(ranges => ranges.map(client.protocol2CodeConverter.asRange));
    };
    let isDecoratorEnabled = (languageId: string) => {
      return workspace.getConfiguration().get<boolean>('css.colorDecorators.enable');
    };
    disposable = activateColorDecorations(colorRequestor, { postcss: true }, isDecoratorEnabled);
    context.subscriptions.push(disposable);
  });

  languages.setLanguageConfiguration('postcss', {
    wordPattern: /(#?-?\d*\.\d\w*%?)|(::?[\w-]*(?=[^,{;]*[,{]))|(([@#.!])?[\w-?]+%?|[@#!.])/g
  });

  commands.registerCommand('_postcss.applyCodeAction', applyCodeAction);

  function applyCodeAction(uri: string, documentVersion: number, edits: TextEdit[]) {
    let textEditor = window.activeTextEditor;
    if (textEditor && textEditor.document.uri.toString() === uri) {
      if (textEditor.document.version !== documentVersion) {
        window.showInformationMessage(`CSS fix is outdated and can't be applied to the document.`);
      }
      textEditor.edit(mutator => {
        for (let edit of edits) {
          mutator.replace(client.protocol2CodeConverter.asRange(edit.range), edit.newText);
        }
      }).then(success => {
        if (!success) {
          window.showErrorMessage('Failed to apply CSS fix to the document. Please consider opening an issue with steps to reproduce.');
        }
      });
    }
  }
}