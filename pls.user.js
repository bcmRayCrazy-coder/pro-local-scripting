// ==UserScript==
// @name         Pro Local Scripting
// @version      1.0.0
// @description  在本地编写Pro代码
// @author       bcmray_crazy
// @match        https://view.dao3.fun/e/*
// @icon         https://assets.box3.fun/content/img-blank-2x2.png
// @run-at       document-start
// @grant        unsafeWindow
// @require      https://cdn.socket.io/4.4.1/socket.io.min.js
// ==/UserScript==

let core;
Object.defineProperty(Object.prototype, 'permissionController', {
    get: () => core,
    set(v) {
        core = this.permissionController;
        delete Object.prototype.permissionController;
    },
    configurable: true,
});

function getIndexFileKey() {
    const dict = core.codeEditorController._editorState.fileDict;
    for (const key in dict) {
        if (Object.hasOwnProperty.call(dict, key)) {
            const fileMeta = dict[key];
            if (fileMeta.name == 'index.js') return key;
        }
    }
}

function deleteText(length, offset = 0) {
    core.codeEditorController._deleteText(offset, length);
}

function insertText(text, offset = 0) {
    core.codeEditorController._insertText(offset, text);
}

function setText(file, content) {
    deleteText(file.text.length);
    insertText(content);
}

function changeIndexText(content) {
    setText(
        core.codeEditorController._editorState.fileDict[getIndexFileKey()],
        content,
    );
}

unsafeWindow.startPls = (port) => {
    const socket = io('ws://localhost:' + port, {
        auth: { mapId: unsafeWindow.location.pathname.split('/')[2] },
    });
    console.log('connect', socket);
    socket.emit(
        'fetchDeclaretion',
        core.codeEditorController.serverDeclarations,
    );

    socket.on('change', (content) => {
        changeIndexText(content);
    });
};
