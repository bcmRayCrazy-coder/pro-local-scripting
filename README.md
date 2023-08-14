# Pro Local Scripting (pls)

Scripting box3 pro code in local

## Install

```bash
git clone https://github.com/bcmRayCrazy-coder/pro-local-scripting.git
cd pro-local-scripting
yarn
```

## Use

```bash
yarn start <scripting dictionary>
```

If you are scripting at /box3/foo/bar, you have to run `yarn start /box3/foo/bar`

## Browser

Install `pls.user.js` GM script to your Tampermonkey  
Join map `https://view.dao3.fun/e/{mapId}` and join in the game  
Press `F12` and open `console`  
Run `startPls(port in your config)`

## Configure

-   Create `pls.json`
-   Copy the json below into `pls.json`

```json
{
    "mapId": "114514eeaaa",
    "port": 6420,
    "entry": "/foo/bar/src/index.js",
    "dist": "/foo/bar/out.js",
    "watch": "/foo/bar/src",
    "beforeBundle": "tsc"
}
```

`mapId` The id of your map (Like <https://dao3.fun/edit/bdb29e0f7060a56dfa1e> belongs to `bdb29e0f7060a56dfa1e`)  
`port` The port server listen. **Please use the same port in browser extension**  
`entry` The code source entry  
`dist` Generated code output  
`watch` If setted, will watch the target dictionary  
`beforeBundle` **(Optional)** If setted, will run the command inside after watch dictionary change and before bundle
