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
	points = [] //initialize list for coordinates of nodes (Stored in {x, y})
	var nodes = $('.point'); // the parameter of the function is the nodes
	for (var i = 0; i < nodes.length; i++) {
		points.push(html_point.get(nodes[i]));	// gets coordinates and adds them to points[]
	}
	points.sort((a, b) => { // sort points[] from smallest to greatest x
		return a.x - b.x;
	});	
	hull = [points.shift()]; // add left-most coordinate to the list hull[]
	points.sort((a, b) => { // sort points[] counter-clockwise by sorting the slope of left-most coordinate and current coordinate[]
		return -(slope(b, hull[0]) - slope(a, hull[0]));
	})
	for (i = 0; i < points.length; i++) { // loops for every coordinate in points[]
		hull.push(points[i]); // add points[i] to hull[]
		while (hull.length >= 3 && rightTurn(hull[hull.length - 3], hull[hull.length - 2], hull[hull.length - 1])) {
			// if hull[] length bigger or equal to 3 and last 3 points make a right turn
			hull.splice(hull.length - 2, 1); // remove the second-last point in hull[]
		}
	}
	hull.forEach(el => point_html.get(el).className = "point-hull");
	ConnectHull(); // calls ConnectHull() to connect only the points in hull[]
	isRunning = false; // variable used to check another if function is running (irrelevant for the purposes here)
}