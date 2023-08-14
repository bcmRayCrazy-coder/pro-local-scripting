# pro-local-scripting

Scripting box3 pro code in local

## Info

-   pls: true
-   version: 1.0.0

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

## Configure

-   Create `pls.json`
-   Copy the json below into `pls.json`

```json
{
    "version": "1.0.0",
    "mapId": "114514eeaaa",
    "port": 6420
}
```

`version` See the version at [info](https://github.com/bcmRayCrazy-coder/pro-local-scripting/blob/main/README.md#Info)
`mapId` The id of your map (Like <https://dao3.fun/edit/bdb29e0f7060a56dfa1e> belongs to `bdb29e0f7060a56dfa1e`)  
`port` The port server listen. **Please use the same port in browser extension**
