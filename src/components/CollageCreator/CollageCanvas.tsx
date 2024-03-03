import React, { useMemo } from "react";
import { ResizableBox } from "react-resizable";
import { Stage, Layer } from "react-konva";
import { CollageCanvasImage } from "./CollageCanvasImage";
import { useCollageCreatorContext } from "./CollageCreatorContext";
import { CanvasContainer } from "./CanvasContainer";

export const CollageCanvas = () => {
  const {
    canvasRef,
    isLoading,
    canvasWidth,
    canvasHeight,
    canvasImages,
    setCanvasWidth,
    setCanvasHeight,
  } = useCollageCreatorContext();

  const setDimensions = (size: { width: number; height: number }) => {
    setCanvasWidth(size.width);
    setCanvasHeight(size.height);
  };

  const canvasImagesSorted = useMemo(() => {
    return [...canvasImages].sort((a, b) => a.zIndex - b.zIndex);
  }, [canvasImages]);

  if (isLoading) {
    return (
      <CanvasContainer>
        <div className="text-lg font-semibold text-white">Loading...</div>
      </CanvasContainer>
    );
  }

  return (
    <CanvasContainer>
      <ResizableBox
        width={canvasWidth + 32}
        height={canvasHeight + 32}
        minConstraints={[64, 64]}
        maxConstraints={[3840, 2160]}
        onResize={(_, { size }) => setDimensions(size)}
        className="bg-gray-800 p-4"
      >
        <Stage ref={canvasRef} width={canvasWidth} height={canvasHeight}>
          <Layer>
            {canvasImagesSorted.map((image) => (
              <CollageCanvasImage key={image.id} image={image} />
            ))}
          </Layer>
        </Stage>
      </ResizableBox>
    </CanvasContainer>
  );
};