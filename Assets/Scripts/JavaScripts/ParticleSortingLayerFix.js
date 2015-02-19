#pragma strict

function Start () {
	particleSystem.renderer.sortingLayerName = "Player"; //sets the layer which our particle system should be at
	particleSystem.renderer.sortingOrder = -1; //sets the order within the layer (behind the player, above everything else)
}

function Update () {

}