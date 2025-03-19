import React from 'react';
import styles from './Controls.module.css';

const Controls = ({
  isCapturing,
  photos,
  onStartCapture,
  onPrint,
  onReset,
}) => {
  return (
    <div className={styles.controls}>
      <button
        className={styles.captureBtn}
        onClick={onStartCapture}
        disabled={isCapturing || photos.length >= 4}
      >
        {isCapturing ? 'Capturing...' : 'Start Capture'}
      </button>

      <button
        className={styles.printBtn}
        onClick={onPrint}
        disabled={photos.length < 4}
      >
        Print Photos
      </button>

      {photos.length > 0 && (
        <button
          className={styles.resetBtn}
          onClick={onReset}
          disabled={isCapturing}
        >
          Reset Photos
        </button>
      )}
    </div>
  );
};

export default Controls;
