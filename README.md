# Pro Local Scripting (pls)

Scripting box3 pro code in local

> ### After 1.3 pls will check version both configuration and browser!
> Using different versions on different clients together may cause unknown bugs.

## Install

```bash
yarn global add pro-local-scripting
```

## Use

```bash
pls <scripting-dictionary>
```

If you are scripting at /box3/foo/bar, you have to run `pls /box3/foo/bar`

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
    "version": "1.3",
    "mapId": "114514eeaaa",
    "port": 6420,
    "entry": "/foo/bar/src/index.js",
    "dist": "/foo/bar/out.js",
    "watch": "/foo/bar/src",
    "beforeBundle": "tsc",
    "type": "script",
    "banner": "// Pack by Pro Local Scripting",
    "autoFetchDeclare": true
}
```

| Key                | Description                                                                                              | Require | Default  |
| ------------------ | -------------------------------------------------------------------------------------------------------- | ------- | -------- |
| `version`          | Current version                                                                                          | true    |          |
| `mapId`            | The id of your map (Like <https://dao3.fun/edit/bdb29e0f7060a56dfa1e> belongs to `bdb29e0f7060a56dfa1e`) | true    |          |
| `port`             | The port server listen. **Please use the same port in browser extension**                                | true    |          |
| `entry`            | The code source entry                                                                                    | true    |          |
| `dist`             | Generated code output                                                                                    | true    |          |
| `watch`            | If setted, will watch the target dictionary                                                              | true    |          |
| `beforeBundle`     | If setted, will run the command inside after watch dictionary change and before bundle                   | false   | ''       |
| `type`             | Your code is `module` or `script`                                                                        | false   | 'script' |
| `banner`           | The banner at the top of your code                                                                       | false   | ''       |
| `autoFetchDeclare` | Will fetch declare file automatically                                                                    | false   | true     |
