class Boundary {
    static width = 36;
    static height = 36;
    constructor ({position}) {
        this.position = position;
        //prendre en compte le zoom de la map pour la taille => 12x12 en 300% => 36x36
        this.width = 36;
        this.height = 36;
    }

    draw () {
        //voir les bordures
        // context.fillStyle = 'red';
        context.fillStyle = 'rgba(255, 0, 0, 0)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}