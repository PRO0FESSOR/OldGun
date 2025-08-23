// import React, { useEffect, useRef } from "react";
// import Phaser from "phaser";

// const Playground = () => {
//   const phaserRef = useRef(null);
//   const gameRef = useRef(null);
//   const playerRef = useRef([]);
//   const boundaryGraphicsRef = useRef(null);
//   const boundaryVisibleRef = useRef(false);
//   const boundaryCenterRef = useRef({ x: 0, y: 0 });
//   const boundaryRadius = 100;
//   const playerRadius = 30;
//   const isDraggingRef = useRef(false);

//   function addPlayer(scene, x, y, color) {
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
//     playerRef.current.push(player);

//     // Set draggable
//     scene.input.setDraggable(player);

//     // Add event listeners
//     player.on("pointerdown", () => {
//       console.log("Player clicked!");
//       toggleBoundary(player);
//     });

//     return player;
//   }

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
//     };

//     gameRef.current = new Phaser.Game(config);

//     function preload() {
//       console.log("Preloading assets...");
//     }

//     function create() {
//       console.log("Creating scene...");

//       this.cameras.main.setBackgroundColor("#242424");

//       // Initialize graphics for boundaries
//       const graphics = this.add.graphics();
//       boundaryGraphicsRef.current = graphics;

//       // Add initial players
//       addPlayer(this, window.innerWidth / 2, window.innerHeight / 2, 0x0000ff);
//       addPlayer(this, window.innerWidth / 4, window.innerHeight / 4, 0xff0000);

//       this.input.on("dragstart", (pointer, gameObject) => {
//         console.log("Drag started");
//         gameObject.setAlpha(0.5);
//       });

//       this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
//         console.log(`Dragging: (${dragX}, ${dragY})`);
//         isDraggingRef.current = true;
//         if (!boundaryVisibleRef.current) {
//           toggleBoundary(gameObject);
//         }
//         const distance = Phaser.Math.Distance.Between(
//           boundaryCenterRef.current.x,
//           boundaryCenterRef.current.y,
//           dragX,
//           dragY
//         );
//         const maxDistance = boundaryRadius - playerRadius;
//         if (distance <= maxDistance) {
//           gameObject.setPosition(dragX, dragY);
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
//           gameObject.setPosition(constrainedX, constrainedY);
//         }
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










// import React, { useEffect, useRef } from "react";
// import Phaser from "phaser";

// const Playground = () => {
//   const phaserRef = useRef(null);
//   const gameRef = useRef(null);
//   const playerRef = useRef([]);
//   const boundaryGraphicsRef = useRef(null);
//   const boundaryVisibleRef = useRef(false);
//   const boundaryCenterRef = useRef({ x: 0, y: 0 });
//   const boundaryRadius = 100;
//   const playerRadius = 30;
//   const isDraggingRef = useRef(false);

//   const arr = useRef([]);

//   function addPlayer(x, y, color) {
//     const player = gameRef.current.scene.scenes[0].add.graphics({ x, y });
//     player.fillStyle(color, 1);
//     player.fillCircle(0, 0, playerRadius);
//     player.setInteractive(
//       new Phaser.Geom.Circle(0, 0, playerRadius),
//       Phaser.Geom.Circle.Contains
//     );
//     playerRef.current.push(player);

//     // Set draggable
//     gameRef.current.scene.scenes[0].input.setDraggable(player);

//     // Add event listeners
//     player.on("pointerdown", (pointer) => {
//       console.log("Player clicked!");
//       console.log(isDraggingRef.current);
//       toggleBoundary(player);
//     });
//   }

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
//     };

//     console.log(typeof arr);
//     arr.current.push(10);
//     console.log(arr);

//     gameRef.current = new Phaser.Game(config);

//     function preload() {
//       console.log("Preloading assets...");
//     }

//     function create() {
//       console.log("Creating scene...");

//       this.cameras.main.setBackgroundColor("#242424");

