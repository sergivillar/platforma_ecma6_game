function Coin (initialPosition) {
    this.basePosition = this.position = initialPosition.plus(new Vector(0.2, 0.1));
    this.size = new Vector(0.6, 0.6);
    this.wobble = Math.PI * 2 * Math.random();
}

Coin.prototype.type = 'coin'

Coin.prototype.act = function (step) {
    
}