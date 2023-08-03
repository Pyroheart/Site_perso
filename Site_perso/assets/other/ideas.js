//boats zones
const boatsZonesMap =[];
//70 parce que la map en question est de 200 tiles de long
for (let i = 0; i < boatsZonesData.length; i+= 200){
    //creer la map de collisions
    boatsZonesMap.push(boatsZonesData.slice(i, 200 + i));
    //slice de tant à tant
    // collisions.slice(i, 200 + i);
}

const boatsZones = []
//pour chaque ligne détecter en push i index de la row et j index de chaque tileID de chaque ligne
boatsZonesMap.forEach((row, i) => {
    row.forEach((tileID, j) => {
        if (tileID === 14401){
        boatsZones.push(new Boundary({position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
                },
        }));
      } 
    })
})

//, ...boatsZones renderables






    //soit bouger avec les diagonales en full if
    // //zqsd
    // if (keys.z.pressed && lastKey === 'z') { movables.forEach(movable => {movable.position.y += 3})}
    // // background.position.y = background.position.y += 3;}
    // if (keys.q.pressed && lastKey === 'q') { movables.forEach(movable => {movable.position.x += 3})}
    // if (keys.d.pressed && lastKey === 'd') { movables.forEach(movable => {movable.position.x -= 3})}
    // if (keys.s.pressed && lastKey === 's') { movables.forEach(movable => {movable.position.y -= 3})}
    // //arrows
    // if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') { movables.forEach(movable => {movable.position.y += 3})}
    // if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') { movables.forEach(movable => {movable.position.x += 3})}
    // if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') { movables.forEach(movable => {movable.position.x -= 3})}
    // if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') { movables.forEach(movable => {movable.position.y -= 3})}