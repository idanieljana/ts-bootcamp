## Topic

```text
Introduction to State Management:
- Introduction to Mobx 
```

### Additional reading

Mobx intro:

https://mobx.js.org/README.html

### Exercise 1

`Estimated time: 10-15 min`

### Creating store with observables and connecting components

We will work in the project folder with base project:

`ts-bootcamp/src/w-05/state-management-1/base`

Task:

Create game store observables:
- Create `selectedLevel` which value could be null or type of `Level`
- Create `gameStage` which type is `GameStage` and the initial value is game offer

Create additional field levels and make a list of all possible values in `Level` enum
- Create level field (not a) `Levels` component with store and add it to `App` layout component

"Connect" the `Levels` component with store and add it to `App` layout component, use the levels field there

### Exercise 2

`Estimated time: 10-15 min`

### Creating a component action to change the game stage

Task:

Add a mobx action `startGame` to the store
- it should change the game stage to a `Playing` in store
- it should be triggered when you click on the item in the `Levels` component 
- it should also save the selected level in store 


### Exercise 3

`Estimated time: 10-15 min`
 
### Creating a computed property to control the game layers - GameStarted, PlayingCards

Task:

- Create computed properties `isPlaying` and `isGameOffered`
- Add observable values for playing cards and game offered containers

### Exercise 4

`Estimated time: 10-15 min`
 
### Testing Mobx state

Task:

- Write test for store to check the default values
- Write test for store to check the game stage and level change when game is started
- Write test for store to check the computed properties work as expected on game stage change

### Notes

Understanding Mobx reactivity:

https://mobx.js.org/understanding-reactivity.html
