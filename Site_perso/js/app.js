// ****************************IMPORTS****************************
// ****************************SELECTION****************************
// import {collisions} from "./assets/data/collisions.js";


// ****************************CANVAS****************************
// ****************************SELECTION****************************
//bien sélectionner notre canvas
const canvas = document.querySelector ('canvas');
//bien choisir notre context
const context = canvas.getContext('2d');
//definir sa taille
canvas.width = 1024;
canvas.height = 576;
// //et sa couleur de fond pour différencier du background
// context.fillStyle = 'white';
// //pour ensuite bien le placer avec d'abord l'exposition 0 0 wide and height
// context.fillRect(0, 0, canvas.width, canvas.height);



//offSet générée par le background position de base à combler
const offset = {
  x: -2250,
  y: -6590
}




// ****************************IMAGES****************************
// ****************************AFFILIATION****************************

//player
const playerImage = new Image();
playerImage.src ="assets/img/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src ="assets/img/playerUp.png";

const playerRightImage = new Image();
playerRightImage.src ="assets/img/playerRight.png";

const playerLeftImage = new Image();
playerLeftImage.src ="assets/img/playerLeft.png";

//amener l'image (on peut pas insérer une string à l'arrache) donc on créer l'image
const mapBg = new Image();
mapBg.src = 'assets/img/cvMap.png';

const mapFg = new  Image();
mapFg.src = 'assets/img/foregroundObjects.png'


//characters
const villagerImg = new Image()
villagerImg.src = 'assets/img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = 'assets/img/oldMan/Idle.png'


//myChars
const npcMeImageWelcome = new Image()
npcMeImageWelcome.src = 'assets/img/me/playerLeftNpc.png'

const npcMeImageInterests = new Image()
npcMeImageInterests.src = 'assets/img/me/playerDownNpc.png'

const npcMeImageFormationsBac = new Image()
npcMeImageFormationsBac.src = 'assets/img/me/playerDownNpc.png'

const npcMeImageFormationsArcheo = new Image()
npcMeImageFormationsArcheo.src = 'assets/img/me/playerDownNpc.png'

const npcMeImageFormationsDul = new Image()
npcMeImageFormationsDul.src = 'assets/img/me/playerDownNpc.png'

const npcMeImageFormationsAnglais = new Image()
npcMeImageFormationsAnglais.src = 'assets/img/me/playerDownNpc.png'

const npcMeImageFormations3wa = new Image()
npcMeImageFormations3wa.src = 'assets/img/me/playerDownNpc.png'

const npcMeImageSkills = new Image()
npcMeImageSkills.src = 'assets/img/me/playerDownNpc.png'

const npcMeImageLanguages = new Image()
npcMeImageLanguages.src = 'assets/img/me/playerRightNpc.png'

const oldManRoadImg = new Image()
oldManRoadImg.src = 'assets/img/oldMan/Idle.png'

const npcMeImageEnd = new Image()
npcMeImageEnd.src = 'assets/img/me/playerDownNpc.png'


// ****************************MAP****************************
// ****************************AFFILIATION****************************

const collisionsMap =[];
//70 parce que la map en question est de 200 tiles de long
for (let i = 0; i < collisions.length; i+= 200){
    //creer la map de collisions
    collisionsMap.push(collisions.slice(i, 200 + i));
    //slice de tant à tant
    // collisions.slice(i, 200 + i);
}
// console.log(collisionsMap);


//préparer une map des frontières quand on a un tileID 14401
const boundaries = [];
//pour chaque ligne détecter en push i index de la row et j index de chaque tileID de chaque ligne
collisionsMap.forEach((row, i) => {
    row.forEach((tileID, j) => {
        if (tileID === 14401)
            boundaries.push(new Boundary({position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
                }
        }));
    })
})
// console.log(boundaries);


//areas zones
const areasZonesMap =[];
//70 parce que la map en question est de 200 tiles de long
for (let i = 0; i < areasData.length; i+= 200){
    //creer la map de collisions
    areasZonesMap.push(areasData.slice(i, 200 + i));
    //slice de tant à tant
    // collisions.slice(i, 200 + i);
}

