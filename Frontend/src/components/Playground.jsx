import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { useParams } from 'react-router-dom';
import socket from "../socket";


const Playground = () => {

  // some references to store the value 

  //game ref
  const phaserRef = useRef(null);
  const gameRef = useRef(null);
  //player ref
  const playerRef = useRef({});
  const playerRadius = 30;
  //boundary ref
  const boundaryGraphicsRef = useRef(null);
  const boundaryVisibleRef = useRef(false);
  const boundaryCenterRef = useRef({ x: 0, y: 0 });
  const boundaryRadius = 100;
  // room id
  const { roomId } = useParams();
  // actual id
  let playerId;

  
  // useffect initalised for the socket connection

  useEffect(() => {

    // logging room id
    console.log(`room id is -> ${roomId}`);
    // getting playerid from the last of room id
    playerId = roomId.slice(-1);
    console.log(`actual id is -> player${playerId}`);

    return () => {
      socket.off('connect');
    };
  }, []);

  // add player function 
  function addPlayer(scene, id, x, y, color , who) {

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
    if(who === "client"){
      player.clientId = `player${playerId}`;
    }
    playerRef.current[id] = player; // Store by ID

    //for dragging 
    scene.input.setDraggable(player);

    //click function
    player.on("pointerdown", () => {
      console.log("Player clicked!");
      console.log(player)
      toggleBoundary(player);
    });

    return player;
  }

  //toggle boundary code 

  function toggleBoundary(player) {
    const graphics = boundaryGraphicsRef.current;

    if (!graphics || !player) return;

    if (boundaryVisibleRef.current) {
      graphics.clear();
      boundaryVisibleRef.current = false;
    } else {
      const playerX = player.x;
      const playerY = player.y;

      boundaryCenterRef.current = { x: playerX, y: playerY };

      graphics.lineStyle(3, 0xff0000);
      graphics.strokeCircle(playerX, playerY, boundaryRadius);
      boundaryVisibleRef.current = true;
    }
  }


  // clear boundary code for autoremoval in dragging
  function clearBoundary() {
    const graphics = boundaryGraphicsRef.current;
    if (!graphics) return;
    graphics.clear();
    boundaryVisibleRef.current = false;
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

      //for boundary graphics
      const graphics = this.add.graphics();
      boundaryGraphicsRef.current = graphics;

      // add player - scene , id , width , height , color

      // add all the players 

      // Add opponent players
      for (let i = 0; i < 10; i++) {
        addPlayer(this, i, window.innerWidth / 4 + 100 * i, window.innerHeight / 20, 0x0000ff, "opponent");
      }

      // Add client players
      for (let i = 0; i < 10; i++) {
        addPlayer(this, i + 10, window.innerWidth / 4 + 100 * i, window.innerHeight / 1.05, 0xff0000, "client");
      }     

      // DRAG logic

      //dragstart
      this.input.on("dragstart", (pointer, gameObject) => {
        console.log("drag started")
        gameObject.setAlpha(0.5);
      });

      // drag player
      this.input.on("drag", (pointer, gameObject, dragX, dragY) => {

        console.log(`Dragging: (${dragX}, ${dragY})`);

        // calculation of distance from player to drag point
          const distance = Phaser.Math.Distance.Between(
            boundaryCenterRef.current.x,
            boundaryCenterRef.current.y,
            dragX,
            dragY
          );

          //actual distance where player can move
          const maxDistance = boundaryRadius - playerRadius;

          //logic to set player position after drag
          if (distance <= maxDistance) {
            gameObject.setPosition(dragX, dragY);
          } else {
            const angle = Phaser.Math.Angle.Between(
              boundaryCenterRef.current.x,
              boundaryCenterRef.current.y,
              dragX,
              dragY
            );
            const constrainedX =
              boundaryCenterRef.current.x + maxDistance * Math.cos(angle);
            const constrainedY =
              boundaryCenterRef.current.y + maxDistance * Math.sin(angle);
            gameObject.setPosition(constrainedX, constrainedY);
          }
  
      });

      this.input.on("dragend", (pointer, gameObject) => {
        console.log("dragend")
        gameObject.setAlpha(1);
        clearBoundary();
      });

    }

    //update
    function update() {}

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return (
    <>
    <div ref={phaserRef} style={{ width: "100%", height: "100%" }} />;
    </>
  )
  
};

export default Playground;




