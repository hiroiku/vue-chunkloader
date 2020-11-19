import Vue from 'vue';
import { PluginObject } from 'vue/types/umd';
import { ChunkLoader, Options } from './chunk_loader';

const plugin: PluginObject<Options> = {
  install: (vue, options) => {
    const chunkloader = new ChunkLoader(options);

    Vue.directive('chunk', {
      bind: element => {
        element.classList.add(chunkloader.options.className);
      },
      update: () => {
        // TODO: v-if などの動的なレンダリングに対応するために再帰的な変更を検出する
        // chunkloader.insert(element);
      },
      inserted: element => {
        chunkloader.insert(element);
      },
    });
  },
};

export default plugin;
