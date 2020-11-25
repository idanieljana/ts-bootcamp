import React from 'react';
import randomColor from 'randomcolor';

interface SettingsState {
  backgroundColor: string;
}

type Params2D = [number, number];

export const Advertising: React.FC = () => {
  const [settings] = React.useState<SettingsState>({
    backgroundColor: randomColor(),
  });
  const canvasEl = React.useRef<HTMLCanvasElement>(null);

  function drawCanvasArea(ctx: CanvasRenderingContext2D, [width, height]: Params2D) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  React.useEffect(() => {
    const ctx = canvasEl.current?.getContext('2d')!;
    drawCanvasArea(ctx, [window.innerWidth, window.innerHeight]);
  }, []);
  return (
    <canvas ref={canvasEl} />
  );
};
