import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import io from "socket.io-client";

const Playground = () => {
  const phaserRef = useRef(null);
  const gameRef = useRef(null);
  const playerRef = useRef({});
  const boundaryGraphicsRef = useRef(null);
  const boundaryVisibleRef = useRef(false);
  const boundaryCenterRef = useRef({ x: 0, y: 0 });
  const boundaryRadius = 100;
  const playerRadius = 30;
  const socketRef = useRef(null);
  const clientRef = useRef(null);
  const numberofplayers = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:8080');

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
    });

    socketRef.current.on('assignPlayerId',(id)=>{
      clientRef.current = id;
      console.log("id of a client is = " + id)
    })

    socketRef.current.on('numberofplayers',(data)=>{
      console.log(`number of players - ${data}`);
    })

    

    socketRef.current.on('playerMove', (data) => {
      const player = playerRef.current[data.id];
      if (player) {
        console.log(`Updating player ${data.id} to position (${data.x}, ${data.y})`);
        player.setPosition(data.x, data.y); // Directly update the position
        console.log(playerRef)
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  function addPlayer(scene, id, x, y, color) {
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
    player.id = id;
    player.clientId = clientRef.current;
    playerRef.current[id] = player; // Store by ID

    scene.input.setDraggable(player);

    player.on("pointerdown", () => {
      console.log("Player clicked!");
      toggleBoundary(player);
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
      console.log(player);              
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
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);

    function preload() {}

    function create() {
      this.cameras.main.setBackgroundColor("#242424");
      // Store a reference to this scene
      const scene = this;

      const graphics = this.add.graphics();
      boundaryGraphicsRef.current = graphics;

      // Add initial players

      console.log(`width - ${window.innerWidth} height - ${window.innerHeight}`)

      
       

      let n = numberofplayers.current;

      // //for client bottom

      // for(let i=0;i<3;i++){
      //   addPlayer(this, i+1 , window.innerWidth / 2 + i*100, window.innerHeight / 2, 0x0000ff);
      // }

      // //for client top

      // for(let i=0;i<3;i++){
      //   addPlayer(this, i+4, window.innerWidth /2 + i*100 , window.innerHeight / 4, 0xff0000);  
      // }

      addPlayer(this, 1 , window.innerWidth / 2, window.innerHeight / 2, 0x0000ff);
      addPlayer(this, 2 , window.innerWidth / 4, window.innerHeight / 4, 0x0000ff);

      
      
      

      this.input.on("dragstart", (pointer, gameObject) => {
        gameObject.setAlpha(0.5);
      });

      this.input.on("drag", (pointer, gameObject, dragX, dragY) => {

        if(gameObject.id == clientRef.current)
        {
          console.log("this is your player");

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
  
          socketRef.current.emit('playerMove', {
            id: gameObject.id,
            x: gameObject.x,
            y: gameObject.y
          });
  

        }
        else{
          console.log("this is not your player");
        }
      });

      this.input.on("dragend", (pointer, gameObject) => {
        gameObject.setAlpha(1);
        clearBoundary();
      });
    }

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




// import React, { useEffect, useRef } from "react";
// import Phaser from "phaser";
// import io from "socket.io-client";

// const Playground = () => {
//   const phaserRef = useRef(null);
//   const gameRef = useRef(null);
//   const playerRef = useRef([]);
//   const sceneRef = useRef(null);
//   const boundaryGraphicsRef = useRef(null);
//   const boundaryVisibleRef = useRef(false);
//   const boundaryCenterRef = useRef({ x: 0, y: 0 });
//   const boundaryRadius = 100;
//   const playerRadius = 30;
//   const isDraggingRef = useRef(false);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     socketRef.current = io('http://localhost:8080');

//     socketRef.current.on('connect', () => {
//       console.log('Connected to server');
//     });

//     socketRef.current.on('playerMove', (data) => {
//       console.log("inside socket");
//       const player = playerRef.current.find(p => p.id === data.id);
//       if (player) {
//         console.log(player);
//         console.log(`Updated player data ${data.id} (${data.x}, ${data.y})`);

//         // Destroy the player only if it exists
//         player.destroy();

//         // Clear the player reference after destruction
//         playerRef.current = playerRef.current.filter(p => p.id !== data.id);


//         // console.log("destroying player");
//         // player.destroy();
//         // console.log("player destroyed");
//         // playerRef.current.forEach((player) => {
//         //   player.destroy();
//         // });

//         // playerRef.current = [];

//       }
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, []);

//   // CODE TO ADD THE PLAYER

//   function addPlayer(scene, id, x, y, color) {
//     if (!scene) {
//       console.error("Scene is not available");
//       return;
//     }

//     const player = scene.add.graphics({ x, y });
//     player.fillStyle(color, 1);
//     player.fillCircle(0, 0, playerRadius);
//     player.setInteractive(
//       new Phaser.Geom.Circle(0, 0, playerRadius),
//       Phaser.Geom.Circle.Contains
//     );
//     player.id = id;
//     playerRef.current.push(player);

//     // Set draggable
//     scene.input.setDraggable(player);

//     // Add event listeners
//     player.on("pointerdown", () => {
//       console.log("Player clicked!");
//       console.log(player);
//       toggleBoundary(player);
//     });

//     return player;
//   }

//   //CODE TO TOGGLE THE BOUNDARY

//   function toggleBoundary(player) {
//     const graphics = boundaryGraphicsRef.current;

//     if (!graphics || !player) return;

//     if (boundaryVisibleRef.current) {
//       graphics.clear();
//       boundaryVisibleRef.current = false;
//     } else {
//       const playerX = player.x;
//       const playerY = player.y;

//       boundaryCenterRef.current = { x: playerX, y: playerY };

//       graphics.lineStyle(3, 0xff0000);
//       graphics.strokeCircle(playerX, playerY, boundaryRadius);
//       boundaryVisibleRef.current = true;
//     }
//   }

//   //CODE TO CLEAR THE BOUNDARY

//   function clearBoundary() {
//     const graphics = boundaryGraphicsRef.current;
//     if (!graphics) return;
//     graphics.clear();
//     boundaryVisibleRef.current = false;
//   }

//   useEffect(() => {
//     const config = {
//       type: Phaser.AUTO,
//       width: window.innerWidth,
//       height: window.innerHeight,
//       parent: phaserRef.current,
//       scene: {
//         preload,
//         create,
//         update,
//       },
//       scale: {
//         mode: Phaser.Scale.RESIZE,
//         autoCenter: Phaser.Scale.CENTER_BOTH,
//       },
//     };

//     gameRef.current = new Phaser.Game(config);

//     // PRELOAD FUNCTION

//     function preload() {
//       console.log("Preloading assets...");
//     }

//     //CREATE FUNCTION

//     function create() {
//       console.log("Creating scene...");

//       this.cameras.main.setBackgroundColor("#242424");

//       // Initialize graphics for boundaries
//       const graphics = this.add.graphics();
//       boundaryGraphicsRef.current = graphics;

//       // Add initial players
//       addPlayer(this, 'player1', window.innerWidth / 2, window.innerHeight / 2, 0x0000ff);
//       addPlayer(this, 'player2', window.innerWidth / 4, window.innerHeight / 4, 0xff0000);

//       sceneRef.current = this;

//       this.input.on("dragstart", (pointer, gameObject) => {
//         console.log("Drag started");
//         gameObject.setAlpha(0.5);
//       });

//       this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
//         isDraggingRef.current = true;

//         const distance = Phaser.Math.Distance.Between(
//           boundaryCenterRef.current.x,
//           boundaryCenterRef.current.y,
//           dragX,
//           dragY
//         );
//         const maxDistance = boundaryRadius - playerRadius;
//         if (distance <= maxDistance) {
//           // gameObject.setPosition(dragX, dragY);
//           gameObject.x = dragX;
//           gameObject.y = dragY;
//         } else {
//           const angle = Phaser.Math.Angle.Between(
//             boundaryCenterRef.current.x,
//             boundaryCenterRef.current.y,
//             dragX,
//             dragY
//           );
//           const constrainedX =
//             boundaryCenterRef.current.x + maxDistance * Math.cos(angle);
//           const constrainedY =
//             boundaryCenterRef.current.y + maxDistance * Math.sin(angle);
//           // gameObject.setPosition(constrainedX, constrainedY);
//           gameObject.x = constrainedX;
//           gameObject.y = constrainedY;
//         }

//         const updatedX = gameObject.x;
//         const updatedY = gameObject.y;
//         console.log(`Position: (${updatedX}, ${updatedY})`);

//         socketRef.current.emit('playerMove', {
//           id: gameObject.id,
//           x: updatedX,
//           y: updatedY
//         });
//       });

//       this.input.on("dragend", (pointer, gameObject) => {
//         console.log("Drag ended");
//         gameObject.setAlpha(1);
//         if (isDraggingRef.current) {
//           clearBoundary();
//           isDraggingRef.current = false;
//         }
//       });
//     }

//     function update() {}

//     return () => {
//       console.log("Destroying game...");
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//       }
//     };
//   }, []);

//   return <div ref={phaserRef} style={{ width: "100%", height: "100%" }} />;
// };

// export default Playground;



// // import React, { useEffect, useRef } from "react";
// // import Phaser from "phaser";
// // import io from "socket.io-client";

// // const Playground = () => {
// //   const phaserRef = useRef(null);
// //   const gameRef = useRef(null);
// //   const playerRef = useRef([]);
// //   const boundaryGraphicsRef = useRef(null);
// //   const boundaryVisibleRef = useRef(false);
// //   const boundaryCenterRef = useRef({ x: 0, y: 0 });
// //   const boundaryRadius = 100;
// //   const playerRadius = 30;
// //   const isDraggingRef = useRef(false);
// //   const socketRef = useRef(null);

// //   useEffect(() => {
// //     socketRef.current = io('http://localhost:8080');

// //     socketRef.current.on('connect', () => {
// //       console.log('Connected to server');
// //     });

// //     socketRef.current.on('playerMove', (data) => {
// //       const player = playerRef.current.find(p => p.id === data.id);
// //       console.log(player);
// //       if (player) {
// //         // console.log(`Player ${player.id} old position -> (${player.x}, ${player.y})`);
// //         // console.log(`Player ${data.id} updated position -> (${data.x}, ${data.y})`);
// //         player.setPosition(data.x, data.y);
// //         player.setActive(true);
// //           player.setVisible(true);
// //       }
// //     });

// //     return () => {
// //       socketRef.current.disconnect();
// //     };
// //   }, []);

  
// //   // CODE TO ADD THE PLAYER

// //   function addPlayer(scene, id, x, y, color) {
// //     if (!scene) {
// //       console.error("Scene is not available");
// //       return;
// //     }

// //     const player = scene.add.graphics({ x, y });
// //     player.fillStyle(color, 1);
// //     player.fillCircle(0, 0, playerRadius);
// //     player.setInteractive(
// //       new Phaser.Geom.Circle(0, 0, playerRadius),
// //       Phaser.Geom.Circle.Contains
// //     );
// //     player.id = id;
// //     playerRef.current.push(player);

// //     // Set draggable
// //     scene.input.setDraggable(player);

// //     // Add event listeners
// //     player.on("pointerdown", () => {
// //       console.log("Player clicked!");
// //       console.log(player)
// //       toggleBoundary(player);
// //     });

// //     return player;
// //   }

// //   //CODE TO TOGGLE THE BOUNDARY

// //   function toggleBoundary(player) {
// //     const graphics = boundaryGraphicsRef.current;

// //     if (!graphics || !player) return;

// //     if (boundaryVisibleRef.current) {
// //       graphics.clear();
// //       boundaryVisibleRef.current = false;
// //     } else {
// //       const playerX = player.x;
// //       const playerY = player.y;

// //       boundaryCenterRef.current = { x: playerX, y: playerY };

// //       graphics.lineStyle(3, 0xff0000);
// //       graphics.strokeCircle(playerX, playerY, boundaryRadius);
// //       boundaryVisibleRef.current = true;
// //     }
// //   }

// //   //CODE TO CLEAR THE BOUNDARY

// //   function clearBoundary() {
// //     const graphics = boundaryGraphicsRef.current;
// //     if (!graphics) return;
// //     graphics.clear();
// //     boundaryVisibleRef.current = false;
// //   }

// //   useEffect(() => {
// //     const config = {
// //       type: Phaser.AUTO,
// //       width: window.innerWidth,
// //       height: window.innerHeight,
// //       parent: phaserRef.current,
// //       scene: {
// //         preload,
// //         create,
// //         update,
// //       },
// //       scale: {
// //         mode: Phaser.Scale.RESIZE,
// //         autoCenter: Phaser.Scale.CENTER_BOTH,
// //       },
// //     };

// //     gameRef.current = new Phaser.Game(config);

// //     // PRELOAD FUNCTION

// //     function preload() {
// //       console.log("Preloading assets...");
// //     }

// //     //CREATE FUNCTION

// //     function create() {
// //       console.log("Creating scene...");

// //       this.cameras.main.setBackgroundColor("#242424");

// //       // Initialize graphics for boundaries
// //       const graphics = this.add.graphics();
// //       boundaryGraphicsRef.current = graphics;

// //       // Add initial players
// //       addPlayer(this, 'player1', window.innerWidth / 2, window.innerHeight / 2, 0x0000ff);
// //       addPlayer(this, 'player2', window.innerWidth / 4, window.innerHeight / 4, 0xff0000);

// //       this.input.on("dragstart", (pointer, gameObject) => {
// //         console.log("Drag started");
// //         gameObject.setAlpha(0.5);
// //       });

// //       this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
// //         // console.log(`Dragging: (${dragX}, ${dragY})`);
// //         isDraggingRef.current = true;

// //         const distance = Phaser.Math.Distance.Between(
// //           boundaryCenterRef.current.x,
// //           boundaryCenterRef.current.y,
// //           dragX,
// //           dragY
// //         );
// //         const maxDistance = boundaryRadius - playerRadius;
// //         if (distance <= maxDistance) {
// //           gameObject.setPosition(dragX, dragY);
// //         } else {
// //           const angle = Phaser.Math.Angle.Between(
// //             boundaryCenterRef.current.x,
// //             boundaryCenterRef.current.y,
// //             dragX,
// //             dragY
// //           );
// //           const constrainedX =
// //             boundaryCenterRef.current.x + maxDistance * Math.cos(angle);
// //           const constrainedY =
// //             boundaryCenterRef.current.y + maxDistance * Math.sin(angle);
// //           gameObject.setPosition(constrainedX, constrainedY);
// //         }

// //         const updatedX = gameObject.x;
// //         const updatedY = gameObject.y;
// //         console.log(`Position: (${updatedX}, ${updatedY})`);

// //         socketRef.current.emit('playerMove', {
// //           id: gameObject.id,
// //           x: updatedX,
// //           y: updatedY
// //         });
// //       });

// //       this.input.on("dragend", (pointer, gameObject) => {
// //         console.log("Drag ended");
// //         gameObject.setAlpha(1);
// //         if (isDraggingRef.current) {
// //           clearBoundary();
// //           isDraggingRef.current = false;
// //         }
// //       });
// //     }

// //     function update() {}

// //     return () => {
// //       console.log("Destroying game...");
// //       if (gameRef.current) {
// //         gameRef.current.destroy(true);
// //       }
// //     };
// //   }, []);

// //   return <div ref={phaserRef} style={{ width: "100%", height: "100%" }} />;
// // };

// // export default Playground;
