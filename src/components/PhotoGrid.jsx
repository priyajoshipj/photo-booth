import React from 'react';
import styles from './PhotoGrid.module.css';

const PhotoGrid = ({ photos, selectedPattern, patterns }) => {
  const patternClass = patterns[selectedPattern]?.className || '';

  return (
    <div
      className={`${styles.photoGrid} ${styles[selectedPattern + 'Pattern']}`}
    >
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className={styles.photoFrame}>
          {photos[index] ? (
            <img
              src={photos[index]}
              alt={`Photo ${index + 1}`}
              className={styles.capturedPhoto}
            />
          ) : (
            <div className={styles.emptyFrame}>{index + 1}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
