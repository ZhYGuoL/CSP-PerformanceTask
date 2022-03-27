/**
 * @param {[x, y]} p1
 * @param {[x, y]} p2
 * @return {*} Slope of two points
 */
function slope(p1, p2) {
    return((p1.y - p2.y)/[p1.x - p2.x])
}
/**
 * @param {[x, y]} a
 * @param {[x, y]} b
 * @param {[x, y]} c
 * @return {Boolean} True if right turn, false if left turn
 */
function rightTurn(a, b, c) {
	return ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) <= 0;
}
/**
 * @return {*} Graham scan 
 */
function ConvexHull_GrahamScale() {
	points = []
	var nodes = $('.point');
	for(var i = 0; i<nodes.length; i++){
		points.push(html_point.get(nodes[i]));
	}
	points.sort((a, b) => {
		return a.x - b.x;
	});
	hull = [points.shift()];
	points.sort((a, b) => {
		return -(slope(b, hull[0]) - slope(a, hull[0]));
	})
	for (i = 0; i < points.length; i++) {
		hull.push(points[i]);
		while (hull.length > 2 && rightTurn(hull[hull.length - 3], hull[hull.length - 2], hull[hull.length - 1])) {
			hull.splice(hull.length - 2, 1);
		}
	}
	hull.forEach(el => point_html.get(el).className = "point-hull");
	ConnectHull();
	isRunning = false;
}