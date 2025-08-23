const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Configuration for the boundary
const boundary = {
    radius: 200, // Radius of the boundary circle
    color: 'red',
    lineWidth: 3
};

// Player objects
const players = [
    {
        x: canvas.width / 3,
        y: canvas.height / 2,
        radius: 30,
        color: 'blue',
        isDragging: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        x: 2 * canvas.width / 3,
        y: canvas.height / 2,
        radius: 30,
        color: 'green',
        isDragging: false,
        offsetX: 0,
        offsetY: 0
    }
];

let boundaryPosition = null;

// Set canvas dimensions to cover the entire screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    players[0].x = canvas.width / 3;
    players[0].y = canvas.height / 2;
    players[1].x = 2 * canvas.width / 3;
    players[1].y = canvas.height / 2;
    boundaryPosition = null; // Reset boundary position on resize
    draw();
}

window.addEventListener('resize', resizeCanvas);

// Function to draw a player (circle)
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
    players.forEach(drawPlayer);
    drawBoundary();
}

// Check if mouse is inside a player circle
function isMouseInPlayer(mouseX, mouseY) {
    return players.some(player => {
        const dx = mouseX - player.x;
        const dy = mouseY - player.y;
        return Math.sqrt(dx * dx + dy * dy) < player.radius;
    });
}

// Find the player at a specific position
function findPlayer(mouseX, mouseY) {
    return players.find(player => {
        const dx = mouseX - player.x;
        const dy = mouseY - player.y;
        return Math.sqrt(dx * dx + dy * dy) < player.radius;
    });
}

// Check if a player is within the boundary
function isWithinBoundary(player, newX, newY) {
    if (!boundaryPosition) return false;
    const dx = newX - boundaryPosition.x;
    const dy = newY - boundaryPosition.y;
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
    return distanceFromCenter + player.radius <= boundary.radius;
}

// Mouse event listeners
canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    const player = findPlayer(mouseX, mouseY);
    if (player) {
        if (boundaryPosition) {
            // Remove existing boundary if it exists
            boundaryPosition = null;
            player.isDragging = false; // Stop dragging if boundary is removed
        } else {
            // Create a new boundary around the player if none exists
            boundaryPosition = { x: player.x, y: player.y };
            player.isDragging = true; // Start dragging
            player.offsetX = mouseX - player.x;
            player.offsetY = mouseY - player.y;
        }
        draw();
    }
});

canvas.addEventListener('mousemove', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    players.forEach(player => {
        if (player.isDragging) {
            const newX = mouseX - player.offsetX;
            const newY = mouseY - player.offsetY;

            if (isWithinBoundary(player, newX, newY)) {
                player.x = newX;
                player.y = newY;
                draw();
            }
        }
    });
});

canvas.addEventListener('mouseup', () => {
    players.forEach(player => {
        if (player.isDragging) {
            player.isDragging = false;
            // Always remove the boundary once player is moved
            boundaryPosition = null;
            draw();
        }
    });
});

canvas.addEventListener('mouseleave', () => {
    players.forEach(player => {
        if (player.isDragging) {
            player.isDragging = false;
        }
    });
});

// Initial canvas size setup and drawing
resizeCanvas();
draw();