const areaZones = []
//pour chaque ligne détecter en push i index de la row et j index de chaque tileID de chaque ligne
areasZonesMap.forEach((row, i) => {
  row.forEach((tileID, j) => {
    if (tileID === 14401)
    areaZones.push(new Boundary({position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
            }
    }));
})
})

//houses zones
const houseZonesMap =[];
//70 parce que la map en question est de 200 tiles de long
for (let i = 0; i < houseEntrancesData.length; i+= 200){
    //creer la map de collisions
    houseZonesMap.push(houseEntrancesData.slice(i, 200 + i));
    //slice de tant à tant
    // collisions.slice(i, 200 + i);
}
const houseZones = []
//pour chaque ligne détecter en push i index de la row et j index de chaque tileID de chaque ligne
houseZonesMap.forEach((row, i) => {
    row.forEach((tileID, j) => {
        if (tileID === 14401)
        houseZones.push(new Boundary({position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
                }
        }));
    })
})


//repérer les chacracters dans la data en parcourant les 200 tiles
const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 200) {
  charactersMap.push(charactersMapData.slice(i, 200 + i))
}

//assigner une ID de tuiles à un perso
const characters = []
charactersMap.forEach((row, i) => {
  row.forEach((tileID, j) => {
    // 1026 === villager
    if (tileID === 14403) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: villagerImg,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 2.3,
          animate: true,
          dialogue: ['...', 'Merci d\'avoir insisté, mais je n\'ai rien à dire, je ne suis vraiment là que pour tourner sur place. ']
        })
      )
    }
    //si on veut avoir un plus grand personnge l'imaginer sur 2 tiles ? foreground/background
    // 1031 === oldMan
    else if (tileID === 14402) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: oldManImg,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 2.3,
          dialogue: ['Je parle désormais à ma droite.']
        })
      )
    }
    else if (tileID === 14410) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcMeImageWelcome,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 0.75,
          dialogue: ['Bonjour et bienvenue ! ', 'Je suis Samuel Alleaume. J\'ai 23 ans et j\'ai crée ce cv interactif dans le but de démontrer mes compétences en Javascript, avec un peu de CSS et d\'HTML afin d\'appuyer une demande d\'alternance.']
        })
      )
    }
    else if (tileID === 14411) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcMeImageInterests,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 0.75,
          dialogue: ['Ce cv est venu d\'une volonté de combiner ces envies de bricoler à la fois en codant et en gardant (un peu) d\'artistique.']
        })
      )
    }
    else if (tileID === 14412) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcMeImageFormationsBac,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 0.75,
          dialogue: ['Bac S Sciences de l\'ingénieur en 2017 au Lycée Bréquigny, à Rennes ']
        })
      )
    }
    else if (tileID === 14413) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcMeImageFormationsArcheo,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 0.75,
          dialogue: ['Licence d\'archéologie de 2017 à 2019 à Université Rennes 2 ']
        })
      )
    }
    else if (tileID === 14414) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcMeImageFormationsDul,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 0.75,
          dialogue: ['Diplome Universitaire de Langue (DUL) de Japonais de 2017 à 2020 à Université Rennes 2 ']
        })
      )
    }
    else if (tileID === 14415) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcMeImageFormationsAnglais,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 0.75,
          dialogue: ['Licence LLCER Anglais de 2019 à 2022 à Université Rennes 2']
        })
      )
    }
    else if (tileID === 14416) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcMeImageFormations3wa,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 0.75,
          dialogue: ['Formation Développeur Intégrateur Web de décembre 2022 à mars 2023 pour la première partie à la 3W Academy.',
                    'Suivi d\'une formation Full Stack developper, spécialisation React et Node JS qui doit se faire en alternance à compter de Mars 2023.',
                    'N\'ayant pas trouvé d\'alternance ceci n\'a pas donné de suite. Mais je cherche tout de même à me lancer.']
        })
      )
    }
    else if (tileID === 14417) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcMeImageSkills,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 0.75,
          dialogue: ['Possedant dorénavant des bases en HTML, CSS, JavaScript et PHP, ce petit projet de CV un peu ambitieux me permet aussi de démontrer une capacité à utiliser des logiciels tels que GIMP et Photoshop']
        })
      )
    }
    else if (tileID === 14418) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcMeImageLanguages,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 0.75,
          dialogue: ['Je suis bilingue en anglais du fait de ma licence et d\'un niveau attesté C1 selon l\'organisme Altissia',
                     'Je peux aussi parler espagnol avec un niveau de sortie lycée (~B1)',
                    'Et enfin le japonais en tant que débutant, confirmé par le Diplome universitaire de langue.']
        })
      )
    }
    else if (tileID === 14419) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: oldManRoadImg,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 2.3,
          dialogue: ['Eh, psst..', 
                      'Oui, toi !',
                      'ça fait un moment que je cherche quoi faire.',
                      'J\'ai entendu dire qu\'il fallait simplement traverser la route pour trouver du travail, tu le crois, toi ?']
        })
      )
    }
    else if (tileID === 14420) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcMeImageEnd,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 0.75,
          dialogue: ['Ceci est la fin de cette petite aventure, merci d\'avoir joué le jeu jusqu\'au bout.', 
                    'Si jamais cette expérience vous a donné envie de me contacter, vous pouvez me joindre ici : <a href ="mailto:samuel@alleaume.eu">samuel@alleaume.eu</a>.',
                    'Des aides sont aussi à pourvoir dans le cas d\'un recrutement par alternance.', 
                    'J\'espère que vous avez passé un bon moment, et je vous souhaite une bonne journée !']
        })
      )
    }
    if (tileID !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
    }
  })
})








