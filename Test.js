var points = [
     {x: 0, y: 0},
     {x: 0, y: 5},
     {x: 5, y: 0},
     {x: 5, y: 5},
     {x: 3, y: 3}
];

/**
 * @param {[x, y]} a
 * @param {[x, y]} b
 * @param {[x, y]} c
 * @return {Boolean} True if right turn, false if left turn
 */
function rightTurn(a, b, c) {
	return ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) <= 0;
}

function slope(p1, p2) {
    return((p1.y - p2.y)/[p1.x - p2.x])
}

points.sort((a, b) => {
    console.log(a.x, b.x);
    return a.x - b.x;
});

hull = [points.shift()];


points.sort((a, b) => {
    return -(slope(b, hull[0]) - slope(a, hull[0]));
})


console.log(points);

for (i = 0; i < points.length; i++) {
    hull.push(points[i]);
    while (hull.length > 2 && rightTurn(hull[hull.length - 3], hull[hull.length - 2], hull[hull.length - 1])) {
        hull.splice(hull.length - 2, 1);
    }
}