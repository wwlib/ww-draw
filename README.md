### ww-draw - a time-based drawing capture and replay library

ww-draw is a time-based drawing library for capturing and replaying multi-layered, multi-author drawings - as they were drawn. Included is a json file format for storing captured data.

- [https://wwlib.github.io/ww-draw/](https://wwlib.github.io/ww-draw/)
- [https://github.com/wwlib/ww-draw/](https://github.com/wwlib/ww-draw/)

### using ww-draw
`npm install ww-draw pixi.js jsonfile`

`import * as WwDraw from 'ww-draw';`

see: [https://github.com/wwlib/ww-draw-example/](https://github.com/wwlib/ww-draw-exampe/)


### building the library and examples

`npm install -g electron` (required to run the examples)

`npm install -g webpack` (required to build the library and examples)

`npm run build`

`npm run build:example`

`npm run build:example:capture`

`npm run build:example:canvas`

`npm run build:example:docs`

`cd electron`


#### PixiJs replay
- a pixijs demo of drawing replay, use:
- `electron index.js`

#### PixiJs capture
- a pixijs demo of drawing capture & replay, use:
- `electron index-capture.js`

#### Canvas replay
- a canvas-based demo of drawing replay, use:
- `electron index-canvas.js`
