
export class BaseComponent {

    private selector: string;
    private template: string = '';

    constructor(selector: string, template?: string) {
        this.selector = selector;

        if(template) {
            this.template = template;
        }
    }

    public render(): void {
        if(this.selector) {
            const componentsInDOM = document.getElementsByTagName(this.selector);

            for(let i = 0, n = componentsInDOM.length; i < n; i++) {
                const element: HTMLElement = <HTMLElement>componentsInDOM.item(i);
                if(element && this.template) {
                    element.innerHTML = this.template;
                }
            }
        }
    }
}