//Trying to change the order by looping over the pieces array given by the shuffled pieces
// function drawPieces() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   for (let i = 0; i < pieces.length; i++) {
//     const piece = pieces[i];

export function drawPieces() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((piece, index) => {
      ctx.drawImage(img, piece.imageX, piece.imageY, piece.imageWidth, piece.imageHeight, piece.x, piece.y, piece.width, piece.height);
      ctx.beginPath();
      ctx.moveTo(piece.imageX, piece.imageY);
      ctx.lineTo(piece.imageX + piece.imageWidth, piece.imageY);
      ctx.lineTo(piece.imageX + piece.imageWidth, piece.imageY + piece.imageHeight);
      ctx.lineTo(piece.imageX, piece.imageY + piece.imageHeight);
      ctx.closePath();
      ctx.stroke();
      //Test if each pieces is randomly generated,and it IS indeed working, so my problem is somewhere else
      // ctx.font = "12px Arial";
      // ctx.fillStyle = "black";
      // ctx.fillText(index, piece.x + piece.width / 2, piece.y + piece.height / 2);
    });
  }