// ****************************SPRITES****************************
// ****************************GESTION****************************
//renter la width et height en brut
const player = new Sprite ({
    position :{
        x: canvas.width / 2 - playerImage.width / 8, //192
        y: canvas.height / 2 - playerImage.height / 2 //68
    },
    image: playerImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
      up: playerUpImage,
      left: playerLeftImage,
      right: playerRightImage,
      down: playerImage
    }
});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapBg
});

const foreground = new Sprite({
  position: {
      x: offset.x,
      y: offset.y
  },
  image: mapFg
});









// ****************************TABLEAU****************************
// ****************************KEYS****************************
const keys = {
  z: {
      pressed: false
  },
  q: {
      pressed: false
  },
  d: {
      pressed: false
  },
  s: {
      pressed: false
  },
  ArrowUp: {
      pressed: false
  },
  ArrowLeft: {
      pressed: false
  },
  ArrowRight: {
      pressed: false
  },
  ArrowDown: {
      pressed: false
  },
  e: {
      pressed: false
  },
  enter: {
      pressed: false
  }
};

// ****************************CORE****************************
// ****************************FUNCTION****************************

//définir les objets que l'on veut voir bouger
// les ... permettent de préciser tous les éléments de x
const movables =[background, ...boundaries, foreground, ...characters, ...houseZones, ...areaZones];

const renderables = [background, ...boundaries, ...characters, player, foreground, ...houseZones, ...areaZones];


const boat = {
  calling: false
};


