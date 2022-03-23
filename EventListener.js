function CreateNewPoint(canvas, event) { 
	let rect = canvas.getBoundingClientRect(); 

	//offset:10, due to mouse position
	let x = event.clientX - 10; 
	let y = event.clientY - 10; 

	//add new Point
	var newPoint = new Point(x, y);
	points.push(newPoint);

	//make html object
	var node = document.createElement("div"); 
	node.className = "point"
	node.style.left = x + "px";
	node.style.top = y + "px";

	document.body.append(node); 

	//add to dictionary for "cross" access
	point_html.set(newPoint, node);
	html_point.set(node, newPoint);
	latestAction = newPoint;

	AnimatePoint(node);
	UpdatePointCounters();
} 


function DeleteNode(node){
	selectedNode = node
	var point = html_point.get(selectedNode);

	//redraw if hull-1 > 2
	if(selectedNode.className == "point-hull"){
		//remove from points list 
		//points.splice( points.indexOf(point), 1);
		hull.splice( hull.indexOf(point), 1);

		//remove from WeakMap
		html_point.delete(selectedNode);
		point_html.delete(point);
		$(selectedNode).remove();
		points.splice( points.indexOf(point), 1);
		
		//when hull without that point is possible -> make new one
		if(points.length + hull.length  >= 3){
			Visualize();
		}
		else{
			$('.line').remove();
			var leftover_points = document.querySelectorAll(".point-hull");
			for(var i = 0; i<leftover_points.length; i++){
				leftover_points[i].setAttribute("class", "point");
				points.push(html_point.get(leftover_points[i]));
				hull = [];
			}
		}
	}
	else{
		//remove node from DOM
		selectedNode.remove();

		//remove from points list 
		points.splice( points.indexOf(point), 1);

		//remove from WeakMap
		html_point.delete(selectedNode);
		point_html.delete(point);
	}
	
	UpdatePointCounters();
}

function randomPoints(){
	var n = 20;
	let canvas = document.getElementById("sandbox").getBoundingClientRect();
	let offset = 100;
	//boundaries
	x_min = canvas.left + offset;
	x_max = canvas.left + canvas.width - 2 * offset;

	y_min = canvas.top + 0.5*offset;
	y_max = canvas.top + canvas.height - 2 * offset;
 
	for(var i = 0; i<n; i++){
		var pos_x = Math.random() * x_max + x_min;
		var pos_y = Math.random() * y_max + y_min;
		CreateAutoPoint(pos_x, pos_y);
	}
	UpdatePointCounters();
}

function CreateAutoPoint(x, y){	
	var newPoint = new Point(x, y);
	points.push(newPoint);

	//make html object
	var node = document.createElement("div"); 
	node.className = "point"
	node.style.left = x + "px";
	node.style.top = y + "px";
	document.body.append(node);  

	//add to dictionary for "cross" access
	point_html.set(newPoint, node);
	html_point.set(node, newPoint);

	AnimatePoint(node);
}

function UpdatePointCounters(){
	var count_points = $('.point').length;
	var count_pointsHull = $('.point-hull').length;

	changeTotalPointCount(count_points + count_pointsHull);
	changeTotalHullCount(count_pointsHull);
}

//LISTENER: right-click
document.addEventListener('contextmenu',function(e){
	//disables contextmenu
	e.preventDefault()

	//right click on a node to open contextmenu
	if(e.target && (e.target.className == 'point' || e.target.className == 'point-hull')){
		DeleteNode(e.target);
	}
});

//LISTENER: left-click
document.addEventListener('click',function(e){
	//right click on a node to open contextmenu
	if (e.target && e.target.id == 'sandbox' && e.which == 1) {
		CreateNewPoint(document.getElementById("sandbox"), event);
	}
});

//LISTENER: key press
$(document).keydown(function(e) {
	if (e.keyCode == 67) clearNodes();
	if (e.keyCode == 86) Visualize();
	if (e.keyCode == 82) randomPoints();
});