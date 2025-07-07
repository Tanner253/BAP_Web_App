import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import DraggableSticker from './DraggableSticker';
import DraggableText from './DraggableText';

const Canvas = ({ containerRef, selectedBackground, stickers, texts, onUpdateTexts, stageRef, onSelectObject, selectedObjectId }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const canvasSize = Math.min(width, height) * 0.9;
        setSize({ width: canvasSize, height: canvasSize });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [containerRef]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      onSelectObject(null);
    }
  };

  return (
    <div 
        className="relative shadow-2xl shadow-black/50"
        style={{ width: size.width, height: size.height }}
    >
        {selectedBackground ? (
            <img src={selectedBackground} alt="Meme background" className="absolute top-0 left-0 w-full h-full object-cover rounded-md" />
        ) : (
            <div className="w-full h-full bg-black/40 rounded-md flex items-center justify-center">
                <div className="text-gray-200 text-2xl text-center p-8 font-display">
                    Select a BAPground or upload your own to start!
                </div>
            </div>
        )}
        <div className="absolute top-0 left-0 w-full h-full">
            <Stage 
                width={size.width} 
                height={size.height} 
                ref={stageRef}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
            >
                <Layer>
                    {stickers.map((sticker) => (
                        <DraggableSticker 
                            key={sticker.id}
                            imageUrl={sticker.src}
                            isSelected={sticker.id === selectedObjectId}
                            onSelect={() => {
                                onSelectObject(sticker.id);
                            }}
                        />
                    ))}
                    {texts.map((text, i) => (
                       <DraggableText
                            key={text.id}
                            textProps={text}
                            isSelected={text.id === selectedObjectId}
                            onSelect={() => {
                                onSelectObject(text.id);
                            }}
                            onChange={(newAttrs) => {
                                const newTexts = [...texts];
                                newTexts[i] = newAttrs;
                                onUpdateTexts(newTexts);
                            }}
                             onDragEnd={(e) => {
                                const newTexts = [...texts];
                                newTexts[i] = { ...newTexts[i], x: e.target.x(), y: e.target.y() };
                                onUpdateTexts(newTexts);
                            }}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    </div>
  );
};

export default Canvas; 