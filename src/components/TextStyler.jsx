import React from 'react';

const icons = {
    alignLeft: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>,
    alignCenter: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>,
    alignRight: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>,
}

const TextStyler = ({ text, onUpdate, onDelete }) => {
    
    const handleStyleChange = (prop, value) => {
        onUpdate({
            ...text,
            [prop]: value
        });
    }

    const handleKeyDown = (e) => {
        // Stop the keydown event from bubbling up to the window,
        // which prevents the global 'delete' handler from firing
        // while typing in the input.
        e.stopPropagation();
    }

    return (
        <div className="flex items-center gap-2 w-full">
            <input
                type="text"
                value={text.text}
                onChange={(e) => handleStyleChange('text', e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-brand-purple border-2 border-brand-yellow rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                autoFocus
            />
            <div className="flex items-center bg-brand-purple/50 rounded-full">
                <label htmlFor="font-size" className="text-sm text-gray-200 pl-3">Size:</label>
                <input
                    id="font-size"
                    type="number"
                    value={text.fontSize}
                    onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value, 10))}
                    className="w-16 bg-transparent p-2 text-center"
                />
            </div>
             <div className="flex items-center bg-brand-purple/50 rounded-full p-1">
                <input
                    id="color"
                    type="color"
                    value={text.fill}
                    onChange={(e) => handleStyleChange('fill', e.target.value)}
                    className="w-8 h-8 bg-transparent border-none cursor-pointer"
                    title="Change text color"
                />
            </div>
            <div className="flex items-center bg-brand-purple/50 rounded-full">
                <button onClick={() => handleStyleChange('align', 'left')} className={`p-2 rounded-l-full ${text.align === 'left' ? 'text-brand-yellow' : 'hover:text-white'}`}>{icons.alignLeft}</button>
                <button onClick={() => handleStyleChange('align', 'center')} className={`p-2 ${text.align === 'center' ? 'text-brand-yellow' : 'hover:text-white'}`}>{icons.alignCenter}</button>
                <button onClick={() => handleStyleChange('align', 'right')} className={`p-2 rounded-r-full ${text.align === 'right' ? 'text-brand-yellow' : 'hover:text-white'}`}>{icons.alignRight}</button>
            </div>
            <button onClick={onDelete} className="p-2 text-red-500 hover:text-red-400 bg-brand-purple/50 rounded-full">{icons.delete}</button>
        </div>
    )
}

export default TextStyler; 