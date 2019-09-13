import { BasicChanges, COMPONENT_DATA, ComponentData, ComponentFactory } from '../../core';
import { bindEventListener, getAttributesOfNode, getTemplateBinding } from '../binding/binder';
import { setPropertyDescriptor } from './change-detection';

// TODO remake this class and switch to virtual-dom
export class Renderer {
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private static _instance: Renderer;
  public components: any[] = [];
  public renderedComponents: any[] = [];
  private selectorComponentsMap: any = {};
  private componentWithListeners: any[] = [];
  private dirtyComponents: any[] = [];

  public renderComponents(components: any[]) {
    for (let i = 0, n = components.length; i < n; i++) {
      this.renderComponent(components[i], true);
    }
  }

  public updateComponent(node, componentToUpdate: any, componentData: any) {
    if (this.dirtyComponents.includes(componentToUpdate)) {
      const template = componentData.template;
      const valueMap = componentToUpdate;

      Object.assign(valueMap, getAttributesOfNode(node));

      const newTemplate = getTemplateBinding(template, valueMap);
      componentToUpdate.innerHTML = newTemplate;
      const diretyCompIndex = this.dirtyComponents.indexOf(componentToUpdate);
      this.dirtyComponents.splice(diretyCompIndex, 1);
    }
  }

  public renderComponent(componentToRender: any, canTriggerChanges: boolean) {
    const componentData: ComponentData = this.getComponentData(componentToRender);
    const baseClass = componentData.meta.baseClass;

    if (componentData) {
      const selector = componentData.selector;
      const template = componentData.template;

      if (selector) {
        const componentsInDOM = document.getElementsByTagName(selector);

        for (let i = 0, n = componentsInDOM.length; i < n; i++) {
          const element: HTMLElement = componentsInDOM.item(i) as HTMLElement;
          let component;

          if (!this.renderedComponents[i]) {
            component = new ComponentFactory().createComponent(componentData, componentToRender);
            this.selectorComponentsMap[componentData.selector] = componentToRender;
            this.renderedComponents.push(component);
          } else {
            component = this.renderedComponents[i];
          }

          Object.keys(baseClass).forEach(key => {
            setPropertyDescriptor(baseClass, key, () => this.updateComponent(element, component, componentData));
          });

          Object.assign(component, getAttributesOfNode(element));

          const newTemplate = getTemplateBinding(template, component);
          element.innerHTML = newTemplate;

          if (!this.componentWithListeners.includes(i)) {
            bindEventListener(element, template, baseClass);
            this.componentWithListeners.push(i);
          }
        }
      }

      this.renderedComponents.push(componentToRender);

      if (componentData.meta.baseClass.afterRender) {
        componentData.meta.baseClass.afterRender();
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
