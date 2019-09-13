import 'reflect-metadata';
import { ComponentData } from '../models/component-data.model';

export const COMPONENT_DATA = 'componentData';

export function Component(componentData: ComponentData) {
  function checkLifecycle(compClass: any): void {
    if (compClass.onInit) {
      compClass.onInit();
    }
  }

  return function registerComponent(target: any) {
    const originalClass = new target();

    checkLifecycle(originalClass);

    componentData.meta = {
      ctor: target,
      baseClass: originalClass,
    };

    if (componentData) {
      Reflect.defineMetadata(COMPONENT_DATA, componentData, target);
    }
  };
}
