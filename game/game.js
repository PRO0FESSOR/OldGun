const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const boundary = {
    radius: 100, // Radius of the boundary circle
    color: 'red',
    lineWidth: 3
};

const playerA = {
    x: canvas.width / 3, // Initial position of Player A
    y: canvas.height / 2,
    radius: 30,
    color: 'blue',
    isDragging: false,
    offsetX: 0,
    offsetY: 0
};

const playerB = {
    x: (2 * canvas.width) / 3, // Initial position of Player B
    y: canvas.height / 2,
    radius: 30,
    color: 'green',
    isDragging: false,
    offsetX: 0,
    offsetY: 0
};

let boundaryPosition = null;

// Set canvas dimensions to cover the entire screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-position players when resizing
    playerA.x = canvas.width / 3;
    playerA.y = canvas.height / 2;
    playerB.x = (2 * canvas.width) / 3;
    playerB.y = canvas.height / 2;
    boundaryPosition = null; // Reset boundary position on resize
    draw();
}

window.addEventListener('resize', resizeCanvas);

// Function to draw the player (circle)
function drawPlayer(player) {
    context.beginPath();
    context.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    context.fillStyle = player.color;
    context.fill();
    context.closePath();
}

// Function to draw the boundary
function drawBoundary() {
    if (boundaryPosition) {
        context.beginPath();
        context.arc(boundaryPosition.x, boundaryPosition.y, boundary.radius, 0, Math.PI * 2);
        context.strokeStyle = boundary.color;
        context.lineWidth = boundary.lineWidth;
        context.stroke();
        context.closePath();
    }
}

// Function to draw everything
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(playerA);
    drawPlayer(playerB);
    drawBoundary();
}

// Check if mouse is inside the player circle
function isMouseInPlayer(mouseX, mouseY, player) {
    const dx = mouseX - player.x;
    const dy = mouseY - player.y;
    return Math.sqrt(dx * dx + dy * dy) < player.radius;
}

// Check if a player is within the boundary
function isWithinBoundary(player, boundaryX, boundaryY) {
    const dx = player.x - boundaryX;
    const dy = player.y - boundaryY;
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
    return distanceFromCenter + player.radius <= boundary.radius;
}

// Check if Player A can kill Player B (and vice versa)
function canKill(attacker, target) {
    return isWithinBoundary(target, attacker.x, attacker.y);
}

// Function to check if players overlap
function arePlayersOverlapping(player1, player2) {
    const dx = player1.x - player2.x;
    const dy = player1.y - player2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (player1.radius + player2.radius);
}

// Mouse event listeners
canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    if (isMouseInPlayer(mouseX, mouseY, playerA) || isMouseInPlayer(mouseX, mouseY, playerB)) {
        if (boundaryPosition) {
            // Remove existing boundary if it exists
            boundaryPosition = null;
            playerA.isDragging = false; // Stop dragging if boundary is removed
            playerB.isDragging = false; // Stop dragging if boundary is removed
        } else {
            // Create a new boundary around the player if none exists
            boundaryPosition = { x: mouseX, y: mouseY };
            if (isMouseInPlayer(mouseX, mouseY, playerA)) {
                playerA.isDragging = true;
                playerA.offsetX = mouseX - playerA.x;
                playerA.offsetY = mouseY - playerA.y;
            } else if (isMouseInPlayer(mouseX, mouseY, playerB)) {
                playerB.isDragging = true;
                playerB.offsetX = mouseX - playerB.x;
                playerB.offsetY = mouseY - playerB.y;
            }
        }
        draw();
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (playerA.isDragging || playerB.isDragging) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        if (playerA.isDragging) {
            const newX = mouseX - playerA.offsetX;
            const newY = mouseY - playerA.offsetY;

            if (isWithinBoundary(playerA, newX, newY)) {
                playerA.x = newX;
                playerA.y = newY;

                // Prevent overlapping
                if (arePlayersOverlapping(playerA, playerB)) {
                    playerA.x = playerA.x - (newX - playerA.x);
                    playerA.y = playerA.y - (newY - playerA.y);
                }

                draw();
            }
        } else if (playerB.isDragging) {
            const newX = mouseX - playerB.offsetX;
            const newY = mouseY - playerB.offsetY;

            if (isWithinBoundary(playerB, newX, newY)) {
                playerB.x = newX;
                playerB.y = newY;

                // Prevent overlapping
                if (arePlayersOverlapping(playerA, playerB)) {
                    playerB.x = playerB.x - (newX - playerB.x);
                    playerB.y = playerB.y - (newY - playerB.y);
                }

                draw();
            }
        }
    }
});

canvas.addEventListener('mouseup', () => {
    if (playerA.isDragging || playerB.isDragging) {
        playerA.isDragging = false;
        playerB.isDragging = false;
        // Always remove the boundary once player is moved
        boundaryPosition = null;
        draw();
    }
});

canvas.addEventListener('mouseleave', () => {
    if (playerA.isDragging || playerB.isDragging) {
        playerA.isDragging = false;
        playerB.isDragging = false;
    }
});

canvas.addEventListener('dblclick', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    if (isMouseInPlayer(mouseX, mouseY, playerA)) {
        if (canKill(playerA, playerB)) {
            // Remove Player B if Player A is in boundary
            playerB.x = -100; // Move Player B off-screen
            playerB.y = -100;
        }
    } else if (isMouseInPlayer(mouseX, mouseY, playerB)) {
        if (canKill(playerB, playerA)) {
            // Remove Player A if Player B is in boundary
            playerA.x = -100; // Move Player A off-screen
            playerA.y = -100;
        }
    }
    draw();
});

// Initial canvas size setup and drawing
resizeCanvas();
draw();