//       // Initialize players
//       addPlayer(window.innerWidth / 2, window.innerHeight / 2, 0x0000ff);
//       addPlayer(window.innerWidth / 4, window.innerHeight / 4, 0xff0000);

//       // playerRef.current = player;

//       const graphics = this.add.graphics();
//       boundaryGraphicsRef.current = graphics;

//       this.input.on("dragstart", (pointer, gameObject) => {
//         console.log("Drag started");
//         gameObject.setAlpha(0.5);
//       });

//       this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
//         console.log(`Dragging: (${dragX}, ${dragY})`);
//         isDraggingRef.current = true;
//         if (!boundaryVisibleRef.current) {
//           toggleBoundary(gameObject);
//         }
//         const distance = Phaser.Math.Distance.Between(
//           boundaryCenterRef.current.x,
//           boundaryCenterRef.current.y,
//           dragX,
//           dragY
//         );
//         const maxDistance = boundaryRadius - playerRadius;
//         if (distance <= maxDistance) {
//           gameObject.setPosition(dragX, dragY);
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
//           gameObject.setPosition(constrainedX, constrainedY);
//         }
//       });

//       this.input.on("dragend", (pointer, gameObject) => {
//         console.log("Drag ended");
//         gameObject.setAlpha(1);
//         if (isDraggingRef.current) {
//           clearBoundary();
//           isDraggingRef.current = false;
//         }
//       });

//       // player.on("pointerdown", () => {
//       //   console.log("Player clicked!");
//       //   console.log(isDraggingRef.current);
//       //   toggleBoundary();
//       // });
//     }

//     function clearBoundary() {
//       const graphics = boundaryGraphicsRef.current;
//       if (!graphics) return;
//       graphics.clear();
//       boundaryVisibleRef.current = false;
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

// import React, { useEffect, useRef } from 'react';
// import Phaser from 'phaser';

// const Playground = () => {
//   const phaserRef = useRef(null);
//   const gameRef = useRef(null);
//   const playerRef = useRef([]);
//   const boundaryGraphicsRef = useRef(null);
//   const boundaryVisibleRef = useRef(false);
//   const boundaryCenterRef = useRef({ x: 0, y: 0 });
//   const boundaryRadius = 100;
//   const playerRadius = 30;
//   const isDraggingRef = useRef(false);

//   //FUNCTION to add players in array

  


//   useEffect(() => {
//     const config = {
//       type: Phaser.AUTO,
//       width: window.innerWidth,
//       height: window.innerHeight,
//       parent: phaserRef.current,
//       scene: {
//         preload,
//         create,
//         update
//       }
//     };

//     gameRef.current = new Phaser.Game(config);

//     function preload() {
//       console.log('Preloading assets...');
//     }

//     function create() {
//       console.log('Creating scene...');

//       this.cameras.main.setBackgroundColor('#242424');

//       function addPlayer(x, y, color) {
//         const player = gameRef.current.scene.scenes[0].add.graphics({ x, y });
//         player.fillStyle(color, 1);
//         player.fillCircle(0, 0, playerRadius);
//         player.setInteractive(new Phaser.Geom.Circle(0, 0, playerRadius), Phaser.Geom.Circle.Contains);
//         playerRef.current.push(player);
      
//         // Set draggable
//         gameRef.current.scene.scenes[0].input.setDraggable(player);
      
//         // Add event listeners
//         player.on('pointerdown', (pointer) => {
//           console.log('Player clicked!');
//           console.log(isDraggingRef.current);
//           toggleBoundary(player);
//         });
//       }

//       // Initialize players
//       addPlayer(window.innerWidth / 2, window.innerHeight / 2, 0x0000ff);
//       addPlayer(window.innerWidth / 4, window.innerHeight / 4, 0xff0000);

//       console.log(playerRef.current)

//       const graphics = this.add.graphics();
//       boundaryGraphicsRef.current = graphics;


