import React from 'react';
// import randomColor from 'randomcolor';

interface SettingsState {
  backgroundColor: string;
  backgroundColorAlpha: number;
}

type Params2D = [number, number];

export const Advertising: React.FC = () => {
  const [settings, setSettings] = React.useState<SettingsState>({
    backgroundColor: 'rgba(0, 3, 51, 1)',
    backgroundColorAlpha: 1,
  });
  const canvasEl = React.useRef<HTMLCanvasElement>(null);

  function drawCanvasArea(ctx: CanvasRenderingContext2D, [width, height]: Params2D) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  function nextAlpha(value: number) {
    const alphas = [0.9, 0.95, 1];
    const index = alphas.findIndex((v) => v === value);
    const nextIndex = (index + 1) > alphas.length - 1
      ? 0
      : index + 1;
    const nextAlphaValue = alphas[nextIndex];
    return nextAlphaValue;
  }

  React.useEffect(() => {
    const ctx = canvasEl.current?.getContext('2d')!;
    drawCanvasArea(ctx, [window.innerWidth, window.innerHeight]);
  }, [settings]);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setSettings((state) => {
        const a = nextAlpha(state.backgroundColorAlpha);
        // console.log(a);
        return {
          ...state,
          backgroundColorAlpha: a,
          backgroundColor: `rgba(0, 3, 51, ${a})`,
        };
      });
    }, 150);
    return () => window.clearInterval(id);
  }, []);

  return (
    <canvas ref={canvasEl} />
  );
};
