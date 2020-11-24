## Topic

```text
Introduction to State Management:
- Introduction to Redux 
```

In this section we will play with get introduction to the state management with Redux.

Our plan is to implement the flips counter functionality.

![image](assets/task_goal.png)

For the simplicity we will work with the simplified official toolset from the Redux:

https://redux-toolkit.js.org/ 


### Additional reading

Redux core concept quick introduction:

https://redux.js.org/introduction/core-concepts


An example use case for Redux:

https://www.newline.co/fullstack-react/articles/redux-with-mark-erikson/


How does redux work - more advanced explanation:

https://daveceddia.com/how-does-redux-work/

(`dispatch(action) -> reducer -> new state -> re-render`)


`react-redux` introduction:
https://react-redux.js.org/introduction/quick-start


A tutorial with `redux-toolkit`:

https://redux-toolkit.js.org/tutorials/basic-tutorial

`reselect` project for creating selectors:

https://github.com/reduxjs/reselect


### Exercise 1

`Estimated time: 10-15 min`

### Creating store and connecting it to the application

We will work in the project folder with base project:

`ts-bootcamp/src/w-05/state-management-2/base`

Task:

- Connect application with the redux store provider

Wrap the App component:

```tsx
import { Provider } from 'react-redux';
// ...
import { store } from '../../stores/redux/store';

// ...
<Provider store={store}>
</Provider>
```

Create a store object  `ts-bootcamp/src/w-05/state-management-2/solution/src/stores/redux/store.ts`:

```tsx
import {
  configureStore,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  devTools: {
    name: `MemoryCards: ${Date.now()}`,
  },
  reducer: {},
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

To verify everything works:

![image](assets/redux_devtools_empty_store.png)

Install `redux-devtools` extension:

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

And find the `MemoryCards...` instance in the list.

Notes: 

```tsx
devTools: {
  name: `MemoryCards: ${Date.now()}`,
},
```

This lifehack is needed for better identifying of app store in redux-devtools.

### Exercise 2

`Estimated time: 10-15 min`

### Creating actions, creating reducers

Task:

- Extend the initial state with a new field `logs`
- Create `addLog` action to add item to the log
- Create reducer `logger` to handle the created action

Note:

There is a fully working example demo in the `stores/redux/logger` as a hint

Let's first connect the already written reducer:

```tsx
import { loggerReducer } from './logger/loggerReducer';
// ...
export const store = configureStore({
  devTools: {
    name: `MemoryCards: ${Date.now()}`,
  },
  reducer: {
    logger: loggerReducer,
  },
})
```

After enabling the reducer you should see the change in the store:

![image](assets/redux_devtools_store_with_logger.png)

Now "connect" the `PlayingCardsView` component and dispatch the demo action: 

```tsx
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setCreated());
  };
```

As soon as you start interactions with the UI by starting flipping cards you will the 
actions happening and changing the state:

![image](assets/redux_devtools_store_after_actions.png)


### Exercise 3

`Estimated time: 10-15 min`
 
### Creating selectors

Task:

- Create a selector to select the count of items in log and pass it via props  
down to the dump component

An example of connected selector usage: 
```tsx
   import { useSelector } from 'react-redux';
   //...
   const { selectedValue } = useSelector(
    (state: RootState) => ({
      selectedValue: selectorName(state),
    }),
  );
```

### Exercise 4

`Estimated time: 10-15 min`
 
### Testing Redux state

Task:

- Write test for store to check the default values
- Write test for store to check the store after calling addLogs actions

Note:

You could refer to the test file with the test example for the existing component:

`ts-bootcamp/src/w-05/state-management-2/base/src/stores/redux/logger/loggerReducer.test.tsx`

### Exercise 5

`Estimated time: 10-15 min`
 
### Clearing the state

Task:

- As you noticed when new game selected, flips count from previous game is used,
write action to set state for the initial state 
- Write test for store to check it is cleared correctly