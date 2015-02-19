#pragma strict

var targetObject: GameObject; //sets the target for the camera to follow
private var distanceToTarget: float; //sets the camera a certain distance from the mouse

function Start () {
	distanceToTarget = transform.position.x - targetObject.transform.position.x; //should be at the center minus whatever position our mouse is in
}

function Update () {
	var targetObjectX: float = targetObject.transform.position.x; //creates a new var to get the targets x position
 
	var newCameraPosition: Vector3 = transform.position; //a new variable to get the V3 of a transform position
	newCameraPosition.x = targetObjectX + distanceToTarget;; //tells the new var that our V3 is the same as our target object
	transform.position = newCameraPosition; //tells our camera to follow the new var
}


/*
	I feel like camera follow should already be offset and easily custom
*/