//       this.input.on('dragstart', (pointer, gameObject) => {
//         console.log('Drag started');
//         gameObject.setAlpha(0.5);
//       });
      
//       this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
//         console.log(`Dragging: (${dragX}, ${dragY})`);
//         isDraggingRef.current = true;
//         if (!boundaryVisibleRef.current) {
//           toggleBoundary(gameObject);
//         }
//         const distance = Phaser.Math.Distance.Between(boundaryCenterRef.current.x, boundaryCenterRef.current.y, dragX, dragY);
//         const maxDistance = boundaryRadius - playerRadius;
//         if (distance <= maxDistance) {
//           gameObject.setPosition(dragX, dragY);
//         } else {
//           const angle = Phaser.Math.Angle.Between(boundaryCenterRef.current.x, boundaryCenterRef.current.y, dragX, dragY);
//           const constrainedX = boundaryCenterRef.current.x + maxDistance * Math.cos(angle);
//           const constrainedY = boundaryCenterRef.current.y + maxDistance * Math.sin(angle);
//           gameObject.setPosition(constrainedX, constrainedY);
//         }
//       });
      
//       this.input.on('dragend', (pointer, gameObject) => {
//         console.log('Drag ended');
//         gameObject.setAlpha(1);
//         if (isDraggingRef.current) {
//           clearBoundary();
//           isDraggingRef.current = false;
//         }
//       });
      
//     }

//     function update() {
//       // No update logic needed now
//     }

//     function toggleBoundary(player) {
//       const graphics = boundaryGraphicsRef.current;
    
//       if (!graphics || !player) return;
    
//       if (boundaryVisibleRef.current) {
//         graphics.clear();
//         boundaryVisibleRef.current = false;
//       } else {
//         const playerX = player.x;
//         const playerY = player.y;
    
//         boundaryCenterRef.current = { x: playerX, y: playerY };
    
//         graphics.lineStyle(3, 0xff0000);
//         graphics.strokeCircle(playerX, playerY, boundaryRadius);
//         boundaryVisibleRef.current = true;
//       }
//     }
    

//     function clearBoundary() {
//       const graphics = boundaryGraphicsRef.current;
//       if (!graphics) return;
//       graphics.clear();
//       boundaryVisibleRef.current = false;
//     }

//     return () => {
//       console.log('Destroying game...');
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//       }
//     };
//   }, []);

//   return <div ref={phaserRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default Playground;






// import React, { useEffect, useRef, useState } from 'react';
// import Phaser from 'phaser';

// const Playground = () => {
//   const phaserRef = useRef(null);
//   const gameRef = useRef(null);
//   const [playero , setPlayero] = useState([])
//   const playerRef = useRef([]);
//   const boundaryGraphicsRef = useRef(null);
//   const boundaryVisibleRef = useRef(false);
//   const boundaryCenterRef = useRef({ x: 0, y: 0 });
//   const boundaryRadius = 100;
//   const playerRadius = 20;
//   const isDraggingRef = useRef(false);

//   useEffect(() => {
//     const config = {
//       type: Phaser.AUTO,
//       width: window.innerWidth,
//       height: window.innerHeight,
//       parent: phaserRef.current,
//       scene: {
//         preload,
//         create,
//         update
//       }
//     };

//     gameRef.current = new Phaser.Game(config);

//     function preload() {
//       console.log('Preloading assets...');
//     }

//     function create() {
//       console.log('Creating scene...');

//       this.cameras.main.setBackgroundColor('#242424');

//       // const player = this.add.circle(window.innerWidth / 2, window.innerHeight / 2, playerRadius, 0xffffff);
//       // playerRef.current = player;

//       // Create the outer circle (hollow effect)
//       const player = this.add.graphics({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
//       // player.lineStyle(3, 0x0000ff, 1);
//       // player.strokeCircle(0, 0, playerRadius);
//       player.fillStyle(0x0000ff, 1)
//       player.fillCircle(0, 0, playerRadius);
//       player.setInteractive(new Phaser.Geom.Circle(0, 0, playerRadius), Phaser.Geom.Circle.Contains);

