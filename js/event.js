window.addEventListener('keydown', (event) => {
  if (player.preventInput) return;
  switch (event.key) {
    case 'w':
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
          player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite('enterDoor');
          door.play();
          
          if (level === 1) {
            if (i === 0) {
              // Projects Door
              level = 2;
            } else if (i === 1) {
              // Skills Door
              level = 3;
            } else if (i === 2) {
              // Contact Door
              level = 4;
            }
          } else {
            level = 1; // Any other level returns to the first level
          }
          levels[level].init();
          updateText(level);
          return;
        }
      }
      if (player.velocity.y === 0) player.velocity.y = -20;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});
