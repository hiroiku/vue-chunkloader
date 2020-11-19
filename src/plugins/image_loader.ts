type EventListener = () => void;

export class ImageLoader {
  private readonly onLoadEventListeners: EventListener[] = [];
  private readonly onErrorEventListeners: EventListener[] = [];
  private readonly elements: HTMLImageElement[];
  private readonly attribute: string;

  /**
   * @param elements
   * @param attribute
   */
  public constructor(elements: HTMLImageElement[], attribute: string) {
    this.elements = elements;
    this.attribute = attribute;
  }

  /**
   * イベントリスナーを登録する
   * @param event
   * @param eventListener
   */
  public addEventListener(event: 'load', eventListener: EventListener): void;
  public addEventListener(event: 'error', eventListener: EventListener): void;
  public addEventListener(event: string, eventListener: EventListener) {
    if (event === 'load') {
      this.onLoadEventListeners.push(eventListener);
    } else if (event === 'error') {
      this.onErrorEventListeners.push(eventListener);
    }
  }

  /**
   * 画像を読み込みイベントリスナーを発火する
   * @todo すべての画像のロードが完了または失敗したときにイベントリスナーを発火させるようにする
   */
  public load() {
    let count = 0;

    this.elements.forEach(image => {
      image.addEventListener('load', () => {
        count++;

        if (this.elements.length === count) {
          this.onLoadEventListeners.forEach(eventListener => eventListener());
        }
      });

      image.addEventListener('error', () => {
        this.onErrorEventListeners.forEach(eventListener => eventListener());
      });

      const src = image.getAttribute(this.attribute);

      if (src) {
        image.src = src;
        image.removeAttribute(this.attribute);
      }
    });
  }
}