//       playerRef.current = player;
//       console.log(`type is ${typeof playero}`)
//       // console.log(typeof playero)

      

//       const graphics = this.add.graphics();
//       boundaryGraphicsRef.current = graphics;

//       // player.setInteractive();
//       this.input.setDraggable(player);

//       this.input.on('dragstart', (pointer, gameObject) => {
//         console.log('Drag started');
//         gameObject.setAlpha(0.5);
//       });

//       this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
//         console.log(`Dragging: (${dragX}, ${dragY})`);
//         isDraggingRef.current = true;
//         if(!boundaryVisibleRef.current){
//           toggleBoundary();
//         }
//           const distance = Phaser.Math.Distance.Between(boundaryCenterRef.current.x, boundaryCenterRef.current.y, dragX, dragY);
//           const maxDistance = boundaryRadius - playerRadius;
//           if (distance <= maxDistance) {
//             gameObject.setPosition(dragX, dragY);
//           } else {
//             const angle = Phaser.Math.Angle.Between(boundaryCenterRef.current.x, boundaryCenterRef.current.y, dragX, dragY);
//             const constrainedX = boundaryCenterRef.current.x + maxDistance * Math.cos(angle);
//             const constrainedY = boundaryCenterRef.current.y + maxDistance * Math.sin(angle);
//             gameObject.setPosition(constrainedX, constrainedY);
//           }
        
//       });

//       this.input.on('dragend', (pointer, gameObject) => {
//         console.log('Drag ended');
//         gameObject.setAlpha(1);

//         if(isDraggingRef.current){
//           clearBoundary();
//           isDraggingRef.current = false;
//         }
//       });

//       player.on('pointerdown', () => {
//         console.log('Player clicked!');
//         console.log(isDraggingRef.current)
//         toggleBoundary();
//       });
//     }

//     function update() {
//       // No update logic needed now
//     }

//     //function to add players

//     // function addPlayer(x, y, color) {
//     //   const player = gameRef.current.scene.scenes[0].add.circle(x, y, playerRadius, color);
//     //   player.setInteractive();
//     //   gameRef.current.scene.scenes[0].input.setDraggable(player);
//     //   playerRef.current.push(player);
//     // }

//     function toggleBoundary() {
//       const graphics = boundaryGraphicsRef.current;
//       const player = playerRef.current;

//       if (!graphics || !player) return;

//       if (boundaryVisibleRef.current) {
//         graphics.clear();
//         boundaryVisibleRef.current = false;
//       } else {
//         const playerX = player.x;
//         const playerY = player.y;

//         boundaryCenterRef.current = { x: playerX, y: playerY };

//         graphics.lineStyle(3, 0xff0000);
//         graphics.strokeCircle(playerX, playerY, boundaryRadius);
//         boundaryVisibleRef.current = true;
//       }
//     }

//     function clearBoundary() {
//       const graphics = boundaryGraphicsRef.current;
//       if (!graphics) return;
//       graphics.clear();
//       boundaryVisibleRef.current = false;
//     }

//     return () => {
//       console.log('Destroying game...');
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//       }
//     };
//   }, []);

//   return <div ref={phaserRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default Playground;




//complete movement 

// import React, { useEffect, useRef } from 'react';
// import Phaser from 'phaser';

// const Playground = () => {
//   const phaserRef = useRef(null);
//   const gameRef = useRef(null);
//   const playerRef = useRef(null);
//   const boundaryGraphicsRef = useRef(null);
//   const boundaryVisibleRef = useRef(false);
//   const boundaryCenterRef = useRef({ x: 0, y: 0 });
//   const boundaryRadius = 100;
//   const playerRadius = 30;
//   const isDraggingRef = useRef(false);

//   useEffect(() => {
//     const config = {
//       type: Phaser.AUTO,
//       width: window.innerWidth,
//       height: window.innerHeight,
//       parent: phaserRef.current,
//       scene: {
//         preload,
//         create,
//         update
//       }
//     };