//fonction de mouvement
function animate() {
    //store l'id de l'animation
    const animationId = window.requestAnimationFrame(animate);

  renderables.forEach((renderable) => {
    renderable.draw()
  })

  let moving = true;
  player.animate = false;

  // prevent movement
  if (boat.calling) return;

  //Detection des zones de bagarre
  if(keys.z.pressed|| keys.q.pressed || keys.d.pressed || keys.s.pressed || keys.ArrowUp.pressed|| keys.ArrowLeft.pressed || keys.ArrowRight.pressed || keys.ArrowDown.pressed) {
    //detection des battleszones (en soit idem que avant)
    for (let i = 0; i < houseZones.length; i++) {
      const houseZone = houseZones[i]
      const overlappingArea = (Math.min(player.position.x + player.width, houseZone.position.x + houseZone.width) - Math.max(player.position.x, houseZone.position.x)) *
       (Math.min(player.position.y + player.height, houseZone.position.y + houseZone.height) - Math.max(player.position.y, houseZone.position.y));
      if (
        rectangularCollisions({
          rectangle1: player,
          rectangle2: houseZone
        }) 
        //mieux délimiter la zone
        && overlappingArea > (player.width * player.height) / 10

        && (keys.z.pressed || keys.ArrowUp.pressed)
      ) {
          // console.log('Housezone entry')

          //desactiver les animations actuelles
          window.cancelAnimationFrame(animationId);

          //lancement de la fenêtre de transition

          gsap.to('#overlappingDiv', {
            //juste fade
            opacity: 1,
            //repeat flash
            repeat: 0,
            //0 a 1 0 1 en smooth
            yoyo: true,
            //speedup
            duration: 0.4,
            onComplete() {
              gsap.to('#overlappingDiv', {
                opacity: 1,
                duration: 0.4,
                onComplete(){
                  //Nouvelle suite d'animations
                  animateHouse()
                  gsap.to('#overlappingDiv', {
                    opacity: 0,
                    duration: 0.4
                  })
                }
              })

            }
          });
          break
        }
      }
    }

    if(keys.z.pressed|| keys.q.pressed || keys.d.pressed || keys.s.pressed || keys.ArrowUp.pressed|| keys.ArrowLeft.pressed || keys.ArrowRight.pressed || keys.ArrowDown.pressed) {
      //detection des battleszones (en soit idem que avant)
      for (let i = 0; i < areaZones.length; i++) {
        const areaZone = areaZones[i]
        const overlappingArea = (Math.min(player.position.x + player.width, areaZone.position.x + areaZone.width) - Math.max(player.position.x, areaZone.position.x)) *
         (Math.min(player.position.y + player.height, areaZone.position.y + areaZone.height) - Math.max(player.position.y, areaZone.position.y));
        if (
          rectangularCollisions({
            rectangle1: player,
            rectangle2: areaZone
          }) 
          //mieux délimiter la zone
          && overlappingArea > (player.width * player.height) / 5
        ) {
            // console.log('AreaZone entry')

            //detecter la zone avec pop up du nom de zone 
            gsap.to('#areaDiv', {
              //juste fade
              opacity: 1,
              //0 a 1 0 1 en smooth
              yoyo: true,
              //speedup
              duration: 0.5,
              height: 70,
              padding: 12,
              delay: 0.5,
              onComplete() {
                gsap.to('#areaDiv', {
                  duration: 1.0,
                  height: 0,
                  padding: 0,
                  delay: 2,
                  onComplete(){
                    gsap.to('#areaDiv', {
                      opacity: 0,
                      duration: 0.5,
                    })
                  }
                })
              }
            });

            document.querySelector('#areaDiv').innerHTML = "Zone suivante";
            document.querySelector('#areaDiv').style.display = 'flex';
          }
      }
    }
    //bouger le fond plus que le personnage en lui même
    //soit bouger dans une direction avec if / else if
    //zqsd
    // let moving = true;
    // player.animate = false;
    if ((keys.z.pressed && lastKey === 'z')) { 
      player.animate = true;
      player.image = player.sprites.up;

      checkForCharacterCollision({
        characters,
        player,
        characterOffset: { x: 0, y: 3 }
      })

        //detection des zones de boundaries
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectangularCollisions({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                  }
                }
              })
            ) {
              moving = false
              break
            }
          }
      
          if (moving)
            movables.forEach((movable) => {
              movable.position.y += 4
            })
    // background.position.y = background.position.y += 3;}
    } else if (keys.q.pressed && lastKey === 'q') {
        player.animate = true;
        player.image = player.sprites.left;

        checkForCharacterCollision({
          characters,
          player,
          characterOffset: { x: 30, y: 0 }
        })

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectangularCollisions({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y
                  }
                }
              })
            ) {
              moving = false
              break
            }
          }
      
          if (moving)
            movables.forEach((movable) => {
              movable.position.x += 4
            })
    } else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true;
        player.image = player.sprites.right;

        checkForCharacterCollision({
          characters,
          player,
          characterOffset: { x: -3, y: 0 }
        })

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectangularCollisions({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x - 3,
                    y: boundary.position.y
                  }
                }
              })
            ) {
              moving = false
              break
            }
          }
      
          if (moving)
            movables.forEach((movable) => {
              movable.position.x -= 4
            })
    } else if (keys.s.pressed && lastKey === 's') {
        player.animate = true;
        player.image = player.sprites.down;

        checkForCharacterCollision({
          characters,
          player,
          characterOffset: { x: 0, y: -3 }
        })

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectangularCollisions({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x ,
                    y: boundary.position.y - 3
                  }
                }
              })
            ) {
              moving = false
              break
            }
          }
      
          if (moving)
            movables.forEach((movable) => {
              movable.position.y -= 4
            })
            
    //arrows
    } else if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') { 
      player.animate = true;
      player.image = player.sprites.up;
      checkForCharacterCollision({
        characters,
        player,
        characterOffset: { x: 0, y: 3 }
      })
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectangularCollisions({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                  }
                }
              })
            ) {
              moving = false
              break
            }
          }
      
          if (moving)
            movables.forEach((movable) => {
              movable.position.y += 4
            })
        } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
          player.animate = true;
          player.image = player.sprites.left;
          checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 30, y: 0 }
          })
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                  rectangularCollisions({
                    rectangle1: player,
                    rectangle2: {
                      ...boundary,
                      position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                      }
                    }
                  })
                ) {
                  moving = false
                  break
                }
              }
          
              if (moving)
                movables.forEach((movable) => {
                  movable.position.x += 4
                })
            } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
              player.animate = true;
              player.image = player.sprites.right;
              checkForCharacterCollision({
                characters,
                player,
                characterOffset: { x: -3, y: 0 }
              })
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i]
                    if (
                      rectangularCollisions({
                        rectangle1: player,
                        rectangle2: {
                          ...boundary,
                          position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                          }
                        }
                      })
                    ) {
                      moving = false
                      break
                    }
                  }
              
                  if (moving)
                    movables.forEach((movable) => {
                      movable.position.x -= 4
                    })
                } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
                  player.animate = true;
                  player.image = player.sprites.down;
                  checkForCharacterCollision({
                    characters,
                    player,
                    characterOffset: { x: 0, y: -3 }
                  })
                    for (let i = 0; i < boundaries.length; i++) {
                        const boundary = boundaries[i]
                        if (
                          rectangularCollisions({
                            rectangle1: player,
                            rectangle2: {
                              ...boundary,
                              position: {
                                x: boundary.position.x ,
                                y: boundary.position.y - 3
                              }
                            }
                          })
                        ) {
                          moving = false
                          break
                        }
                      }
                  
                      if (moving)
                        movables.forEach((movable) => {
                          movable.position.y -= 4
                        })
