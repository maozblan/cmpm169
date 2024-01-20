function Branch(begin, end, color) {

    this.begin = begin;
    this.end = end;
    this.finished = false;
    this.color = color;

    this.show = function () {
        stroke(0);
        strokeWeight(20);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    this.branchLeft = function () {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(PI / random(2, 6));
        dir.mult(random(0.3, 0.8));
        let newEnd = p5.Vector.add(this.end, dir);
        let left = new Branch(this.end, newEnd, this.color);
        return left;
    }

    this.branchRight = function () {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-PI / random(2, 20));
        dir.mult(random(0.3, 0.8));
        let newEnd = p5.Vector.add(this.end, dir);
        let right = new Branch(this.end, newEnd, this.color);
        return right;
    }
}
