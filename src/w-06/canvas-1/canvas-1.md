## Topic

```text
Introduction to Canvas:
- canvas element
- preparing canvas scene
- adding objects (rectangles, texts)
- animating elements
- interactions with canvas elements (adding click handler)
```

In this section we will get familiar with JS Canvas.

Our plan is to implement a simple `<Advertizing>` component to promote
casino in the shorts ads which is quite commonly used in video players in Web.

![image](assets/canvasResult.png)

### Additional reading

Mozilla Canvas tutorial

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial


### Exercise 1

`Estimated time: 10-15 min`

### Creating canvas

We will work in the project folder with base project:

`ts-bootcamp/src/w-06/canvas-1/base`

Task:

- Create a canvas element and the react component, fill canvas with color

![image](assets/exercise1.png)


Add a canvas element ref:

```tsx
const canvasEl = React.useRef<HTMLCanvasElement>(null);

// ...

return (
    <canvas ref={canvasEl} id="canvas" />
  );
```

Add state to control your canvas settings

```tsx
const [settings, setSettings] = React.useState<SettingsState>({
    backgroundColor: 'rgba(0, 3, 51, 1)',
    backgroundColorAlpha: 1,
  });
```

### Exercise 2

`Estimated time: 10-15 min`

### Blinking background

Your task would be to fill the background and make the animated alpha

Task:

- Create a react effect and change alpha in background using react state for settings:  `rgba(0, 3, 51, ${a})`
- A suggested range of values could be`[0.9, 0.95, 1]`

![image](assets/exercise2.png)


### Exercise 3

`Estimated time: 10-15 min`

### Adding logo image to the canvas

Your task would be to add the logo image to the canvas

Task:

- Import an image from `assets` dir in component folder and render it on canvas

Hint:

```tsx
ctx.drawImage(logo, x, y, width, height)
```

![image](assets/exercise3.png)

### Exercise 4

`Estimated time: 10-15 min`

### Canvas area border

Your task would be to draw the border

Task:

- Create a canvas element and the react component, fill canvas with color

![image](assets/exercise4.png)