//     gameRef.current = new Phaser.Game(config);

//     function preload() {
//       console.log('Preloading assets...');
//     }

//     function create() {
//       console.log('Creating scene...');

//       this.cameras.main.setBackgroundColor('#242424');

//       const player = this.add.circle(window.innerWidth / 2, window.innerHeight / 2, playerRadius, 0x0000ff);
//       playerRef.current = player;

//       const graphics = this.add.graphics();
//       boundaryGraphicsRef.current = graphics;

//       player.setInteractive();
//       this.input.setDraggable(player);

//       this.input.on('dragstart', (pointer, gameObject) => {
//         console.log('Drag started');
//         gameObject.setAlpha(0.5);
//       });

//       this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
//         console.log(`Dragging: (${dragX}, ${dragY})`);
//         isDraggingRef.current = true;
//         if (boundaryVisibleRef.current) {
//           const distance = Phaser.Math.Distance.Between(boundaryCenterRef.current.x, boundaryCenterRef.current.y, dragX, dragY);
//           const maxDistance = boundaryRadius - playerRadius;
//           if (distance <= maxDistance) {
//             gameObject.setPosition(dragX, dragY);
//           } else {
//             const angle = Phaser.Math.Angle.Between(boundaryCenterRef.current.x, boundaryCenterRef.current.y, dragX, dragY);
//             const constrainedX = boundaryCenterRef.current.x + maxDistance * Math.cos(angle);
//             const constrainedY = boundaryCenterRef.current.y + maxDistance * Math.sin(angle);
//             gameObject.setPosition(constrainedX, constrainedY);
//           }
//         } else {
//           gameObject.setPosition(dragX, dragY);
//         }
//       });

//       this.input.on('dragend', (pointer, gameObject) => {
//         console.log('Drag ended');
//         gameObject.setAlpha(1);

//         if(isDraggingRef.current){
//           clearBoundary();
//           isDraggingRef.current = false;
//         }
//       });

//       player.on('pointerdown', () => {
//         console.log('Player clicked!');
//         console.log(isDraggingRef.current)
//         toggleBoundary();
//       });
//     }

//     function update() {
//       // No update logic needed now
//     }

//     function toggleBoundary() {
//       const graphics = boundaryGraphicsRef.current;
//       const player = playerRef.current;

//       if (!graphics || !player) return;

//       if (boundaryVisibleRef.current) {
//         graphics.clear();
//         boundaryVisibleRef.current = false;
//       } else {
//         const playerX = player.x;
//         const playerY = player.y;

//         boundaryCenterRef.current = { x: playerX, y: playerY };

//         graphics.lineStyle(3, 0xff0000);
//         graphics.strokeCircle(playerX, playerY, boundaryRadius);
//         boundaryVisibleRef.current = true;
//       }
//     }

//     function clearBoundary() {
//       const graphics = boundaryGraphicsRef.current;
//       if (!graphics) return;
//       graphics.clear();
//       boundaryVisibleRef.current = false;
//     }

//     return () => {
//       console.log('Destroying game...');
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//       }
//     };
//   }, []);

//   return <div ref={phaserRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default Playground;







//movement done 

// import React, { useEffect, useRef } from 'react';
// import Phaser from 'phaser';

// const Playground = () => {
//   const phaserRef = useRef(null);
//   const gameRef = useRef(null);
//   const playerRef = useRef(null);
//   const boundaryGraphicsRef = useRef(null);
//   const boundaryVisibleRef = useRef(false);
//   const boundaryCenterRef = useRef({ x: 0, y: 0 });
//   const boundaryRadius = 100;
//   const playerRadius = 30;

//   useEffect(() => {
//     const config = {
//       type: Phaser.AUTO,
//       width: window.innerWidth,
//       height: window.innerHeight,
//       parent: phaserRef.current,
//       scene: {
//         preload,
//         create,
//         update
//       }
//     };

