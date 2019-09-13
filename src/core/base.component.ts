export class BaseComponent {
  private selector: string;
  private template: string = '';

  constructor(selector: string, template?: string) {
    this.selector = selector;

    if (template) {
      this.template = template;
    }
  }
}
