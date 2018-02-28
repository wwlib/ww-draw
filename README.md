### ww-draw - a time-based drawing capture and replay library

ww-draw is a time-based drawing library for capturing and replaying multi-layered, multi-author drawings - as they were drawn. Included is a json file format for storing captured data.

### using ww-draw
`npm install ww-draw pixi.js`

`import * as WwDraw from 'ww-draw';`


### building the library and examples

`npm install -g electron` (required for the demos)

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
