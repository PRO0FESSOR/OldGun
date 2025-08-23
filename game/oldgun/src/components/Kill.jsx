import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";

const Kill = () => {
  const phaserRef = useRef(null);
  const gameRef = useRef(null);
  const playerRef = useRef([]);
  const boundaryGraphicsRef = useRef(null);
  const boundaryVisibleRef = useRef(false);
  const boundaryCenterRef = useRef({ x: 0, y: 0 });
  const boundaryRadius = 100;
  const playerRadius = 30;
  const isDraggingRef = useRef(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const selectedPlayerRef = useRef(null);

   // Update the ref whenever the selectedPlayer state changes
   useEffect(() => {
    selectedPlayerRef.current = selectedPlayer;
  }, [selectedPlayer]);

  function deletePlayer(player) {
    if (player) {
      player.destroy(); // Remove the player from the scene
      const index = playerRef.current.indexOf(player);
      if (index > -1) {
        playerRef.current.splice(index, 1); // Remove the player from the reference array
      }
    }
  }

  function addPlayer(scene, x, y, color) {
    if (!scene) {
      console.error("Scene is not available");
      return;
    }

    const player = scene.add.graphics({ x, y });
    player.fillStyle(color, 1);
    player.fillCircle(0, 0, playerRadius);
    player.setInteractive(
      new Phaser.Geom.Circle(0, 0, playerRadius),
      Phaser.Geom.Circle.Contains
    );
    playerRef.current.push(player);

    // Set draggable
    scene.input.setDraggable(player);

    // Add event listeners
    player.on("pointerdown", () => {
        
            if (selectedPlayerRef.current === null) {
              setSelectedPlayer(player);
              console.log("Player selected");
            } else {
                if (selectedPlayerRef.current !== player) {
                  // Check if player is within the boundary of the selected player
                  const distance = Phaser.Math.Distance.Between(
                    selectedPlayerRef.current.x,
                    selectedPlayerRef.current.y,
                    player.x,
                    player.y
                  );
                  if (distance <= boundaryRadius) {
                    deletePlayer(player);
                    console.log("Player deleted");
                  } else {
                    console.log("Player is not within the boundary");
                  }
                  // Reset selectedPlayer
                  setSelectedPlayer(null);
                } else {
                  console.log("Cannot delete the selected player");
                }
              }

    //     if(!selectedPlayer)
    //     {
    //         setSelectedPlayer(player);
    //         console.log("player selected")
    //     }
    //     else{
    //         deletePlayer(player);
    //         console.log("player deleted");
    //     }
    // // console.log(selectedPlayer);
    // //   console.log("Player clicked!");

    // //   toggleBoundary(player);
    // // deletePlayer(player);
    });

    return player;
  }

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

  function clearBoundary() {
    const graphics = boundaryGraphicsRef.current;
    if (!graphics) return;
    graphics.clear();
    boundaryVisibleRef.current = false;
  }

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
    };

    gameRef.current = new Phaser.Game(config);

    function preload() {
      console.log("Preloading assets...");
    }

    function create() {
      console.log("Creating scene...");

      this.cameras.main.setBackgroundColor("#242424");

      // Initialize graphics for boundaries
      const graphics = this.add.graphics();
      boundaryGraphicsRef.current = graphics;

      // Add initial players
      addPlayer(this, window.innerWidth / 2, window.innerHeight / 2, 0x0000ff);
      addPlayer(this, window.innerWidth / 4, window.innerHeight / 4, 0xff0000);

      this.input.on("dragstart", (pointer, gameObject) => {
        console.log("Drag started");
        gameObject.setAlpha(0.5);
      });

      this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
        console.log(`Dragging: (${dragX}, ${dragY})`);
        isDraggingRef.current = true;
        if (!boundaryVisibleRef.current) {
          toggleBoundary(gameObject);
        }
        const distance = Phaser.Math.Distance.Between(
          boundaryCenterRef.current.x,
          boundaryCenterRef.current.y,
          dragX,
          dragY
        );
        const maxDistance = boundaryRadius - playerRadius;
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
        console.log("Drag ended");
        gameObject.setAlpha(1);
        if (isDraggingRef.current) {
          clearBoundary();
          isDraggingRef.current = false;
        }
      });
    }

    function update() {}

    return () => {
      console.log("Destroying game...");
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return <div ref={phaserRef} style={{ width: "100%", height: "100%" }} />;
};

export default Kill;
