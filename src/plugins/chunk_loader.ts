import { ImageLoader } from './image_loader';

export interface Options {
  className: string;
  attribute: string;
}

export class ChunkLoader {
  public readonly options: Options = {
    className: 'v-chunk',
    attribute: 'data-src',
  };
  private readonly chunks: Element[] = [];
  private inProgress = false;

  /**
   * @param options
   */
  public constructor(options?: Options) {
    if (options?.className) {
      this.options.className = options.className;
    }

    if (options?.attribute) {
      this.options.attribute = options.attribute;
    }
  }

  /**
   * チャンクを割り込みつつキューに追加する
   * @param chunk
   */
  public insert(chunk: Element) {
    const chunks: Element[] = [];
    document.body.querySelectorAll(`.${this.options.className}`).forEach(element => chunks.push(element));

    // 追加されたチャンクの次のチャンクを取得する
    const nextChunk = this.chunks[chunks.indexOf(chunk) + 1];

    if (nextChunk === undefined) {
      // 次のチャンクが見つからなければ末尾のチャンクなのでそのままpushする
      this.chunks.push(chunk);
    } else {
      // 次のチャンクが見つかった場合はその一つ前に挿入して割り込む
      const insertIndex = this.chunks.indexOf(nextChunk) - 1;
      this.chunks.splice(insertIndex, 0, chunk);
    }

    this.pick();
  }

  /**
   * 別のチャンクがロード中でなければキューからチャンクを取り出しロードする
   */
  private pick() {
    // チャンクがロード中であれば無視する
    if (this.inProgress) {
      return;
    }

    const chunk = this.chunks.shift();

    if (!chunk) {
      return;
    }

    this.load(chunk);
  }

  /**
   * チャンク内の画像をロードする
   * @param chunk
   */
  private load(chunk: Element) {
    this.inProgress = true;

    const images: HTMLImageElement[] = [];
    if (chunk.tagName === 'IMG') {
      images.push(chunk as HTMLImageElement);
    } else {
      chunk.querySelectorAll<HTMLImageElement>(`img[${this.options.attribute}]`).forEach(image => images.push(image));
    }

    const loader = new ImageLoader(images, this.options.attribute);

    loader.addEventListener('load', () => {
      chunk.classList.add('is-loaded');
      this.inProgress = false;
      this.pick();
    });

    loader.addEventListener('error', () => {
      this.inProgress = false;
      this.pick();
    });

    loader.load();
  }
}
