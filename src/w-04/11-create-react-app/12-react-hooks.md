## Topic

```text
Introduction to React Hooks:
- Comparison with React class component lifecycle methods
- Using useState hook
- Using useEffect hook
```

### Additional reading

React hooks intro:

https://reactjs.org/docs/hooks-intro.html

### Exercise 1

`Estimated time: 10-15 min`

### Extend counter component

Task:

- Add additional `props` step, it should control the
increment value, e.g. `<Counter initCounter={0} step={100}>`
after 2 clicks will have value `200`.
- Write unit test to cover this case

Note:

Types for testing library are not full, you could upgrade
types with: `yarn add @types/@testing-library__react`

### Exercise 2

`Estimated time: 10-15 min`

### HOC

Task:

Make a container for the counter and move all state logic there


### Exercise 3

`Estimated time: 10-15 min`

### Timer component

Task:

Create a timer class component. `Timer`.

It should be configurable with props `initCount` and it should be by default equal to 1
(use "default props")


### Exercise 4

`Estimated time: 10-15 min`

### Timer component in Counter

Task:

Extend Counter with new method `getTimers()`. It should return a list with size equal to counter of Timer components
and this list should be rendered only when counter value is an odd number.

Your final solution should look something similar to:

![image](assets/counterWithContainer.png)

### Notes


Hooks knowledge base:

https://reactjs.org/docs/hooks-faq.html