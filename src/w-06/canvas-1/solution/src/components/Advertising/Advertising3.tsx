import React from 'react';
// import randomColor from 'randomcolor';

import casinoLogo from './assets/starCasino.png';

const logo = new Image();
logo.width = 200;
logo.height = 200;
logo.src = casinoLogo;

interface SettingsState {
  backgroundColor: string;
  backgroundColorAlpha: number;
  logosRandomCoeffs: Params2D[];
}

type Params2D = [number, number];

function generateRandomLogosPositions(): Params2D[] {
  return [
    [Math.random(), Math.random()],
    [Math.random(), Math.random()],
    [Math.random(), Math.random()],
  ];
}

export const Advertising: React.FC = () => {
  const [settings, setSettings] = React.useState<SettingsState>({
    backgroundColor: 'rgba(0, 3, 51, 1)',
    backgroundColorAlpha: 1,
    logosRandomCoeffs: generateRandomLogosPositions(),
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

  function drawLogo(ctx: CanvasRenderingContext2D, [width, height]: Params2D, [x, y]: Params2D) {
    ctx.drawImage(logo, x, y, width, height);
  }

  // eslint-disable-next-line max-len
  function drawLogos(ctx: CanvasRenderingContext2D, [width, height]: Params2D, coeffs : Params2D[]) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [randomX, randomY] of coeffs) {
      const x = Math.floor(randomX * (window.innerWidth - width));
      const logosAreaHeight = window.innerHeight * 0.75;
      const y = Math.floor(randomY * (logosAreaHeight - height));
      drawLogo(ctx, [width, height], [x, y]);
    }
  }

  React.useEffect(() => {
    const ctx = canvasEl.current?.getContext('2d')!;
    drawCanvasArea(ctx, [window.innerWidth, window.innerHeight]);
    drawLogos(ctx, [logo.width, logo.height], settings.logosRandomCoeffs);
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

  /**
   * Get logos random coords
   */
  React.useEffect(() => {
    const id = window.setInterval(() => {
      const coeffs = generateRandomLogosPositions();
      setSettings((state) => {
        const existingCoeffs = [
          ...state.logosRandomCoeffs,
        ];
        const randomIndex = Math.floor(Math.random() * existingCoeffs.length - 1) + 1;
        existingCoeffs[randomIndex] = coeffs[randomIndex];
        return {
          ...state,
          logosRandomCoeffs: existingCoeffs,
        };
      });
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <canvas ref={canvasEl} />
  );
};
