import { DomWatcher } from './dom-watcher';
import { Renderer } from './renderer';

export class Bootstrapper {
    public bootstrapApp(components: any[]) {
        const renderer = Renderer.Instance;
        renderer.components = components;
        renderer.renderComponents(components)
        new DomWatcher().watch();
    }
}