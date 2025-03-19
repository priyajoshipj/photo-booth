import React from 'react';
import styles from './PrintTemplate.module.css';

const PrintTemplate = ({ photos }) => {
  return (
    <div className={styles.printTemplate}>
      <div className={styles.photoGrid}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.photoFrame}>
            <img
              src={photo}
              alt={`Printed photo ${index + 1}`}
              className={styles.printedPhoto}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintTemplate;
