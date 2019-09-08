import { BasicChanges, COMPONENT_DATA, ComponentData, ComponentFactory } from '../../core';

export class Renderer {
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private static _instance: Renderer;
  public components: any[] = [];
  public renderedComponents: any[] = [];
  public selectorComponentsMap: any = {};

  public renderComponents(components: any[]) {
    for (let i = 0, n = components.length; i < n; i++) {
      this.renderComponent(components[i], true);
    }
  }

  public renderComponent(componentToRender: any, canTriggerChanges: boolean) {
    const componentData: ComponentData = this.getComponentData(componentToRender);
    const component = new ComponentFactory().createComponent(componentData);
    this.selectorComponentsMap[componentData.selector] = componentToRender;

    if (component) {
      component.render();
      this.renderedComponents.push(componentToRender);

      if (componentData.meta.baseClass.afterRenderInit) {
        componentData.meta.baseClass.afterRenderInit();
      }

      this.triggerChanges(componentData, canTriggerChanges);
    }
  }

  public renderComponentBySelector(selector: string, canTriggerChanges: boolean) {
    const componentToRender = this.selectorComponentsMap[selector];
    if (componentToRender) {
      this.renderComponent(componentToRender, canTriggerChanges);
    }
  }

  public triggerGlobalChanges(changes: BasicChanges) {
    this.renderedComponents.forEach(component => {
      const data = this.getComponentData(component);
      this.triggerChanges(data, true, changes);
    });
  }

  public mapChanges(mutation: MutationRecord): BasicChanges {
    return {
      type: mutation.type,
      change: mutation,
    };
  }

  private getComponentData(component: any): ComponentData {
    return Reflect.getMetadata(COMPONENT_DATA, component);
  }

  private triggerChanges(componentData: ComponentData, canTrigger: boolean = true, changes?: BasicChanges) {
    if (canTrigger) {
      if (componentData.meta.baseClass.onChanges) {
        componentData.meta.baseClass.onChanges(changes);
      }
    }
  }
}
