# Vue ChunkLoader

[![Test](https://github.com/hiroiku/vue-chunkloader/workflows/Test/badge.svg?branch=develop)](https://github.com/hiroiku/vue-chunkloader/actions?query=workflow%3ATest)
[![Release](https://github.com/hiroiku/vue-chunkloader/workflows/Release/badge.svg)](https://github.com/hiroiku/vue-chunkloader/actions?query=workflow%3ARelease)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Typically, off-screen images are loaded together, straining the loading of resources needed for the first view and causing a critical delay in the page loading experience.

Vue ChunkLoader speeds up first view rendering by optimizing the order in which images are loaded. Once all the images in the chunk are loaded, the next chunk will be loaded.

It will work best on long vertical pages, such as landing pages.

![Figure 1](https://user-images.githubusercontent.com/13102475/99713335-81e4ce80-2ae7-11eb-84c4-4e1dd8d0b28c.gif)

![Figure 2](https://user-images.githubusercontent.com/13102475/99713362-8e692700-2ae7-11eb-93c4-1899eb4602fd.gif)

![Figure 3](https://user-images.githubusercontent.com/13102475/99713364-8f01bd80-2ae7-11eb-9f44-94166fb4d5df.gif)

## Installation

```sh
npm install vue-chunkloader
```

```ts
import Vue from 'vue';
import VueChunkLoader from 'vue-chunkloader';

Vue.use(VueChunkLoader);
```

## Usage

Specifies the element to be chunked with the `v-chunk` directive. Replace the `src` attribute in the chunk with the `data-src` attribute.

```html
<template>
  <div v-chunk>
    <img data-src="https://picsum.photos/id/0/160" />
    <img data-src="https://picsum.photos/id/1/160" />
    <img data-src="https://picsum.photos/id/2/160" />
    <img data-src="https://picsum.photos/id/3/160" />
  </div>

  <div v-chunk>
    <img data-src="https://picsum.photos/id/4/160" />
    <img data-src="https://picsum.photos/id/5/160" />
    <img data-src="https://picsum.photos/id/6/160" />
    <img data-src="https://picsum.photos/id/7/160" />
  </div>
</template>
```

## Options

```ts
import Vue from 'vue';
import VueChunkLoader from 'vue-chunkloader';

Vue.use(VueChunkLoader, {
  className: 'v-chunk',
  attribute: 'data-src',
});
```

| Property  | Type   | Default  | Description                                           |
| :-------- | :----- | :------- | :---------------------------------------------------- |
| className | String | v-chunk  | Class name to be given to the chunk                   |
| attribute | String | data-src | Custom data attributes to replace the `src` attribute |

## License

This project is licensed under the [MIT](./LICENSE) License.
