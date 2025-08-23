// src/components/PhaserGame.js
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const PhaserGame = () => {
  const phaserRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: phaserRef.current,
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('sky', 'path/to/sky.png');
    }

    function create() {
      this.add.image(400, 300, 'sky');
    }

    function update() {}

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={phaserRef} />;
};

export default PhaserGame;
