class CollisionBlock {
    constructor({ position }) {
        this.position = position;
        this.width = 64;
        this.height = 64;
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

Array.prototype.createObjectsFrom2D = function () {
    const objects = []
    this.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 292 || symbol === 250) {
            objects.push(
                new CollisionBlock({
                position: {
                    x: x * 64,
                    y: y * 64,
                },
            })
        )
    }

    })
})

    return objects
}
