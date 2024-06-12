const actionSequence = [];
const requiredSequence = ['left', 'left', 'up', 'up'];

window.addEventListener('keydown', (event) => {
  if (player.preventInput) return; // Prevent movement during other actions

  switch (event.key) {
    case 'w':
      actionSequence.push('up'); // Track 'up' action
      if (player.velocity.y === 0) player.velocity.y = -20; // Jump action
      break;
    case 'a':
      actionSequence.push('left'); // Track 'left' action
      keys.a.pressed = true; // Set key state
      break;
    case 'd':
      actionSequence.push('right'); // Track 'right' action
      keys.d.pressed = true; // Set key state
      break;
  }

  // Limit the actionSequence array to the length of the requiredSequence
  if (actionSequence.length > requiredSequence.length) {
    actionSequence.shift();
  }

  // Check if the actionSequence matches the requiredSequence
  if (JSON.stringify(actionSequence) === JSON.stringify(requiredSequence)) {
    window.location.href = 'https://drive.google.com/file/d/1py7ypsmaevFG1JMuugt57QmmQCeXQtuq/view?usp=sharing'; // Redirect to secret website
    actionSequence.length = 0; // Reset sequence after successful activation
  }

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

      setTimeout(() => {
        if (i === 0) {
          window.location.href = 'https://www.linkedin.com/in/kushagra-agarwal-88614b219/';
        } else if (i === 1) {
          window.location.href = 'https://github.com/Kush3008';
        } else if (i === 2) {
          window.location.href = 'https://www.behance.net/Kush3008';
        }
      }, 1000); // Delay for animation

      return;
    }
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
