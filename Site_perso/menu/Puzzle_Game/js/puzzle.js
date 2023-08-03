const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let pieces = [];
let start;
let end;


//We want either an imported image or one that is previously already set, maybe transform it into a random one among an array ?
const img = new Image();
const fileInput = document.getElementById('file-input');
const checkEarly = document.getElementById('ReStart');

//can't return since it's an event => need callback / promise
checkEarly.addEventListener('click', (event) => {
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      img.crossOrigin = "Anonymous";
      img.src = reader.result;
    }
  } 
  else {   
      img.crossOrigin = "Anonymous";
      img.src = 'https://cloudinary-marketing-res.cloudinary.com/image/upload/f_auto,q_auto/v1667313676/website_2021/Guess_iPhone2';
  }
});

img.onload = function() {
  const canvasRatio = canvas.width / canvas.height;
  const imgRatio = img.width / img.height;
  let width, height, x, y;
  if (imgRatio > canvasRatio * (2/3)) {
    width = canvas.width * (2/3);
    height = width / imgRatio;
  } else {
    height = canvas.height;
    width = height * imgRatio;
  }
  x = (canvas.width - width) / 2;
  y = (canvas.height - height) / 2;

  ctx.drawImage(img, x, y, width, height);
  
  // Call the restart function with newWidth and newHeight
  restart(height, width, img);
};


// Shuffle the pieces with a Fisher-Yates algorithm
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;
  //if any of the pieces hasn't been shuffled yet it'll go on
  while (0 !== currentIndex) {
    // Generate a random index from 0 to currentIndex
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap the element at currentIndex with the element at randomIndex
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  drawPieces();
  return array;
}


// Draw the pieces on the canvas
function drawPieces() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    if (!piece.solved) {
      //draw initial pieces places
      ctx.strokeRect(piece.imageX, piece.imageY, piece.width, piece.height);
      //draw pieces
      ctx.drawImage(piece.image, piece.imageX, piece.imageY, piece.width, piece.height, piece.x, piece.y, piece.width, piece.height);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      //draw around the pieces 
      ctx.strokeRect(piece.x, piece.y, piece.width, piece.height);
    }
  }
}


// // Initialize the pieces when the image is loaded
function initPieces(rows, cols, newWidth, newHeight, resizedImg) {
  // Empty the pieces array
  pieces.length = 0;

  const pieceWidth = newWidth / cols;
  const pieceHeight = newHeight/ rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const piece = {
        imageX: j * pieceWidth,
        imageY: i * pieceHeight,
        x: Math.random() * (canvas.width - pieceWidth),
        y: Math.random() * (canvas.height - pieceHeight),
        width: pieceWidth,
        height: pieceHeight,
        image: resizedImg,
        solved: false
      };
      pieces.push(piece);
    }
  }
  pieces = shuffle(pieces);
  drawPieces();
  start = new Date(); 
}


function restart(newHeight, newWidth, img) {
  // Resize the image to match the new width and height
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = newWidth;
  canvas.height = newHeight;
  context.drawImage(img, 0, 0, newWidth, newHeight);
  const resizedImg = new Image();
  resizedImg.src = canvas.toDataURL();

  const select = document.getElementById('difficulty');
  const difficulty = select.options[select.selectedIndex].value;
  switch (difficulty) {
    case 'easy':
      initPieces(3, 3, newWidth, newHeight, resizedImg);
      break;
    case 'medium':
      initPieces(6, 6, newWidth, newHeight, resizedImg);
      break;
    case 'hard':
      initPieces(9, 9, newWidth, newHeight, resizedImg);
      break;
    case 'testFlemm':
      initPieces(2, 1, newWidth, newHeight, resizedImg);
      break;
  }

  // Call drawPieces again after a delay of 10ms in order to wait for the image to be loaded
  setTimeout(() => {
    drawPieces();
  }, 10);
}

// Check if the puzzle is solved
function checkSolved() {
  const tolerance = 5;
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    if (Math.abs(piece.x - piece.imageX) > tolerance || Math.abs(piece.y - piece.imageY) > tolerance) {
      return false;
    }
  }
  return true;
}


//****************************************************************************************//
//*********************************piece  Selection Mouse*********************************//
//****************************************************************************************//

// Select a piece when the user clicks on it
let selectedPiece = null;
let offsetX = 0;
let offsetY = 0;


// Select a piece when the user clicks on it
//+300 to adjust with another canvas2 try
canvas.addEventListener('mousedown', e => {
  const mouseX = e.clientX - canvas.offsetLeft;
  const mouseY = e.clientY - canvas.offsetTop;
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    if (mouseX > piece.x && mouseX < piece.x + piece.width && mouseY > piece.y && mouseY < piece.y + piece.height) {
      selectedPiece = piece;
      offsetX = mouseX - piece.x;
      offsetY = mouseY - piece.y;
      break;
    }
  }
});


// Move the selected piece when the user drags it
//+300 to adjust with another canvas2 try
canvas.addEventListener('mousemove', e => {
  if (selectedPiece !== null) {
    selectedPiece.x = e.clientX - canvas.offsetLeft - offsetX;
    selectedPiece.y = e.clientY - canvas.offsetTop - offsetY;
    drawPieces();
  }
});



// Deselect the piece when the user releases it
canvas.addEventListener('mouseup', e => {
  if (selectedPiece !== null) {
    selectedPiece = null;
    if (checkSolved()) {
      end = new Date();
      const time = (end - start) / 60000;
      if (time < 1){
        const secondTime = (end - start) / 1000;
        const roundedSecondTime = parseFloat(secondTime.toFixed(1));
        alert(`Congratulations! You solved the puzzle in ${roundedSecondTime} seconds.`);
      } else {
      const roundedTime = parseFloat(time.toFixed(1));
      alert(`Congratulations! You solved the puzzle in ${roundedTime} minutes.`);
      }
    }
  }
});


//****************************************************************************************//
//*********************************piece  Selection Touch*********************************//
//****************************************************************************************//

canvas.addEventListener('touchstart', e => {
  const touchX = e.touches[0].clientX - canvas.offsetLeft;
  const touchY = e.touches[0].clientY - canvas.offsetTop; 
  // (+300)
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    if (touchX > piece.x && touchX < piece.x + piece.width && touchY > piece.y && touchY < piece.y + piece.height) {
      selectedPiece = piece;
      offsetX = touchX - piece.x;
      offsetY = touchY - piece.y;
      break;
    }
  }
});

canvas.addEventListener('touchmove', e => {
  if (selectedPiece !== null) {
    selectedPiece.x = e.touches[0].clientX - canvas.offsetLeft - offsetX;
    selectedPiece.y = e.touches[0].clientY - canvas.offsetTop - offsetY;
    drawPieces();
  }
});

canvas.addEventListener('touchend', e => {
  if (selectedPiece !== null) {
    selectedPiece = null;
    if (checkSolved()) {
      end = new Date();
      const time = (end - start) / 60000;
      if (time < 1){
        const secondTime = (end - start) / 1000;
        const roundedSecondTime = parseFloat(secondTime.toFixed(1));
        alert(`Congratulations! You solved the puzzle in ${roundedSecondTime} seconds.`);
      } else {
      const roundedTime = parseFloat(time.toFixed(1));
      alert(`Congratulations! You solved the puzzle in ${roundedTime} minutes.`);
      }
    }
  }
});


canvas.addEventListener('touchmove', e => {
  e.preventDefault();
});