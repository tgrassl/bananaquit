<img src="https://i.postimg.cc/RCXsrmv6/bananaquit-logo.png" width="400" alt="Bananaquit"/>

[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com)

Bananaquit is a small and simple component framework using TypeScript/JavaScript.<br/><br/>

## Install 
Install bananaquit using npm:
```javascript
npm install bananaquitjs
```
## Getting started
Create a *main.ts* and *index.html* file. This will be your entry point of your application.
Open the *index.html* file and reference the *main.ts* file:
```html
<html>
    <head>
        <title>Hello World</title>
        <meta charset="utf-8">
    </head>
    <body>
        <script src="main.ts"></script>
    </body>
</html>
```

Inside the *main.ts* file import the Bootstrapper, create a component array and finally bootstrap the application with your components: 

```javascript
import { Bootstrapper } from 'bananaquitjs/core';

const appComponents = []
new Bootstrapper().bootstrapApp(appComponents);
```

*(The Getting Started process will be made easier with the relase of the bananaquit-cli)*
## Components

To create a new component create a new .ts file (e.g. login.component.ts) in your project.
Open it and create a new class e.g. LoginComponent.
*(We recommended to end your component class names with "Component" for a better overview as the application grows).*

Decorate the class with the *@Component* decorator from `bananquitjs/core`.
There set the selector and the template you want your component to use.

```javascript
import { Component } from 'bananaquitjs/core';

@Component({
    selector: 'hello-world-component',
    template: `<div>
            Hello world
        </div>`,
})
export class HelloWorldComponent {

}
```

You can also use an external template file instead of declaring it inline inside the component.
First create a html file e.g. *login.component.html* inside the same folder.
Then replace the template string with the required file.

```javascript
...
@Component({
    ...
    template: require('./hello-world.component.html'),
})
...
```

All that's left is to introduce your components to bananquit.
Open the *main.ts* file we created at the beginning and add your new component to the components array.

```javascript
...
import { HelloWorldComponent } from './app/hello-world/hello-world.component'

const appComponents = [
  HelloWorldComponent
]
...
```
Finally add the selector inside the index.html and you are ready to go.

```html
<body>
  ...
  <hello-world-component></hello-world-component>
  ...
</body>
```

## Lifecycles
Lifecycle | Description | Usage
--- | --- | ---
**OnInit** | Called after component initialization. | Implement the OnInit interface and place your code inside `onInit()`
**AfterRender** | Called after the component was rendered into the DOM. | Implement the AfterRender interface and place your code inside  `afterRender()`
**OnChanges** | Called after every change on the page. | Implement the OnChanges interface and place your code inside `onChanges()`. </br> Use `onChanges(changes)` to work with the `BasicChanges` object.

## TODO
- Improvements
- Component Props
- Enhanced Lifecycles
- CLI to create components, etc.
