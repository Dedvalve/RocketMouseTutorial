#pragma strict

//instances to store the renderer
var background: Renderer;
var foreground: Renderer;

//speed of the background & foreground to achieve the parallax scrolling effect
var backgroundSpeed: float = 0.02f;
var foregroundSpeed: float = 0.06f;

var offset: float = 0;

function Start () {

}

function Update () {

//increases the textuer offset of each quad with time to move the texture and not the quad.
var backgroundOffset: float = offset * backgroundSpeed;
var foregroundOffset: float = offset * foregroundSpeed;
 
background.material.mainTextureOffset = new Vector2(backgroundOffset, 0);
foreground.material.mainTextureOffset = new Vector2(foregroundOffset, 0);
}