const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16;
canvas.height = 64 * 9;

let parsedCollisions;
let collisionBlocks;
let background;
let doors;

const player = new Player({
  imageSrc: './img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: { frameRate: 11, frameBuffer: 2, loop: true, imageSrc: './img/king/idle.png' },
    idleLeft: { frameRate: 11, frameBuffer: 2, loop: true, imageSrc: './img/king/idleLeft.png' },
    runRight: { frameRate: 8, frameBuffer: 4, loop: true, imageSrc: './img/king/runRight.png' },
    runLeft: { frameRate: 8, frameBuffer: 4, loop: true, imageSrc: './img/king/runLeft.png' },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/king/enterDoor.png',
      onComplete: () => {
        console.log('complete animation');
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

const pageTexts = {
  1: '<h1>Hello there! I am Kushagra... </h1><p>Welcome to my interactive portfolio, hope you have a good time :3</p>',
  2: '<h1>Projects</h1><p>Here are some of my projects...</p>',
  3: '<h1>Skills and Experience</h1><p>Here are my skills and experiences...</p>',
  4: '<h1>Contact</h1><p>Contact me at...</p>',
};

function updateText(level) {
  const bio = document.getElementById('bio');
  bio.innerHTML = pageTexts[level];
}

let level = 1;
const levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: './img/backgroundLevel1.png',
      });

      doors = [
        new Sprite({
          position: { x: 350, y: 270 }, // Projects Door
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
        new Sprite({
          position: { x: 550, y: 270 }, // Skills Door
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
        new Sprite({
          position: { x: 750, y: 270 }, // Contact Door
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];

      updateText(1); // Update text for home page
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 96;
      player.position.y = 140;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: './img/backgroundLevel2.png',
      });

      doors = [
        new Sprite({
          position: { x: 772, y: 336 },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];

      updateText(2); // Update text for projects page
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 750;
      player.position.y = 230;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: './img/backgroundLevel3.png',
      });

      doors = [
        new Sprite({
          position: { x: 176, y: 335 },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];

      updateText(3); // Update text for skills page
    },
  },
  4: {
    init: () => {
      // Create a blank purple page
      c.fillStyle = 'purple';
      c.fillRect(0, 0, canvas.width, canvas.height);

      // Update text for contact page
      updateText(4);
    },
  },
};

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

const overlay = { opacity: 0 };

function drawDoorText() {
  if (level === 1) {
    // Set default font style for all text
    c.font = '10px "Press Start 2P"';
    c.fillStyle = 'White';

    // Text shadow properties (adjust as needed)
    const shadowXOffset = 1;
    const shadowYOffset = 1;
    const shadowBlur = 2;
    const shadowColor = 'black';

    // Draw "Projects" and "Skills" with stroke effect
    c.shadowColor = shadowColor;
    c.shadowOffsetX = shadowXOffset;
    c.shadowOffsetY = shadowYOffset;
    c.shadowBlur = shadowBlur;
    c.fillText('Projects', 360, 260);
    c.fillText('Skills', 570, 260);


    // Apply bold and green styles for "Exit"
    c.font = 'bold 10px "Press Start 2P"';
    c.fillStyle = 'green';
    c.fillText('Exit', 780, 260);

    // Reset shadow properties for normal text rendering
    c.shadowColor = 'none';
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.shadowBlur = 0;

  }
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  doors.forEach((door) => door.draw());
  drawDoorText();
  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

// Call init and updateText after defining pageTexts and updateText function
levels[level].init();
animate();
updateText(level);