//     gameRef.current = new Phaser.Game(config);

//     function preload() {
//       console.log('Preloading assets...');
//     }

//     function create() {
//       console.log('Creating scene...');

//       this.cameras.main.setBackgroundColor('#242424');

//       const player = this.add.circle(window.innerWidth / 2, window.innerHeight / 2, playerRadius, 0x0000ff);
//       playerRef.current = player;

//       const graphics = this.add.graphics();
//       boundaryGraphicsRef.current = graphics;

//       player.setInteractive();
//       this.input.setDraggable(player);

//       this.input.on('dragstart', (pointer, gameObject) => {
//         console.log('Drag started');
//         gameObject.setAlpha(0.5);
//       });

//       this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
//         console.log(`Dragging: (${dragX}, ${dragY})`);
//         if (boundaryVisibleRef.current) {
//           const distance = Phaser.Math.Distance.Between(boundaryCenterRef.current.x, boundaryCenterRef.current.y, dragX, dragY);
//           const maxDistance = boundaryRadius - playerRadius;
//           if (distance <= maxDistance) {
//             gameObject.setPosition(dragX, dragY);
//           } else {
//             const angle = Phaser.Math.Angle.Between(boundaryCenterRef.current.x, boundaryCenterRef.current.y, dragX, dragY);
//             const constrainedX = boundaryCenterRef.current.x + maxDistance * Math.cos(angle);
//             const constrainedY = boundaryCenterRef.current.y + maxDistance * Math.sin(angle);
//             gameObject.setPosition(constrainedX, constrainedY);
//           }
//         } else {
//           gameObject.setPosition(dragX, dragY);
//         }
//       });

//       this.input.on('dragend', (pointer, gameObject) => {
//         console.log('Drag ended');
//         gameObject.setAlpha(1);
//         clearBoundary();
//       });

//       player.on('pointerdown', () => {
//         console.log('Player clicked!');
//         toggleBoundary();
//       });
//     }

//     function update() {
//       // No update logic needed now
//     }

//     function toggleBoundary() {
//       const graphics = boundaryGraphicsRef.current;
//       const player = playerRef.current;

//       if (!graphics || !player) return;

//       if (boundaryVisibleRef.current) {
//         graphics.clear();
//         boundaryVisibleRef.current = false;
//       } else {
//         const playerX = player.x;
//         const playerY = player.y;

//         boundaryCenterRef.current = { x: playerX, y: playerY };

//         graphics.lineStyle(3, 0xff0000);
//         graphics.strokeCircle(playerX, playerY, boundaryRadius);
//         boundaryVisibleRef.current = true;
//       }
//     }

//     function clearBoundary() {
//       const graphics = boundaryGraphicsRef.current;
//       if (!graphics) return;
//       graphics.clear();
//       boundaryVisibleRef.current = false;
//     }

//     return () => {
//       console.log('Destroying game...');
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//       }
//     };
//   }, []);

//   return <div ref={phaserRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default Playground;






// dragging with in the boundary 

// import React, { useEffect, useRef } from 'react';
// import Phaser from 'phaser';

// const Playground = () => {
//   const phaserRef = useRef(null);
//   const gameRef = useRef(null);
//   const playerRef = useRef(null);
//   const boundaryGraphicsRef = useRef(null);
//   const boundaryVisibleRef = useRef(false);
//   const boundaryCenterRef = useRef({ x: 0, y: 0 }); // To store the center of the boundary
//   const boundaryRadius = 100; // Define the boundary radius
//   const playerRadius = 30; // Define the player radius

//   useEffect(() => {
//     const config = {
//       type: Phaser.AUTO,
//       width: window.innerWidth,
//       height: window.innerHeight,
//       parent: phaserRef.current,
//       scene: {
//         preload,
//         create,
//         update
//       }
//     };

//     gameRef.current = new Phaser.Game(config);

//     function preload() {
//       console.log('Preloading assets...');
//     }

