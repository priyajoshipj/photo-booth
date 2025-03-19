import React from 'react';
import styles from './Camera.module.css';

const Camera = ({ videoRef, canvasRef, countdown }) => {
    return (
        <div className={styles.cameraContainer}>
            <video
                ref={videoRef}
                className={styles.cameraPreview}
                autoPlay
                playsInline
                muted
            />
            <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
                width="640"
                height="480"
            />
            {countdown && (
                <div className={styles.countdown}>{countdown}</div>
            )}
        </div>
    );
};

export default Camera; 