//soit bouger avec les diagonales en full if
  }
}
animate();



const offsetHouse = {
  x: 80,
  y: 0
}

const collisionsMapHouse =[];
//20 parce que la map en question est de 20 tiles de long
for (let i = 0; i < collisionsHouse.length; i+= 20){
    //creer la map de collisions
    collisionsMapHouse.push(collisionsHouse.slice(i, 20 + i));
    //slice de tant à tant
    // collisions.slice(i, 200 + i);
}
// console.log(collisionsMap);


//préparer une map des frontières quand on a un tileID 14401
const boundariesHouse = [];
//pour chaque ligne détecter en push i index de la row et j index de chaque tileID de chaque ligne
collisionsMapHouse.forEach((row, i) => {
    row.forEach((tileID, j) => {
        if (tileID === 14401)
        boundariesHouse.push(new Boundary({position: {
                x: j * Boundary.width + offsetHouse.x,
                y: i * Boundary.height + offsetHouse.y
                }
        }));
    })
})

//boats zones
const collisionLeavingHouseMap =[];
//20 parce que la map en question est de 20 tiles de long
for (let i = 0; i < collisionLeavingHouseData.length; i+= 20){
    //creer la map de collisions
    collisionLeavingHouseMap.push(collisionLeavingHouseData.slice(i, 20 + i));
}

