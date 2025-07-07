import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import all assets
import bonkCatSlap from '/assets/bonk-cat-slap.gif';
import carAttack from '/assets/car-attack.gif';
import catBeatdown from '/assets/cat-beatdown.gif';
import catKitty from '/assets/cat-kitty.gif';
import catMeme from '/assets/cat-meme.gif';
import mochiMochi from '/assets/mochi-mochi-peach-cat-tap-butt.gif';
import sadHotGirl from '/assets/sadhotgirl.gif';
import slapDog from '/assets/slap-dog.gif';
import violenceCatSpeed from '/assets/violence-cat-speed.gif';

const allAssets = [
  { id: 'bonk-cat-slap', src: bonkCatSlap }, { id: 'car-attack', src: carAttack },
  { id: 'cat-beatdown', src: catBeatdown }, { id: 'cat-kitty', src: catKitty },
  { id: 'cat-meme', src: catMeme }, { id: 'mochi-mochi', src: mochiMochi },
  { id: 'sad-hot-girl', src: sadHotGirl }, { id: 'slap-dog', src: slapDog },
  { id: 'violence-cat-speed', src: violenceCatSpeed },
];

const AssetModal = ({ isOpen, onClose, onSelectBackground, onAddSticker }) => {
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleAssetClick = (asset, event) => {
    setSelectedAsset({
      ...asset,
      position: { x: event.clientX, y: event.clientY }
    });
  };
  
  const handleAction = (action) => {
    if (action === 'bg') {
        onSelectBackground(selectedAsset.src);
    } else if (action === 'sticker') {
        onAddSticker(selectedAsset.src);
    }
    setSelectedAsset(null);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {setSelectedAsset(null); onClose()}}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-30 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-brand-purple border border-brand-yellow/30 rounded-xl p-6 w-full max-w-4xl max-h-[80vh]"
          >
            <h2 className="text-3xl font-display font-bold mb-4 text-brand-yellow text-center">Select an Asset</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto max-h-[65vh] p-1">
              {allAssets.map((asset) => (
                <div key={asset.id} className="relative group">
                  <motion.img
                    src={asset.src}
                    alt={asset.id}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer border-2 border-brand-purple group-hover:border-brand-yellow transition-colors"
                    onClick={(e) => handleAssetClick(asset, e)}
                    layoutId={asset.id}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
             {selectedAsset && (
                 <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="absolute z-40 bg-brand-purple rounded-lg shadow-xl p-2 flex flex-col space-y-2 border border-brand-yellow/30"
                    style={{
                        top: selectedAsset.position.y - 40,
                        left: selectedAsset.position.x - 60,
                    }}
                    onClick={e => e.stopPropagation()}
                 >
                    <button onClick={() => handleAction('bg')} className="w-full text-left px-4 py-2 text-brand-yellow font-display hover:bg-brand-yellow/20 rounded-md transition-colors">Use as BAPground</button>
                    <button onClick={() => handleAction('sticker')} className="w-full text-left px-4 py-2 text-brand-yellow font-display hover:bg-brand-yellow/20 rounded-md transition-colors">Add as Sticker</button>
                 </motion.div>
             )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssetModal; 