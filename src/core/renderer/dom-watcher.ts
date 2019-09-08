import { Bootstrapper } from './bootstrapper';
import { Renderer } from './renderer';

export class DomWatcher {
  private renderer: Renderer;

  constructor() {
    this.renderer = Renderer.Instance;
  }

  public watch() {
    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        this.renderAddedNode(mutation);
        this.renderer.triggerGlobalChanges(this.renderer.mapChanges(mutation));
      });
    });

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true,
    });
  }

  private renderAddedNode(mutation: MutationRecord) {
    const lastAddedNode: HTMLElement = mutation.addedNodes[mutation.addedNodes.length - 1] as HTMLElement;
    if (lastAddedNode && lastAddedNode.tagName) {
      const addedSelector = lastAddedNode.tagName.toLowerCase();
      this.renderer.renderComponentBySelector(addedSelector, true);
    }
  }
}
