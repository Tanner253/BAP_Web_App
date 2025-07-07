import React from 'react';
import ActionButton from './ActionButton';
import TextStyler from './TextStyler';
import { BsType } from 'react-icons/bs';

const icons = {
    add: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>,
    text: <BsType size={24} />,
    search: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>,
    reset: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1zM8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>,
    copy: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>,
    check: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>,
    upload: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/></svg>,
    loading: <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
}

const ActionBar = ({ onOpenAssets, onAddText, onReset, onCopyToClipboard, copyStatus, onUpdateText, selectedText, onFetchX, onUpload, onDeleteSelected, isFetchingPFP }) => {
    const [xHandle, setXHandle] = React.useState('');

    const handleXFetchClick = () => {
        if(xHandle) onFetchX(xHandle);
    }
    
    return(
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl p-4 z-20">
            <div className="bg-brand-purple/80 backdrop-blur-md p-2 rounded-full flex items-center justify-center space-x-2 shadow-2xl border border-brand-yellow/30">
                {selectedText ? (
                     <TextStyler text={selectedText} onUpdate={onUpdateText} onDelete={onDeleteSelected} />
                ) : (
                    <>
                        <ActionButton onClick={onOpenAssets} tooltip="Add asset from library">{icons.add}</ActionButton>
                        <ActionButton onClick={onUpload} tooltip="Upload your own image">{icons.upload}</ActionButton>
                        <ActionButton onClick={onAddText} tooltip="Add text">{icons.text}</ActionButton>
                        <div className="relative group flex items-center bg-brand-purple/50 rounded-full">
                           <input 
                                type="text" 
                                value={xHandle}
                                onChange={(e) => setXHandle(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleXFetchClick()}
                                placeholder="X Handle"
                                className="p-3 w-32 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                                disabled={isFetchingPFP}
                            />
                             <button onClick={handleXFetchClick} className="text-white hover:text-brand-yellow p-3" disabled={isFetchingPFP}>
                                {isFetchingPFP ? icons.loading : icons.search}
                             </button>
                             <div className="absolute bottom-full mb-2 w-max bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Find PFP from X
                            </div>
                        </div>
                        <ActionButton onClick={onReset} className="bg-red-600/80 hover:bg-red-500" tooltip="Reset canvas">{icons.reset}</ActionButton>
                    </>
                )}

                <div className="w-px h-8 bg-brand-yellow/30" />
                
                <div className="relative group">
                    <button 
                        onClick={onCopyToClipboard}
                        disabled={copyStatus !== 'idle'}
                        className="bg-brand-yellow hover:bg-yellow-500 text-brand-purple font-bold p-3 rounded-full transition-all transform hover:scale-110 disabled:scale-100 disabled:bg-green-500"
                    >
                         {copyStatus === 'copying' ? icons.loading : (copyStatus === 'copied' ? icons.check : icons.copy)}
                    </button>
                    <div className="absolute bottom-full mb-2 w-max bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {copyStatus === 'copied' ? "Copied to clipboard!" : "Copy to Clipboard"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionBar; 