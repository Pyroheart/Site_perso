function rectangularCollisions({rectangle1, rectangle2}) {
    /*if*/return (
         rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
         rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
         rectangle1.position.y <= rectangle2.position.y + rectangle2.height/100 && //ici pour la height du rectangle 2 et permettre au premier de passer au dessus
         rectangle1.position.y + rectangle1.height >= rectangle2.position.y
     )
     // console.log('colllide');
 }

 //return true ou false 