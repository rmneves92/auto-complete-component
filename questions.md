### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

PureComponent is similar to React.memo() but used in class components. It's an extension of Component and is a type of component that re-renders only when props change. If the new props are still the same, React reuses the memoized result and skips unnecessary re-rendering. It's good to improve the performance of an application.
PureComponent performs a shallow comparison to check the previous and next props. If the props have complex data structures, React might not detect deep changes and will not perform the re-render correctly.

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

The method ShouldComponentUpdate does a shallow comparison of props and state, but it doesn't include the context. We should not depend on context values inside the shouldComponentUpdate method. In other words, ShouldComponentUpdate can't access the context to perform a diff and decide whether the component should update or not.

### 3. Describe 3 ways to pass information from a component to its PARENT.

We can pass a callback function via props to a child component. In this way, the child component can call the callback function and pass arguments to communicate with its parent.

Another approach is to use the Context API. If both the parent and child components are consumers of the same context, the child component can update the context, allowing data to be passed from the child to the parent component.

Redux can also be utilized for this purpose. By dispatching actions from a child component, we can update the Redux store. If the parent component is connected to the store, it can receive the updated information through selectors.

### 4. Give 2 ways to prevent components from re-rendering.

Using React.memo(), we can prevent a component from re-rendering unnecessarily. When a component is wrapped in this higher-order component (HOC), React will skip re-rendering as long as the props remain the same.
Additionally, React doesn't perform VDOM diff checking for such components.
However, it's important to use this optimization technique wisely. If a component doesn't render often, is small and doesn't re-render with the same props, there's no need to utilize React.memo().

We can also use PureComponent to achieve the same outcome, but with class components. React will perform shallow comparisons and prevent unnecessary re-renders as long as the props and state remain the same.

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

With fragments, we don't add an extra node to the DOM. They are sometimes used to replace the <div> element, which can cause anomalies in code when working with flexbox and grid layouts. Fragments avoid adding unnecessary divs and don't affect the styling.

We can use either <React.Fragment> or <> </> to create fragments, they are similar. It can group elements without introducing an additional DOM node. Behind the scenes, each <>...</> notation actually makes a call to React.createElement.

When rendering a list, it's important to note that fragments can't be assigned unique keys. In such cases, an alternative element should be used to ensure the keys are correctly assigned.

When working with third-party libraries, using fragments might be a problem.
Some libraries may require a specific structure and might not recognize or support fragments, leading to unexpected behavior or errors. It's advisable to check the documentation or compatibility of the library before using fragments.

### 6. Give 3 examples of the HOC pattern.

    1. The function connect of react-redux
    2. withRouter of react-router
    3. React.memo()


    • We can also use HOCs to display a loading state while a component waits for data.
    • We can provide components with specific styles using HOCs.
    • Additionally, there are scenarios where the same prop is needed across multiple components in the application. In such cases, we can create HOCs to wrap these components and create new components with reusable props.

### 7. What's the difference in handling exceptions in promises, callbacks and async...await?

    • Promises: We can handle exceptions in promises with the .catch() method.

    • Callbacks: Exceptions in callbacks need to be handled manually. To handle exceptions, we first need to pass the error as an argument to the callback function and internally handle it using an if statement or a conditional check.

    • Async/await: Handling exceptions in async/await is easier. By simply using try/catch, we can capture errors and exceptions.

### 8. How many arguments does setState take and why is it async?

The setState takes 2 arguments. The first argument can be either an object or a function containing the states you want to change, and the second argument is the callback function.

The first argument is required, and you need to pass the states you want to change. React automatically merges this updated object with the current state, so you don't need to pass all states in this argument. Only include the states you want to change, and they will be merged into the this.state.
It's important to note the race condition when using setState. If the previous state is needed, it's recommended to use a function in the first argument. The function takes the previous state as an argument and returns an object with the new state. This approach is handy for avoiding stale state.

The second argument is optional. It's a callback function that runs after the setState function updates the state with the data passed in the first argument. In other words, React executes the callback function after the new state is applied.

    • React calls setState with the next state.
    • It informs React that the current state needs to be updated with the new state.
    • The state update might not happen immediately.
    • React internally handles batched updates to improve performance.
    • It triggers a re-render.
    • React performs a VDOM diff check and applies the changes to the UI.

The asynchronous behavior of React is the reason we refer to setState as async.

### 9. List the steps needed to migrate a Class to Function Component.

    1. Convert a class component into a function component
    2. Remove the constructor
    3. There's no need to have a render function in functional components. You can simply return the React element directly.
    4. Replace React lifecycle methods like componentDidMount and shouldComponentUpdate with hooks like useEffect.
    5. There's no need to use the this keyword anymore. We can directly access the props in functional components.

### 10. List a few ways styles can be used with components.

We can simply use inline styles. For example:

```
<div style={{ color: 'green', fontSize: '12px' }}>Hello</div>
```

We can also utilize CSS modules. By creating a CSS file and importing it into the component, we can prevent conflicts with other styles. Importing example:

```
import styles from './Component.module.css';
```

Finally, CSS-in-JS libraries such as Styled-components and Emotion are also commonly employed to style components in React.

### 11. How to render an HTML string coming from the server.

If the string is fetched from the backend, we can use the useEffect hook to make the request and store the value into a useState hook. Then, we can use the dangerouslySetInnerHTML attribute to set the inner HTML.

For example:

```
import React, { useState, useEffect } from 'react';

function Component() {
  const [html, setHtml] = useState('');

  useEffect(() => {
     fetch('.../api/html')
      .then(response => response.text())
      .then(setHtml))
      .catch(error => console.error(error));
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: html}}></div>
  );
}
```
