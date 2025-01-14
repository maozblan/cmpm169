// Branch.js - handles branching algortihm for fractal trees
// edited from https://github.com/negiyosai/Fractal-Forest/tree/master
// Author: Lyssa Li
// Date: 2024 Jan 22

function Branch(begin, end) {

    this.begin = begin;
    this.end = end;
    this.finished = false;

    this.show = function () {
        sketchy.stroke(0);
        sketchy.strokeWeight(20);
        sketchy.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    this.branchLeft = function () {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(p5.PI / sketchy.random(2, 6));
        dir.mult(sketchy.random(0.3, 0.8));
        let newEnd = p5.Vector.add(this.end, dir);
        let left = new Branch(this.end, newEnd, this.color);
        return left;
    }

    this.branchRight = function () {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-p5.PI / sketchy.random(2, 20));
        dir.mult(sketchy.random(0.3, 0.8));
        let newEnd = p5.Vector.add(this.end, dir);
        let right = new Branch(this.end, newEnd, this.color);
        return right;
    }
}