const collisionLeavingHouse = []
//pour chaque ligne détecter en push i index de la row et j index de chaque tileID de chaque ligne
collisionLeavingHouseMap.forEach((row, i) => {
    row.forEach((tileID, j) => {
        if (tileID === 14401)
        collisionLeavingHouse.push(new Boundary({position: {
                x: j * Boundary.width + offsetHouse.x,
                y: i * Boundary.height + offsetHouse.y
                }
        }));
    })
})

const playerImageHouse = new Image();
playerImageHouse.src ="assets/img/playerUp.png";

const playerHouse = new Sprite ({
  position :{
      x: 420,
      y: 460
  },
  image: playerImageHouse,
  frames: {
      max: 4,
      hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerImage
  }
});


const houseBackgroundImage = new Image();
houseBackgroundImage.src = "assets/img/houseBg.png";
const houseBackground = new Sprite({position: {
    x: 80,
    y: 0
  },
  image: houseBackgroundImage
});


const movablesHouse =[houseBackground, ...boundariesHouse, ...collisionLeavingHouse]; //, ...characters

const renderablesHouse = [houseBackground, ...boundariesHouse, playerHouse, ...collisionLeavingHouse]; //, ...characters

const houseDoor = {
  calling: false
};

let animationIdHouse;

function animateHouse() {
  const animationIdHouse = window.requestAnimationFrame(animateHouse);
  renderablesHouse.forEach((renderable) => {
    renderable.draw()
  })
  let moving = true;
  playerHouse.animate = false;

  // prevent movement
  if (houseDoor.calling) return;

  //Detection des zones de bagarre
  if(keys.z.pressed|| keys.q.pressed || keys.d.pressed || keys.s.pressed || keys.ArrowUp.pressed|| keys.ArrowLeft.pressed || keys.ArrowRight.pressed || keys.ArrowDown.pressed) {
    //detection des leavingHouse (en soit idem que avant)
    for (let i = 0; i < collisionLeavingHouse.length; i++) {
      const collisionLeavingHousee = collisionLeavingHouse[i]
      const overlappingArea = (Math.min(playerHouse.position.x + playerHouse.width, collisionLeavingHousee.position.x + collisionLeavingHousee.width) - Math.max(playerHouse.position.x, collisionLeavingHousee.position.x)) *
       (Math.min(playerHouse.position.y + playerHouse.height, collisionLeavingHousee.position.y + collisionLeavingHousee.height) - Math.max(playerHouse.position.y, collisionLeavingHousee.position.y));
      if (
        rectangularCollisions({
          rectangle1: playerHouse,
          rectangle2: collisionLeavingHousee
        }) 
        //mieux délimiter la zone
        && overlappingArea > (playerHouse.width * playerHouse.height) / 10

        && (keys.s.pressed || keys.ArrowDown.pressed)
      ) {
          // console.log('HouseDoor entry')
          //desactiver les animations actuelles
          window.cancelAnimationFrame(animationIdHouse);

          //lancement de la fenêtre de transition
          gsap.to('#overlappingDiv', {
            //juste fade
            opacity: 1,
            //repeat flash
            repeat: 0,
            //0 a 1 0 1 en smooth
            yoyo: true,
            //speedup
            duration: 0.4,
            onComplete() {
              gsap.to('#overlappingDiv', {
                opacity: 1,
                duration: 0.4,
                onComplete(){
                  //Nouvelle suite d'animations
                  animate()
                  gsap.to('#overlappingDiv', {
                    opacity: 0,
                    duration: 0.4
                  })
                }
              })

            }
          });
          break
        }
      }
    }

    //bouger le fond plus que le personnage en lui même
    //soit bouger dans une direction avec if / else if
    //zqsd
    // let moving = true;
    // player.animate = false;
    if (keys.z.pressed && lastKey === 'z') { 
      playerHouse.animate = true;
      playerHouse.image = playerHouse.sprites.up;
        //detection des zones de boundaries
        for (let i = 0; i < boundariesHouse.length; i++) {
            const boundary = boundariesHouse[i]
            if (
              rectangularCollisions({
                rectangle1: playerHouse,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 5
                  }
                }
              })
            ) {
              moving = false
              break
            }
          }
      
          if (moving)
            movablesHouse.forEach((movable) => {
              movable.position.y += 4
            })
    // background.position.y = background.position.y += 3;}
    } else if (keys.q.pressed && lastKey === 'q') {
        playerHouse.animate = true;
        playerHouse.image = playerHouse.sprites.left;
        for (let i = 0; i < boundariesHouse.length; i++) {
            const boundary = boundariesHouse[i]
            if (
              rectangularCollisions({
                rectangle1: playerHouse,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x + 5,
                    y: boundary.position.y
                  }
                }
              })
            ) {
              moving = false
              break
            }
          }
      
          if (moving)
            movablesHouse.forEach((movable) => {
              movable.position.x += 4
            })
    } else if (keys.d.pressed && lastKey === 'd') {
        playerHouse.animate = true;
        playerHouse.image = playerHouse.sprites.right;
        for (let i = 0; i < boundariesHouse.length; i++) {
            const boundary = boundariesHouse[i]
            if (
              rectangularCollisions({
                rectangle1: playerHouse,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x - 5,
                    y: boundary.position.y
                  }
                }
              })
            ) {
              moving = false
              break
            }
          }
      
          if (moving)
            movablesHouse.forEach((movable) => {
              movable.position.x -= 4
            })
    } else if (keys.s.pressed && lastKey === 's') {
        playerHouse.animate = true;
        playerHouse.image = playerHouse.sprites.down;
        for (let i = 0; i < boundariesHouse.length; i++) {
            const boundary = boundariesHouse[i]
            if (
              rectangularCollisions({
                rectangle1: playerHouse,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x ,
                    y: boundary.position.y - 5
                  }
                }
              })
            ) {
              moving = false
              break
            }
          }
      
          if (moving)
            movablesHouse.forEach((movable) => {
              movable.position.y -= 4
            })
  } else if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') { 
    playerHouse.animate = true;
    playerHouse.image = playerHouse.sprites.up;
      //detection des zones de boundaries
      for (let i = 0; i < boundariesHouse.length; i++) {
          const boundary = boundariesHouse[i]
          if (
            rectangularCollisions({
              rectangle1: playerHouse,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 5
                }
              }
            })
          ) {
            moving = false
            break
          }
        }
    
        if (moving)
          movablesHouse.forEach((movable) => {
            movable.position.y += 4
          })
  // background.position.y = background.position.y += 3;}
  } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
      playerHouse.animate = true;
      playerHouse.image = playerHouse.sprites.left;
      for (let i = 0; i < boundariesHouse.length; i++) {
          const boundary = boundariesHouse[i]
          if (
            rectangularCollisions({
              rectangle1: playerHouse,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x + 5,
                  y: boundary.position.y
                }
              }
            })
          ) {
            moving = false
            break
          }
        }
    
        if (moving)
          movablesHouse.forEach((movable) => {
            movable.position.x += 4
          })
  } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
      playerHouse.animate = true;
      playerHouse.image = playerHouse.sprites.right;
      for (let i = 0; i < boundariesHouse.length; i++) {
          const boundary = boundariesHouse[i]
          if (
            rectangularCollisions({
              rectangle1: playerHouse,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x - 5,
                  y: boundary.position.y
                }
              }
            })
          ) {
            moving = false
            break
          }
        }
    
        if (moving)
          movablesHouse.forEach((movable) => {
            movable.position.x -= 4
          })
  } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
      playerHouse.animate = true;
      playerHouse.image = playerHouse.sprites.down;
      for (let i = 0; i < boundariesHouse.length; i++) {
          const boundary = boundariesHouse[i]
          if (
            rectangularCollisions({
              rectangle1: playerHouse,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x ,
                  y: boundary.position.y - 5
                }
              }
            })
          ) {
            moving = false
            break
          }
        }
    
        if (moving)
          movablesHouse.forEach((movable) => {
            movable.position.y -= 4
          })
}

}
  // console.log('animating house')






