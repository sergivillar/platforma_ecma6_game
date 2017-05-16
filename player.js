function Player (initialPosition) {
    this.position = initialPosition.plus(new Vector(0, -0.5));
    this.size = new Vector(0.8, 1.5);
    this.speed = new Vector(0, 0);
}

Player.prototype.type = 'player'

Player.prototype.act = function (step, level, keys) {
}