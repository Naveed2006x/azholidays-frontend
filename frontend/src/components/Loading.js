import React from 'react';

const Loading = ({ fullScreen = false }) => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...(fullScreen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#f5f5f5',
        zIndex: 9999
      } : {
        padding: '60px 20px',
        minHeight: '400px'
      })
    },
    loader: {
      width: '40px',
      aspectRatio: '1',
      color: '#0e4da1',
      background: 'repeating-conic-gradient(from -47deg, #0000 0deg, currentColor 1deg 91deg, #0000 94deg 180deg)',
      display: 'flex',
      animation: 'l12-0 2s infinite linear'
    }
  };

  return (
    <>
      <style>
        {`
          .loader::before,
          .loader::after {
            content: "";
            flex: 1;
            background: currentColor;
            clip-path: polygon(0 0, 100% 50%, 0 100%);
            animation: l12 1s infinite alternate;
            transform-origin: bottom left;
          }
          
          .loader::after {
            clip-path: polygon(100% 0, 100% 100%, 0 50%);
            transform-origin: top right;
          }
          
          @keyframes l12-0 {
            0%, 49.9% { transform: scaleX(1) }
            50%, 100% { transform: scaleX(-1) }
          }
          
          @keyframes l12 {
            0%, 20% { transform: rotate(0deg) }
            80%, 100% { transform: rotate(-270deg) }
          }
        `}
      </style>
      <div style={styles.container}>
        <div className="loader" style={styles.loader}></div>
      </div>
    </>
  );
};

export default Loading;
