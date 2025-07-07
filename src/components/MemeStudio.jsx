import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Canvas from './Canvas';
import ActionBar from './ActionBar';
import AssetModal from './AssetModal';
import Header from './Header';
import HireMeModal from './HireMeModal';
import Sparkle from './Sparkle';

const MemeStudio = () => {
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [texts, setTexts] = useState([]);
  const [isAssetModalOpen, setAssetModalOpen] = useState(false);
  const [isHireMeModalOpen, setHireMeModalOpen] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [copyStatus, setCopyStatus] = useState('idle');
  const [isFetchingPFP, setIsFetchingPFP] = useState(false);
  
  const stageRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedObjectId) {
        handleDeleteSelected();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedObjectId]);

  const handleDeleteSelected = () => {
    if (!selectedObjectId) return;
    setTexts(texts.filter(t => t.id !== selectedObjectId));
    setStickers(stickers.filter(s => s.id !== selectedObjectId));
    setSelectedObjectId(null);
  }

  const clearCanvasObjects = () => {
    setStickers([]);
    setTexts([]);
    setSelectedObjectId(null);
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedBackground(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerImageUpload = () => {
    fileInputRef.current.click();
  }

  const handleFetchX = (handle) => {
    // Use an image proxy to bypass CORS issues.
    const imageUrl = `https://images.weserv.nl/?url=unavatar.io/twitter/${handle}`;
    setSelectedBackground(imageUrl);
  }

  const handleReset = () => {
    setSelectedBackground(null);
    clearCanvasObjects();
  }

  const handleAddSticker = (stickerSrc) => {
    setStickers([
        ...stickers,
        {
            src: stickerSrc,
            id: `sticker-${Date.now()}`
        }
    ])
  }

  const handleAddText = () => {
    const newTextId = `text-${Date.now()}`;
    const stage = stageRef.current;
    const centerX = stage ? stage.width() / 2 : 150;
    const centerY = stage ? stage.height() / 2 : 150;

    setTexts([
        ...texts,
        {
            id: newTextId,
            x: centerX,
            y: centerY,
            text: 'BAP!',
            fontSize: 48,
            fontFamily: 'Impact',
            fill: '#FFFFFF',
            draggable: true,
            stroke: 'black',
            strokeWidth: 2,
            align: 'center',
        }
    ]);
    setSelectedObjectId(newTextId);
  }

  const handleUpdateText = (updatedText) => {
    const newTexts = texts.map(t => t.id === updatedText.id ? updatedText : t);
    setTexts(newTexts);
  }
  
  const handleCopyToClipboard = () => {
    const stage = stageRef.current;
    if (!stage || !selectedBackground) {
        alert("Please select a background first!");
        return;
    }
    
    setCopyStatus('copying');
    
    const background = new Image();
    // This is crucial for allowing the canvas to use external images.
    background.crossOrigin = 'Anonymous';

    const finalizeCopy = (imageUrl) => {
        background.src = imageUrl;
        background.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = stage.width();
            canvas.height = stage.height();
            const ctx = canvas.getContext('2d');
            
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            
            const stageCanvas = stage.toCanvas();
            ctx.drawImage(stageCanvas, 0, 0);

            canvas.toBlob(async (blob) => {
                try {
                    const textContent = `Check out the $BAP meme I made on ${window.location.href}`;
                    const textBlob = new Blob([textContent], { type: 'text/plain' });
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            'image/png': blob,
                            'text/plain': textBlob,
                        })
                    ]);
                    setCopyStatus('copied');
                } catch (err) {
                    console.error("Failed to copy image:", err);
                    alert("Sorry, could not copy image to clipboard.");
                    setCopyStatus('idle');
                } finally {
                    setTimeout(() => setCopyStatus('idle'), 2000);
                }
            }, 'image/png');
        };
        background.onerror = () => {
            alert("Could not load the background image for copying.")
            setCopyStatus('idle');
        }
    }

    // If the image is from an external URL, fetch it as a blob to prevent CORS issues.
    if (selectedBackground.startsWith('http')) {
        fetch(selectedBackground)
            .then(res => res.blob())
            .then(blob => {
                const localUrl = URL.createObjectURL(blob);
                finalizeCopy(localUrl);
            })
            .catch(err => {
                console.error("CORS fetch failed:", err);
                alert("Could not copy the image due to a network restriction (CORS).");
                setCopyStatus('idle');
            });
    } else {
        // If it's a local image (data URL from upload), use it directly.
        finalizeCopy(selectedBackground);
    }
  }

  const selectedText = texts.find(t => t.id === selectedObjectId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-purple via-brand-pink to-brand-yellow relative pt-24 overflow-hidden"
    >
        {Array.from({ length: 50 }).map((_, i) => <Sparkle key={i} />)}
        <Header onHireMeClick={() => setHireMeModalOpen(true)} />
        <div ref={canvasContainerRef} className="flex-1 w-full flex items-center justify-center p-4">
             <Canvas 
                containerRef={canvasContainerRef}
                selectedBackground={selectedBackground}
                stickers={stickers}
                texts={texts}
                onUpdateTexts={setTexts}
                stageRef={stageRef}
                onSelectObject={setSelectedObjectId}
                selectedObjectId={selectedObjectId}
            />
        </div>
        <ActionBar
            onOpenAssets={() => setAssetModalOpen(true)}
            onAddText={handleAddText}
            onReset={handleReset}
            onCopyToClipboard={handleCopyToClipboard}
            copyStatus={copyStatus}
            onFetchX={handleFetchX}
            onUpload={triggerImageUpload}
            isFetchingPFP={isFetchingPFP}
            selectedText={selectedText}
            onUpdateText={handleUpdateText}
            onDeleteSelected={handleDeleteSelected}
        />

        <AssetModal
            isOpen={isAssetModalOpen}
            onClose={() => setAssetModalOpen(false)}
            onSelectBackground={(src) => {
                setSelectedBackground(src);
            }}
            onAddSticker={handleAddSticker}
        />
        <HireMeModal isOpen={isHireMeModalOpen} onClose={() => setHireMeModalOpen(false)} />
        <input 
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
        />
    </motion.div>
  );
};

export default MemeStudio; 