//     function create() {
//       console.log('Creating scene...');

//       // Set background color
//       this.cameras.main.setBackgroundColor('#242424');

//       // Create a circle for the player
//       const player = this.add.circle(window.innerWidth / 2, window.innerHeight / 2, playerRadius, 0x0000ff);
//       playerRef.current = player;

//       // Create a graphics object to draw the boundary
//       const graphics = this.add.graphics();
//       boundaryGraphicsRef.current = graphics;

//       // Make the player interactive
//       player.setInteractive();

//       // Make the player draggable
//       this.input.setDraggable(player);

//       // Event handlers for dragging
//       this.input.on('dragstart', (pointer, gameObject) => {
//         console.log('Drag started');
//         gameObject.setAlpha(0.5); // Make the player semi-transparent while dragging
//       });

//       this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
//         console.log(`Dragging: (${dragX}, ${dragY})`);

//         // Check if boundary is visible
//         if (boundaryVisibleRef.current) {
//           const distance = Phaser.Math.Distance.Between(boundaryCenterRef.current.x, boundaryCenterRef.current.y, dragX, dragY);
//           const maxDistance = boundaryRadius - playerRadius;
//           if (distance <= maxDistance) {
//             gameObject.setPosition(dragX, dragY);
//           } else {
//             const angle = Phaser.Math.Angle.Between(boundaryCenterRef.current.x, boundaryCenterRef.current.y, dragX, dragY);
//             const constrainedX = boundaryCenterRef.current.x + maxDistance * Math.cos(angle);
//             const constrainedY = boundaryCenterRef.current.y + maxDistance * Math.sin(angle);
//             gameObject.setPosition(constrainedX, constrainedY);
//           }
//         } else {
//           gameObject.setPosition(dragX, dragY);
//         }
//       });

//       this.input.on('dragend', (pointer, gameObject) => {
//         console.log('Drag ended');
//         gameObject.setAlpha(1); // Reset the alpha when dragging ends
//       });

//       // Add click event listener
//       player.on('pointerdown', () => {
//         console.log('Player clicked!');
//         toggleBoundary();
//       });
//     }

//     function update() {
//       // No update logic needed now
//     }

//     function toggleBoundary() {
//       const graphics = boundaryGraphicsRef.current;
//       const player = playerRef.current;

//       if (!graphics || !player) return;

//       if (boundaryVisibleRef.current) {
//         graphics.clear(); // Clear the boundary
//         boundaryVisibleRef.current = false;
//       } else {
//         // Draw boundary around the player
//         const playerX = player.x;
//         const playerY = player.y;

//         boundaryCenterRef.current = { x: playerX, y: playerY }; // Set the boundary center

//         graphics.lineStyle(3, 0xff0000); // Red boundary with line width 3
//         graphics.strokeCircle(playerX, playerY, boundaryRadius); // Draw the boundary circle
//         boundaryVisibleRef.current = true;
//       }
//     }

//     // Clean up the Phaser game instance on component unmount
//     return () => {
//       console.log('Destroying game...');
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//       }
//     };
//   }, []);

//   return <div ref={phaserRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default Playground;






//dragging and boundary on click works 

// import React, { useEffect, useRef } from 'react';
// import Phaser from 'phaser';

// const Playground = () => {
//   const phaserRef = useRef(null);
//   const gameRef = useRef(null);
//   const playerRef = useRef(null);
//   const boundaryGraphicsRef = useRef(null);
//   const boundaryVisibleRef = useRef(false);

//   useEffect(() => {
//     const config = {
//       type: Phaser.AUTO,
//       width: window.innerWidth,
//       height: window.innerHeight,
//       parent: phaserRef.current,
//       scene: {
//         preload,
//         create,
//         update
//       }
//     };

//     gameRef.current = new Phaser.Game(config);

//     function preload() {
//       console.log('Preloading assets...');
//     }

//     function create() {
//       console.log('Creating scene...');

//       // Set background color
//       this.cameras.main.setBackgroundColor('#242424');