// ****************************LISTENERS****************************
// ****************************& KEYS****************************

//mémoriser la dernière key enfoncée => passer de gauche à droite même si on maintient bas et qu'on appuie ensuite sur droite
let lastKey = '';

window.addEventListener('keydown', (e) => {
  if (player.isInteracting) {
    switch (e.key) {
      case 'e':
        player.interactionAsset.dialogueIndex++

        var { dialogueIndex, dialogue } = player.interactionAsset
        if (dialogueIndex <= dialogue.length - 1) {
          document.querySelector('#characterDialogueBox').innerHTML =
            player.interactionAsset.dialogue[dialogueIndex]
            document.querySelector('#characterDialogueBox').style.display = 'flex'
          return
        }

        // finish conversation
        player.isInteracting = false
        player.interactionAsset.dialogueIndex = 0
        document.querySelector('#characterDialogueBox').style.display = 'none'
        break;
        case 'Enter':
          player.interactionAsset.dialogueIndex++

          var { dialogueIndex, dialogue } = player.interactionAsset
          if (dialogueIndex <= dialogue.length - 1) {
            document.querySelector('#characterDialogueBox').innerHTML =
              player.interactionAsset.dialogue[dialogueIndex]
              document.querySelector('#characterDialogueBox').style.display = 'flex'
            return
          }

          // finish conversation
          player.isInteracting = false
          player.interactionAsset.dialogueIndex = 0
          document.querySelector('#characterDialogueBox').style.display = 'none'
          break;

    }
    return
  }

  
//on va commencer à écouter tout ça, si une keydown est repérée cela activera la fonction dans la boucle
// window.addEventListener('keydown', (e) => {
    // console.log(e);
    // console.log(e.key);
    switch (e.key) {
        case 'e':
            if (!player.interactionAsset) return
      
            // beginning the conversation
            var firstMessage = player.interactionAsset.dialogue[0];
            document.querySelector('#characterDialogueBox').innerHTML = firstMessage;
            document.querySelector('#characterDialogueBox').style.display = 'flex';
            player.isInteracting = true;
            break;
          case 'Enter':
              if (!player.interactionAsset) return
        
              // beginning the conversation
              var firstMessage = player.interactionAsset.dialogue[0];
              document.querySelector('#characterDialogueBox').innerHTML = firstMessage;
              document.querySelector('#characterDialogueBox').style.display = 'flex';
              player.isInteracting = true;
              break;
        case 'z':
            keys.z.pressed = true;
            // console.log('devant');
            lastKey ='z';
            break;
        case 'q':
            keys.q.pressed = true;
            lastKey ='q';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey ='d';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey ='s';
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            lastKey ='ArrowUp';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            lastKey ='ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            lastKey ='ArrowRight';
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            lastKey ='ArrowDown';
            break;
        case 'e':
            keys.e.pressed = true;
            lastKey ='e';
            break;
        case 'Enter':
            keys.enter.pressed = true;
            lastKey ='Enter';
            break;
    }
})

