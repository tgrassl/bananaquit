import { BaseComponent } from './../base.component';

export class ComponentFactory {

    createComponent(data: any, type?: any): BaseComponent;
  
    public createComponent(data: object, type?: any): BaseComponent | null {
        const component: BaseComponent | null = this.getNewComponent(type, data);
        return component;
    }

    private getNewComponent(type: any, data: any): BaseComponent | null {
        if(data.selector && data.template) {
            if(type) {
                return new type(data.selector, data.template);
            } else {
               return new BaseComponent(data.selector, data.template);
            }
        }

        return null;
    }
}