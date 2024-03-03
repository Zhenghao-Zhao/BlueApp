import React, { useEffect, useRef } from "react";
import { CropParams, FilterParams } from "../constants";

export default function CanvasImage({
  cropParams: {
    sx,
    sy,
    sWidth,
    sHeight,
    dx = 0,
    dy = 0,
    dSize,
    styleSize,
    src,
    image,
  },
  filterParams: {
    brightness = 1,
    contrast = 1,
    saturation = 1,
    sepia = 0,
    grayscale = 0,
  },
}: {
  cropParams: CropParams;
  filterParams: FilterParams;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || (!image && !src)) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.filter = `contrast(${contrast}) brightness(${brightness}) saturate(${saturation}) sepia(${sepia}) grayscale(${grayscale})`;
    if (image) {
      ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dSize, dSize);
    } else if (src) {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dSize, dSize);
      };
      image.src = src;
    }
  }, [image, brightness, contrast, saturation, sepia, grayscale]);

  return (
    <canvas
      ref={canvasRef}
      width={dSize}
      height={dSize}
      style={{ width: styleSize, height: styleSize }}
    />
  );
}