//inverser l'écoute
window.addEventListener('keyup', (e) => {
    // console.log(e);
    // console.log(e.key);
    switch (e.key) {
        case 'z':
            keys.z.pressed = false;
            // console.log('devant');
            break;
        case 'q':
            keys.q.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;
        case 'e':
            keys.e.pressed = false;
            break;
        case 'enter':
            keys.enter.pressed = false;
    }
})

//eviter les duplicatas de son
let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    audio.Ambiance.play();
    clicked = true;
  }
})


//prevent scrolling
window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);

//TEST
//detecter la zone avec pop up du nom de zone 
gsap.to('#areaDiv', {
  //juste fade
  opacity: 1,
  //0 a 1 0 1 en smooth
  yoyo: true,
  //speedup
  duration: 1.0,
  height: 70,
  padding: 12,
  delay: 1,
  onComplete() {
    gsap.to('#areaDiv', {
      duration: 1.0,
      height: 0,
      padding: 0,
      delay: 2,
      onComplete(){
        gsap.to('#areaDiv', {
          opacity: 0,
          duration: 0.5,
        })
      }
    })
  }
});

document.querySelector('#areaDiv').innerHTML = "Départ";
document.querySelector('#areaDiv').style.display = 'flex';



//tester qu'on soit bien connecté
// document.write("hello");