//       // Create a circle for the player
//       const player = this.add.circle(window.innerWidth / 2, window.innerHeight / 2, 30, 0x0000ff);
//       playerRef.current = player;

//       // Create a graphics object to draw the boundary
//       const graphics = this.add.graphics();
//       boundaryGraphicsRef.current = graphics;

//       // Make the player interactive
//       player.setInteractive();

//       // Make the player draggable
//       this.input.setDraggable(player);

//       // Event handlers for dragging
//       this.input.on('dragstart', (pointer, gameObject) => {
//         console.log('Drag started');
//         gameObject.setAlpha(0.5); // Make the player semi-transparent while dragging
//       });

//       this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
//         console.log(`Dragging: (${dragX}, ${dragY})`);
//         // Update player position based on drag
//         gameObject.setPosition(dragX, dragY);
//       });

//       this.input.on('dragend', (pointer, gameObject) => {
//         console.log('Drag ended');
//         gameObject.setAlpha(1); // Reset the alpha when dragging ends
//       });

//       // Add click event listener
//       player.on('pointerdown', () => {
//         console.log('Player clicked!');
//         toggleBoundary();
//       });
//     }

//     function update() {
//       // No update logic needed now
//     }

//     function toggleBoundary() {
//       const graphics = boundaryGraphicsRef.current;
//       const player = playerRef.current;

//       if (!graphics || !player) return;

//       if (boundaryVisibleRef.current) {
//         graphics.clear(); // Clear the boundary
//         boundaryVisibleRef.current = false;
//       } else {
//         // Draw boundary around the player
//         const playerX = player.x;
//         const playerY = player.y;
//         const boundaryRadius = 100;

//         graphics.lineStyle(3, 0xff0000); // Red boundary with line width 3
//         graphics.strokeCircle(playerX, playerY, boundaryRadius); // Draw the boundary circle
//         boundaryVisibleRef.current = true;
//       }
//     }

//     // Clean up the Phaser game instance on component unmount
//     return () => {
//       console.log('Destroying game...');
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//       }
//     };
//   }, []);

//   return <div ref={phaserRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default Playground;



// import React, { useEffect, useRef } from 'react';
// import Phaser from 'phaser';

// const Playground = () => {
//   const phaserRef = useRef(null);

//   useEffect(() => {
//     const config = {
//       type: Phaser.AUTO,
//       width: window.innerWidth,
//       height: window.innerHeight,
//       parent: phaserRef.current,
//       scene: {
//         preload,
//         create,
//         update
//       }
//     };

//     const game = new Phaser.Game(config);

//     function preload() {
//       console.log('Preloading assets...');
//       // No external images are needed
//     }

//     function create() {
//       console.log('Creating scene...');

//       // Set background color
//       this.cameras.main.setBackgroundColor('#242424');

//       // Create a circle for the player
//       const player = this.add.circle(window.innerWidth / 2, window.innerHeight / 2, 30, 0x0000ff);

//       // Make the player interactive
//       player.setInteractive();

//       // Make the player draggable
//       this.input.setDraggable(player);

//       // Event handlers for dragging
//       this.input.on('dragstart', (pointer, gameObject) => {
//         console.log('Drag started');
//         gameObject.setAlpha(0.5); // Make the player semi-transparent while dragging
//       });

//       this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
//         console.log(`Dragging: (${dragX}, ${dragY})`);
//         // Update player position based on drag
//         gameObject.setPosition(dragX, dragY);
//       });

//       this.input.on('dragend', (pointer, gameObject) => {
//         console.log('Drag ended');
//         gameObject.setAlpha(1); // Reset the alpha when dragging ends
//       });
//     }

//     function update() {
//       // No update logic needed now
//     }

//     // Clean up the Phaser game instance on component unmount
//     return () => {
//       console.log('Destroying game...');
//       game.destroy(true);
//     };
//   }, []);

//   return <div ref={phaserRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default Playground;
