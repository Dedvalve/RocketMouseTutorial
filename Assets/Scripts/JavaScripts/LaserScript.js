#pragma strict
//reference the state of the laser (on or off)
var laserOnSprite: Sprite;    
var laserOffSprite: Sprite;
 
//the interval which the laser goes between on and off and the speed it rotates    
var interval: float = 0.5f;    
var rotationSpeed: float = 0.0f;
 
//tells the state the laser starts in and a float for the time until it next switches state
private var isLaserOn: boolean = true;    
private var timeUntilNextToggle: float;


function Start () {
	timeUntilNextToggle = interval; //set the time until the laser should toggle its state for the first time.

}

function Update () {

}

function FixedUpdate () {
    //decreases time left until next toggle
    timeUntilNextToggle -= Time.fixedDeltaTime;
 
    //if the time reaches 0
    if (timeUntilNextToggle <= 0) {
 
        //laser will turn off and be false (since it is true by default)
        isLaserOn = !isLaserOn;
 
        //the collider is only enabled when laser is on 
        collider2D.enabled = isLaserOn;
 
        //caches 2 sprites for the on/off state and checks if the laser is on or not to choose the appropriate sprite
        var newSprite : Sprite;
      	if (isLaserOn)
          GetComponent(SpriteRenderer).sprite = laserOnSprite;
      else
          GetComponent(SpriteRenderer).sprite = laserOffSprite;
 
        //resets the countdown
        timeUntilNextToggle = interval;
    }
 
    //rotates the laser around the z axis
    transform.RotateAround(transform.position, Vector3.forward, rotationSpeed * Time. fixedDeltaTime);
}