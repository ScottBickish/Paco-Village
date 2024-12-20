// Getting access to our canvas element and canvas 2d api
const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');

// Setting it to 16:9
canvas.width = 1024;
canvas.height = 576;

const collisionMap = [];

for(let i = 0; i < collisions.length; i +=70){
 collisionMap.push(collisions.slice(i, 70 + i)) 
};

class Boundary{
  static width = 48;
  static height = 48;
  constructor({position}){
    this.position = position;
    this.width = 48;
    this.height = 48;
  };

  draw(){
    context.fillStyle = 'rgba(255,0,0,0)'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const boundaries = [];

const offset = {
  x: -545,
  y: -280
}

collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if(symbol === 1025)

    boundaries.push(new Boundary({position: {
      x: j * Boundary.width + offset.x,
      y: i * Boundary.height + offset.y
    }}))
  })
})



// Getting map ready to load
const image = new Image();
image.src = './images/PacoVillage.png';

// Getting player ready to load
const playerImage = new Image();
playerImage.src = './images/playerDown.png';

// storing keys 
const keys = {
  w:{
    pressed: false
  },
  a:{
    pressed: false
  },
  s:{
    pressed: false
  },
  d:{
    pressed: false
  },
}
class Sprite {
constructor({position, velocity, image, frames = {max: 1}}){
this.position = position;
this.image = image;
this.frames = frames;
this.image.onload = () => {
  this.width = this.image.width / this.frames.max
  this.height = this.image.height
}
};
draw(){
  // context.drawImage(this.image, this.position.x, this.position.y);
  context.drawImage(this.image, 
    0,
    0,
    this.image.width / this.frames.max,
    this.image.height,
    this.position.x,
    this.position.y,
    this.image.width / this.frames.max,
    this.image.height);
};
};

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2, 
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImage,
  frames: {
    max: 4
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
});



const movables = [background, ...boundaries];

function rectangularCollision({rectangle1, rectangle2}){
  return(rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}

// The 4 parameters after player image within the draw image is for croping the player image last 4 are for coordinates and what space the image will take
// Adding the animation loop

function animate (){
  window.requestAnimationFrame(animate);

background.draw();

boundaries.forEach(boundary => {
  boundary.draw()
  // if(rectangularCollision({rectangle1: player, rectangle2: boundary})){
  //   console.log('hEYYYYYY IM WALKIN HEEEEER ')
  // }
})

player.draw()



// these conditionals allows the background to move and the boundaries as one so that we have usable collsion blocks
let moving = true
    if(keys.w.pressed && lastKey === 'w'){ 
      for(let i = 0; i < boundaries.length; i++){
        const boundary = boundaries[i]
        if(
          rectangularCollision({
            rectangle1: player, 
            rectangle2: {
              ...boundary, 
              position:{
          x: boundary.position.x,
          y: boundary.position.y + 3
        }
      }
    })
  ){
          moving = false
          break;
        }
      }
      if(moving)
      movables.forEach((movable) => {
      movable.position.y += 3
    })}
    else if (keys.a.pressed && lastKey === 'a'){ 
      for(let i = 0; i < boundaries.length; i++){
        const boundary = boundaries[i]
        if(
          rectangularCollision({
            rectangle1: player, 
            rectangle2: {
              ...boundary, 
              position:{
          x: boundary.position.x + 3,
          y: boundary.position.y 
        }
      }
    })
  ){
          moving = false
          break;
        }
      }
      if(moving)
      movables.forEach((movable) => {
      movable.position.x += 3
    })} 
    else if (keys.s.pressed && lastKey === 's'){ 
      for(let i = 0; i < boundaries.length; i++){
        const boundary = boundaries[i]
        if(
          rectangularCollision({
            rectangle1: player, 
            rectangle2: {
              ...boundary, 
              position:{
          x: boundary.position.x,
          y: boundary.position.y - 3
        }
      }
    })
  ){
          moving = false
          break;
        }
      }
      if(moving)
      movables.forEach((movable) => {
      movable.position.y -= 3
    })}
    else if (keys.d.pressed && lastKey === 'd'){ 
      for(let i = 0; i < boundaries.length; i++){
        const boundary = boundaries[i]
        if(
          rectangularCollision({
            rectangle1: player, 
            rectangle2: {
              ...boundary, 
              position:{
          x: boundary.position.x -3,
          y: boundary.position.y 
        }
      }
    })
  ){
          moving = false
          break;
        }
      }
      if(moving)
      movables.forEach((movable) => {
      movable.position.x -= 3
    })}
    
};
animate();
let lastKey = '';
// Adding an event listener for key down 
window.addEventListener('keydown', (e) => {
  switch(e.key){
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
      case 'a':
        keys.a.pressed = true;
        lastKey = 'a';
        break;
        case 's':
          keys.s.pressed = true;
          lastKey = 's';
          break;
          case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
  };
});

// Adding an event listener for key up
window.addEventListener('keyup', (e) => {
  switch(e.key){
    case 'w':
      keys.w.pressed = false
      break;
      case 'a':
        keys.a.pressed = false
        break;
        case 's':
          keys.s.pressed = false
          break;
          case 'd':
            keys.d.pressed = false
            break;
  };
});

