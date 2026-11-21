import React, { useState } from 'react';

export default function Form({ heading, showAlert }) {
  const [text, setText] = useState('');

  const handleChange = (event) => setText(event.target.value);
  const toUpperCase = () => {
    setText(text.toUpperCase());
    showAlert('Text converted to uppercase.');
  };
  const toLowerCase = () => {
    setText(text.toLowerCase());
    showAlert('Text converted to lowercase.');
  };
  const clearText = () => {
    setText('');
    showAlert('Text cleared.');
  };
  const removeExtraSpaces = () => {
    setText(text.split(/\s+/).filter(Boolean).join(' ').trim());
    showAlert('Extra spaces removed.');
  };
  const copyText = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.getElementById('textAnalyzer');
        textarea.select();
        if (!document.execCommand('copy')) {
          throw new Error('Copy command was unsuccessful.');
        }
      }
      showAlert('Text copied to clipboard.');
    } catch {
      showAlert('Could not copy text to clipboard.', 'danger');
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readMinutes = (wordCount * 0.008).toFixed(3);

  return (
    <main>
      <h1>{heading}</h1>
      <textarea
        id="textAnalyzer"
        className="form-control text-analyzer"
        value={text}
        onChange={handleChange}
        aria-label="Text to analyze"
      />
      <div className="action-row" role="group" aria-label="Text actions">
        <button type="button" className="btn btn-primary action-button" onClick={toUpperCase}>Convert to Uppercase</button>
        <button type="button" className="btn btn-primary action-button" onClick={toLowerCase}>Convert to Lowercase</button>
        <button type="button" className="btn btn-primary action-button" onClick={clearText}>Clear Text</button>
        <button type="button" className="btn btn-primary action-button" onClick={copyText}>Copy Text</button>
        <button type="button" className="btn btn-primary action-button" onClick={removeExtraSpaces}>Remove Extra Spaces</button>
      </div>

      <section className="summary">
        <h2>Your text summary</h2>
        <p>{wordCount} words and {text.length} characters</p>
        <p>{readMinutes} Minutes read</p>
      </section>

      <section className="preview">
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : 'Enter text in the textbox above to preview it here'}</p>
      </section>
    </main>
  );
}
