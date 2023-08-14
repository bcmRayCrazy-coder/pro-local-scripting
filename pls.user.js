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

unsafeWindow.startPls = (port) => {
    const socket = io('ws://localhost:' + port, {
        auth: { mapId: unsafeWindow.location.pathname.split('/')[2] },
    });
    console.log('connect', socket);
    socket.emit(
        'fetchDeclaretion',
        core.codeEditorController.serverDeclarations
    );
};
