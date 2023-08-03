class Sprite {
    //passer un objet avec 2 propriétés permet d'éviter l'ordre forcé des arguments
    //rajouter image pour le bg
    //rajouter frames pour les frames ce qui va venir crope l'image dans son ensemble
    //hold pour la vitesse
    constructor({position,
            image,
            frames ={ max: 1, hold: 10 },
            sprites = [], 
            animate = false,
            scale = 1
        }) {
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0 };

        //obtenir la width / height de l'image en fonction de son nombre de frame
        this.image.onload = () => {

            // this.width = (this.image.width / this.frames.max) * scale
            // this.height = this.image.height * scale
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
        this.animate = animate;
        this.sprites = sprites;
        //opacité des sprites si besoin
        this.opacity = 1;
        this.scale = scale;
    }

    draw(){
        //avec restore, 
        context.save()
        context.globalAlpha = this.opacity
        context.drawImage(
            //playerImage cropping (pos and height)
            this.image, 
            this.frames.val * this.width, //0
            0, 
            this.image.width/ this.frames.max,
            this.image.height,
            // //this.image place on the canvas (actual position)
            // canvas.width/2 - this.image.width/8,
            // canvas.height/2 - this.image.height/2,
            this.position.x,
            this.position.y,
            
            //with the crope
            this.image.width / this.frames.max * this.scale,
            this.image.height * this.scale,
        );
        context.restore()
        
        if (!this.animate) return
        //return n'appelle pas la suite

        //gerer le sprite
        if  (this.frames.max > 1) {
            this.frames.elapsed++
        }

        //%10
        if (this.frames.elapsed % this.frames.hold === 0){
        if (this.frames.val < this.frames.max - 1) {this.frames.val++}
        else this.frames.val = 0;
        }
    }
}



// //doit attendre que l'image charge => dès que l'image charge on dessine
// mapBg.onload = () => {
//     // 3 arguments void ctx.drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur);
//     context.drawImage(mapBg, -735, -590);
//     //ne pas que le player arrive sous la carte, il faut qu'il charge après
//     context.drawImage
//         (
//             //playerImage cropping (pos and height)
//             playerImage, 0, 0, playerImage.width/4,
//             playerImage.height,
//             //playerImage place on the canvas (actual position)
//             canvas.width/2 - playerImage.width/8,
//             canvas.height/2 - playerImage.height/2, 
//             //with the crope
//             playerImage.width/4,
//             playerImage.height,
//           );
// }