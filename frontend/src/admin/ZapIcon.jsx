import React from 'react';
import styled, { keyframes } from 'styled-components';

// Definisikan animasi warna yang berjalan dari atas ke bawah
const lightningAnimation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
`;

// Styled component untuk ikon petir dengan efek warna animasi
const AnimatedZapIcon = styled.i`
  font-size: 100px;
  color: transparent;
  background: linear-gradient(
  to bottom,
  #00008B, /* Biru tua di atas */
  #1E90FF  /* Biru muda di bawah */
);

  background-size: 100% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${lightningAnimation} 2s linear infinite;
  display: inline-block;

  margin : 0.2rem 0.5rem 0 2rem;
  line-height: 1;
  font-family: 'Feather', sans-serif; /* Pastikan font Feather digunakan */
`;

function ZapIcon() {
  return (
    <div style={{ textAlign: 'center' }}>
      <AnimatedZapIcon className="feather feather-zap font-xxl" />
    </div>
  );
}

export default ZapIcon;
