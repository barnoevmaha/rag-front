import { useCallback, useRef, useState } from "react";

export default function Dropzone({ onFileSelected, accept, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = event.dataTransfer.files?.[0];
      if (file) onFileSelected(file);
    },
    [onFileSelected, disabled]
  );

  const handleBrowseClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];
    if (file) onFileSelected(file);
    event.target.value = ""; // allow re-selecting the same file
  };

  return (
    <div
      className={"dropzone" + (isDragging ? " dropzone-active" : "") + (disabled ? " dropzone-disabled" : "")}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <p>Drag &amp; drop a file here</p>
      <p className="dropzone-or">or</p>
      <button type="button" className="btn btn-secondary" onClick={handleBrowseClick} disabled={disabled}>
        Browse files
      </button>
      <input ref={inputRef} type="file" accept={accept} hidden onChange={handleInputChange} />
    </div>
  );
}
