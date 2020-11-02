## Topic

```text
Introduction to React:
- Props
- State
- Event handling
- Higher Order Components
- Stateful and Stateless Components
```

### Additional reading

React Hello World:

https://en.reactjs.org/docs/hello-world.html

### React introduction

`Estimated time: 30-45 min`

We will work in `codesandbox`. You will need to fork TS and React sandbox, e.g.:

[TS + React Sandbox](https://codesandbox.io/s/vitali-lashchanka-react-workshop-zyfpw)


### Exercise 1 - React Hello Wold

`Estimated time: 5 min`

Task:
 
Edit `index.tsx` and output hello world message

```js
import * as React from "react";
import { render } from "react-dom";

render(jsxElement, domElement);
```

### Exercise 2 - JSX Introduction

`Estimated time: 5 min`

Couple of words about JSX:

JSX:

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

JSX compiled to JS:

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

For Typescript, then -> TSX. TSX 

Task:
 
Move hello world message to any valid jsx element supported by default:

```jsx
const element = <ANY_JSX_HTML_TAG>Hello, world!</ANY_JSX_HTML_TAG>;
```

### Exercise 3 - Embedding expressions:

`Estimated time: 5 min`

Task:
 
Extend your expression with the parameter name:

```jsx
const element = <ANY_JSX_HTML_TAG>Hello, {YOUR_VARIABLE_NAME}!</ANY_JSX_HTML_TAG>;
```

### Exercise 4 - Embedding expressions:

`Estimated time: 5 min`

Task 1:
 
Extend your expression with the parameter `name`:

```jsx
const element = <ANY_JSX_HTML_TAG>Hello, {YOUR_VARIABLE_NAME}!</ANY_JSX_HTML_TAG>;
```


Task 2:
 
Extend your expression in curly braces to uppercase the `name`

```jsx
const element = <ANY_JSX_HTML_TAG>Hello, {YOUR_VARIABLE_NAME}!</ANY_JSX_HTML_TAG>;
```


### Exercise 5 - Embedding expressions - more complex example:

`Estimated time: 5 min`

Task:
 
Extend your hello js element to have a function call inside js expression:

```jsx
const element = <div>Hello, {format(user)}!</div>;
```

Suggested design:

```tsx
interface User {
    name: "john",
    email: "john@example.com"
}
function formatUser(user: User){ }
```

It should at the end render the following markup:

```html
<div>JOHN(john@example.com)</div>
```

### Exercise 6 - JSX as an expression

`Estimated time: 10-15 min`

Task:
 
Create a function `getGreeting` that will either take a string or a user:

```tsx
<div>{getGreeting("")}</div>
<div>{getGreeting(user)}</div>
```

As the final markup rendered, should be:

```html
<div>j_o_h_n@nhoj</div>
<div>JOHN(john@example.com)</div>
```

Notes:
- Creating Union Type will be helpful here
- Return type for react element could be: `React.ReactElement`


### Exercise 7 - JSX attributes

`Estimated time: 5 min`

Task:
 
Create a `hero` element that will:

```tsx
const hero = <div>
  <img alt={heroName} src={heroAvatar} />
</div>;

//...


<div>{hero}</div>
```

Notes:

Example picture:
![image](https://cdn.flickeringmyth.com/wp-content/uploads/2020/03/chuck-norris-600x389.jpg)
 
Final solution for React Intro:

https://codesandbox.io/s/vitali-lashchanka-greeting-final-fo9zu?file=/src/components/Greeting/Greeting.tsx
