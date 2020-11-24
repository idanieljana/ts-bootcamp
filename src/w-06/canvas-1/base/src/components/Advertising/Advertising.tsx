import React from 'react';
import randomColor from 'randomcolor';
import { Howl } from 'howler';
import casinoLogo from './assets/starCasino.png';
import AdsMusic from './assets/hypnotoad_with_sound.mp3';

const playAdsSound = (): void => {
  const sound = new Howl({
    src: [
      AdsMusic,
    ],
    volume: 0.2,
    loop: true,
  });
  sound.play();
};

const logo = new Image();
logo.width = 200;
logo.height = 200;
logo.src = casinoLogo;

enum Colors {
  CanvasBackground= '#000333',
  CanvasBorder = '#DCB001',
  CanvasCursor = 'rgba(220, 176, 1, 0.8)',
}

type Params2D = [number, number];

function isWithinArea(areaParams: [Params2D, Params2D, Params2D]): boolean {
  const [[mouseX, mouseY], [areaX, areaY], [width, height]] = areaParams;
  const isValidX = mouseX >= areaX && mouseX <= (areaX + width);
  const isValidY = mouseY >= areaY && mouseY <= (areaY + height);
  return isValidX && isValidY;
}

interface SettingsState {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  buttonFontSize: number;
  mouseX: number;
  mouseY: number;
  logosRandomCoeffs: Params2D[];
}

function generateRandomLogosPositions(): Params2D[] {
  return [
    [Math.random(), Math.random()],
    [Math.random(), Math.random()],
    [Math.random(), Math.random()],
  ];
}

export const Advertising: React.FC = () => {
  const canvasEl = React.useRef<HTMLCanvasElement>(null);

  const [settings, setSettings] = React.useState<SettingsState>({
    borderColor: Colors.CanvasBorder,
    backgroundColor: Colors.CanvasBackground,
    buttonFontSize: 42,
    mouseX: -1,
    mouseY: -1,
    borderWidth: 50,
    logosRandomCoeffs: generateRandomLogosPositions(),
  });

  function drawMousePointer(ctx: CanvasRenderingContext2D, area: [Params2D, Params2D, Params2D]) {
    const [[mouseX, mouseY]] = area;
    if (isWithinArea(area)) {
      ctx.canvas.style.cursor = 'none';
      // ctx.canvas.style.cursor = 'pointer';
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, settings.borderWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = Colors.CanvasCursor;
      ctx.fill();
      ctx.closePath();
    } else {
      ctx.canvas.style.cursor = 'default';
    }
  }
  function drawCanvasArea(ctx: CanvasRenderingContext2D, [width, height]: Params2D) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }
  function drawCanvasAreaBorder(ctx: CanvasRenderingContext2D, [width, height]: Params2D) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width, 0);
    ctx.lineTo(0, 0);
    ctx.lineWidth = settings.borderWidth;
    ctx.strokeStyle = settings.borderColor;
    ctx.stroke();
    ctx.closePath();
  }
  function drawLogo(ctx: CanvasRenderingContext2D, [width, height]: Params2D, [x, y]: Params2D) {
    ctx.drawImage(logo, x, y, width, height);
  }
  // eslint-disable-next-line max-len
  function drawLogos(ctx: CanvasRenderingContext2D, [width, height]: Params2D, coeffs : Params2D[]) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [randomX, randomY] of coeffs) {
      const border = settings.borderWidth;
      const x = border + Math.floor(randomX * (window.innerWidth - width - 2 * border));
      const logosAreaHeight = window.innerHeight * 0.75;
      const y = border + Math.floor(randomY * (logosAreaHeight - height - 2 * border));
      drawLogo(ctx, [width, height], [x, y]);
    }
  }
  function drawRegisterButtonText(ctx: CanvasRenderingContext2D) {
    const text = 'Register'.toUpperCase();
    // Hack to calculate the approximate height
    // https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
    const textHeight = ctx.measureText('M').width;
    ctx.beginPath();
    ctx.font = `bold ${settings.buttonFontSize}px Verdana`;
    ctx.fillStyle = 'white';
    const textWidth = ctx.measureText(text).width;
    const x = (window.innerWidth - textWidth) / 2;
    const logosAreaHeight = window.innerHeight * 0.75;
    const buttonAreaHeight = window.innerHeight * 0.25;
    const y = (logosAreaHeight + (buttonAreaHeight / 2) - textHeight / 2);
    ctx.fillText(text, x, y);
    ctx.closePath();
  }
  // eslint-disable-next-line max-len
  function drawButtonBorder(ctx: CanvasRenderingContext2D, [x, y]: Params2D, [width, height]: Params2D, size: number) {
    ctx.fillStyle = 'gold';
    ctx.fillRect(x - (size), y - (size), width + (size * 2), height + (size * 2));
  }
  // eslint-disable-next-line max-len
  function drawButtonGradient(ctx: CanvasRenderingContext2D, [x, y]: Params2D, [width, height]: Params2D) {
    const gradient = ctx.createLinearGradient(x, y, x * 1.5, y * 1.5);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1, 'white');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, height);
  }
  function drawButton(ctx: CanvasRenderingContext2D): [Params2D, Params2D] {
    const width = 400;
    const height = 80;
    const logosAreaHeight = window.innerHeight * 0.75;
    const buttonAreaHeight = window.innerHeight * 0.25;
    // eslint-disable-next-line max-len
    const y = (logosAreaHeight + (buttonAreaHeight / 2) - (settings.buttonFontSize / 2) - (height / 2));
    const x = (window.innerWidth) / 2 - width / 2;
    const buttonBorderWidthPx = 2;
    drawButtonBorder(ctx, [x, y], [width, height], buttonBorderWidthPx);
    drawButtonGradient(ctx, [x, y], [width, height]);
    return [
      [x, y],
      [width, height],
    ];
  }
  function drawRegisterButton(ctx: CanvasRenderingContext2D): [Params2D, Params2D] {
    const coordsWithSize = drawButton(ctx);
    drawRegisterButtonText(ctx);
    return coordsWithSize;
  }

  function render(ctx: CanvasRenderingContext2D) {
    return () => {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      drawCanvasArea(ctx, [canvasWidth, canvasHeight]);
      drawCanvasAreaBorder(ctx, [canvasWidth, canvasHeight]);
      drawLogos(ctx, [logo.width, logo.height], settings.logosRandomCoeffs);
      const [[buttonX, buttonY], [buttonWidth, buttonHeight]] = drawRegisterButton(ctx);
      drawMousePointer(ctx, [
        [settings.mouseX, settings.mouseY],
        [buttonX, buttonY],
        [buttonWidth, buttonHeight],
      ]);
    };
  }

  /**
   * Play music
   */
  React.useEffect(() => {
    playAdsSound();
  }, []);

  /**
   * Draw context
   */
  React.useEffect(() => {
    const ctx = canvasEl.current?.getContext('2d')!;
    const frameId = window.requestAnimationFrame(render(ctx));
    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [settings]);

  /**
   * Add border animation
   */
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setSettings((state) => {
        const color = randomColor();
        return {
          ...state,
          borderColor: color,
        };
      });
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  /**
   * Track mouse moves
   */
  React.useEffect(() => {
    canvasEl.current!.onmousemove = (event) => {
      setSettings((state) => ({
        ...state,
        mouseX: event.offsetX,
        mouseY: event.offsetY,
      }));
    };
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
    <canvas ref={canvasEl} id="canvas" />
  );
};
