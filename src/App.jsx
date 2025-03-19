import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Camera from './components/Camera';
import PatternSelector from './components/PatternSelector';
import PhotoGrid from './components/PhotoGrid';
import Controls from './components/Controls';
import PrintTemplate from './components/PrintTemplate';
import { useCamera } from './hooks/useCamera';
import styles from './App.module.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState('polaroid');
  const [isPrinting, setIsPrinting] = useState(false);
  const { videoRef, canvasRef } = useCamera();

  const patterns = {
    polaroid: {
      name: 'Polaroid Grid',
      className: styles.polaroidPattern,
      icon: '📸',
    },
    vintage: {
      name: 'Vintage Frames',
      className: styles.vintagePattern,
      icon: '🖼️',
    },
  };

  const capturePhoto = useCallback(() => {
    if (photos.length >= 4) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#FFD700';
    context.lineWidth = 10;
    context.strokeRect(0, 0, canvas.width, canvas.height);

    const photoData = canvas.toDataURL('image/jpeg');
    setPhotos((prev) => [...prev, photoData]);
  }, [photos.length, videoRef, canvasRef]);

  const startCountdown = useCallback(() => {
    let count = 3;
    setCountdown(count);

    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);

      if (count === 0) {
        clearInterval(countdownInterval);
        capturePhoto();
        setIsCapturing(false);
        setCountdown(null);
      }
    }, 1000);
  }, [capturePhoto]);

  const startPhotoSequence = useCallback(() => {
    setIsCapturing(true);
    setPhotos([]);
    let photosTaken = 0;

    const takeNextPhoto = () => {
      if (photosTaken >= 4) {
        setIsCapturing(false);
        setCountdown(null);
        return;
      }

      startCountdown();
      photosTaken++;
      setTimeout(takeNextPhoto, 4000);
    };

    takeNextPhoto();
  }, [startCountdown]);

  const handlePrint = useCallback(() => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  }, []);

  const handleReset = useCallback(() => {
    setPhotos([]);
    setIsCapturing(false);
    setCountdown(null);
  }, []);

  return (
    <>
      <div className={styles.photoBooth}>
        <h1 className={styles.title}>Photo Booth Collage</h1>

        <div className={styles.mainContainer}>
          <div className={styles.leftSection}>
            <PatternSelector
              patterns={patterns}
              selectedPattern={selectedPattern}
              setSelectedPattern={setSelectedPattern}
              isDisabled={isCapturing || photos.length > 0}
            />

            <Camera
              videoRef={videoRef}
              canvasRef={canvasRef}
              countdown={countdown}
            />

            <Controls
              isCapturing={isCapturing}
              photos={photos}
              onStartCapture={startPhotoSequence}
              onPrint={handlePrint}
              onReset={handleReset}
            />
          </div>

          <div className={styles.rightSection}>
            <PhotoGrid
              photos={photos}
              selectedPattern={selectedPattern}
              patterns={patterns}
            />
          </div>
        </div>
      </div>

      {isPrinting &&
        createPortal(<PrintTemplate photos={photos} />, document.body)}
    </>
  );
}

export default App;
