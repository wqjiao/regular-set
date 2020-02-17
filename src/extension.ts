// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const REGULARS = require('../assets/REGULARS.js');

// 激活扩展程序时执行
function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "regular-set" is now active!');

	// 多条规则组合，遍历生成多条规则
	REGULARS.forEach(({ title, rule }: { title: string, rule: RegExp, example: string }, index: string) => {
		let disposable = vscode.commands.registerCommand(`extension.rule${index}`, () => {
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				const { selections } = editor;

				editor.edit(editBuilder => {
					selections.forEach(selection => {
						const { start, end } = selection;
						const range = new vscode.Range(start, end);
						editBuilder.replace(range, String(rule));
					});
				});
				// 操作成功时，消息窗口提示
				vscode.window.showInformationMessage(`已插入正则: ${title}`);
			} else {
				// 操作错误时，消息窗口提示
				vscode.window.showWarningMessage('regular-set: 只有在编辑文本的时候才可以使用!');
			}
		});

		context.subscriptions.push(disposable);
	});
}

// 停止扩展程序时执行
function deactivate() {
	vscode.window.showWarningMessage('regular-set: 已关闭!');
}

module.exports = {
	activate,
	deactivate
}
