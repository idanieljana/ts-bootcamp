import React from 'react';
import styles from './Advertising.pcss';

import brainImage from './assets/brain.png';

const BRAIN_SIZE_PX = 256;
const brainImageLoaded = new Image();
brainImageLoaded.width = BRAIN_SIZE_PX;
brainImageLoaded.height = BRAIN_SIZE_PX;
brainImageLoaded.src = brainImage;

// eslint-disable-next-line max-len
interface CanvasImageParams {
  name: string;
  xTo: number;
  xFrom: number;
  yTo: number;
  yFrom: number;
  frames: number;
  frame: number;
}

export const Advertising: React.FC = () => {
  const canvasEl = React.useRef(null);
  const playAnimation = () => {
    if (canvasEl.current === null) {
      throw new Error('No canvas element');
    }
    const canvas = canvasEl.current! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    const brainName = 'brainImage';
    const brainWidth = BRAIN_SIZE_PX;
    const brainHeight = BRAIN_SIZE_PX;
    const brainPadding = 20;
    const imagesCanvas: Record<string, HTMLCanvasElement> = {};

    function drawCanvas() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    function getX(params: CanvasImageParams) {
      const distance = params.xTo - params.xFrom;
      const steps = params.frames;
      const progress = params.frame;
      return (distance / steps) * progress;
    }

    function getY(params: CanvasImageParams) {
      const distance = params.yTo - params.yFrom;
      const steps = params.frames;
      const progress = params.frame;
      return (distance / steps) * progress;
    }

    function addImage(params: CanvasImageParams) {
      const { name } = params;
      if (imagesCanvas[name] === undefined) {
        imagesCanvas[name] = document.createElement('canvas');
      }
      imagesCanvas[name].width = brainWidth;
      imagesCanvas[name].height = brainHeight;
      const imageCtx = imagesCanvas[name].getContext('2d')!;
      imageCtx.drawImage(brainImageLoaded, 0, 0, brainWidth, brainHeight);
      ctx.drawImage(imagesCanvas[name], getX(params), getY(params));

      if (params.frame < params.frames) {
        // eslint-disable-next-line no-param-reassign
        params.frame += 1;
        window.requestAnimationFrame(drawCanvas);
        window.requestAnimationFrame(addImage.bind(null, params));
      }
    }

    function play() {
      drawCanvas();
      addImage({
        name: brainName,
        frame: 0,
        frames: 100,
        xFrom: brainPadding,
        xTo: canvasWidth - brainWidth - brainPadding,
        yFrom: brainPadding,
        yTo: canvasHeight - brainHeight - brainPadding,
      });
    }

    play();
  };

  React.useEffect(() => {
    playAnimation();
  }, []);
  return (
    <div className={styles.brainFlying}>
      <canvas ref={canvasEl} id="canvas" />
    </div>
  );
};
