import React from 'react';
import randomColor from 'randomcolor';

export const Advertising: React.FC = () => (
  <div style={{ background: randomColor(), width: '100%', height: '100vh' }}>
    Ads
  </div>
);
