import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import io from "socket.io-client";

const Playground = () => {

  // some references to store the value 

  const phaserRef = useRef(null);
  const gameRef = useRef(null);
  const playerRef = useRef({});
  const playerRadius = 30;
  const socketRef = useRef(null);

  // useffect initalised for the socket connection

  useEffect(() => {
    socketRef.current = io('http://localhost:8080');

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // add player function 

  function addPlayer(scene, id, x, y, color) {

    //if scene not available
    if (!scene) {
      console.error("Scene is not available");
      return;
    }

    //player creation
    const player = scene.add.graphics({ x, y });
    player.fillStyle(color, 1);
    player.fillCircle(0, 0, playerRadius);
    player.setInteractive(
      new Phaser.Geom.Circle(0, 0, playerRadius),
      Phaser.Geom.Circle.Contains
    );

    //player id creation
    player.id = id;
    playerRef.current[id] = player; // Store by ID

    //click function
    player.on("pointerdown", () => {
      console.log("Player clicked!");
    });

    return player;
  }

  // useffect for phraser

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: phaserRef.current,
      scene: {
        preload,
        create,
        update,
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    //gameref
    gameRef.current = new Phaser.Game(config);

    //preload 
    function preload() {}

    //create function
    function create() {
      this.cameras.main.setBackgroundColor("#242424");
      addPlayer(this, 1 ,  window.innerWidth / 2 , window.innerHeight / 2, 0x0000ff);
    }

    //update
    function update() {}

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return <div ref={phaserRef} style={{ width: "100%", height: "100%" }} />;
};

export default Playground;




