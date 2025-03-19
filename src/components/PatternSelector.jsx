import React from 'react';
import styles from './PatternSelector.module.css';

const PatternSelector = ({
  patterns,
  selectedPattern,
  setSelectedPattern,
  isDisabled,
}) => {
  return (
    <div className={styles.patternSelector}>
      {Object.entries(patterns).map(([key, pattern]) => (
        <button
          key={key}
          className={`${styles.patternBtn} ${
            selectedPattern === key ? styles.selected : ''
          }`}
          onClick={() => setSelectedPattern(key)}
          disabled={isDisabled}
        >
          <span className={styles.patternIcon}>{pattern.icon}</span>
          <span className={styles.patternName}>{pattern.name}</span>
        </button>
      ))}
    </div>
  );
};

export default PatternSelector;
