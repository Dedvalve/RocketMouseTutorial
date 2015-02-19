 #pragma strict
import UnityEngine.UI;

var jetpackForce: float = 75.0f; //the force which moves mouse upwards
var forwardMovementSpeed: float = 3.0f; //how fast our mouse moves

var groundCheckTransform: Transform; //will store the groundcheck we made on the mouse
private var grounded: boolean; //check if we are on the ground or not
var groundCheckLayerMask: LayerMask; //defines what is the ground
var animator: Animator; //contains the animator component to call the animations
var jetpack: ParticleSystem; //gets the particle system for the jetback fire

private var dead: boolean = false; //var to see if we are dead, false by default

private var coins: uint = 0; //will store coin count

var coinIconTexture: Texture2D;

var coinCollectSound: AudioClip; //place the sound for when we collect the coin
var jetpackAudio: AudioSource;
var footstepsAudio: AudioSource;

var parallax: ParallaxScroll; //stores the parallax scrolling

var coinsLabel: Text; //references the coins we pick up

var restartDialog: GameObject; //references our Restart UI


function Start () {
	animator = GetComponent(Animator); //gets the animator component
	restartDialog.SetActive(false); //disables the UI for the restart at game start

}

function Update () {

}

function FixedUpdate () 
{
	var jetpackActive: boolean = Input.GetButton("Fire1"); //if we hit the mouse button or tap
	
 	jetpackActive = jetpackActive && !dead; //performing actions is only true while we are alive
 	
	if (jetpackActive)
    {
  		 rigidbody2D.AddForce(new Vector2(0, jetpackForce));
   	}
   	
   	if (!dead)
    {
        var newVelocity: Vector2 = rigidbody2D.velocity; //creates a new var that gets the velocity of our mouse
		newVelocity.x = forwardMovementSpeed; //the var of newVelocity is the same as forwardmovementspeed
		rigidbody2D.velocity = newVelocity; //sets our mouse velocity to the new velocity var
    }
	
	UpdateGroundedStatus(); //consitently checks if we are grounded
	AdjustJetpack(jetpackActive); //will check to see if we need flames
	
	AdjustFootstepsAndJetpackSound(jetpackActive);
	
	parallax.offset = transform.position.x; //use mouse position as offset. If the mouse moves so does the parallax scrolling
}

function UpdateGroundedStatus()
{
    //Checks if our empty gameobject groundcheck is overlapping with the ground by creating a tiny circle 
    grounded = Physics2D.OverlapCircle(groundCheckTransform.position, 0.1f, groundCheckLayerMask);
 
    //sets the grounded paremetar of the animator which triggers the animation
    animator.SetBool("grounded", grounded);
}

function AdjustJetpack (jetpackActive: boolean) //will check if we are grounded & turn off jetpack
{
    jetpack.enableEmission = !grounded;
    jetpack.emissionRate = jetpackActive ? 300.0f : 75.0f; 
}

function OnTriggerEnter2D(collider: Collider2D)
{    
    if (collider.gameObject.CompareTag("Coins")) //if we hit the coins call the coin function
        CollectCoin(collider);
    else
        HitByLaser(collider); //if we hit the laser call the laser function which kills us
}
 
function HitByLaser(laserCollider: Collider2D)
{
	if (!dead)
   	laserCollider.gameObject.audio.Play();
    dead = true;
    animator.SetBool("dead", true);
    restartDialog.SetActive(true); //when we die make the restart UI pop up
}

function CollectCoin(coinCollider: Collider2D)
{
    coins++; //adds +1 to each coin we collide with (collect)
 
    Destroy(coinCollider.gameObject); //destroys the coin upon collision
    
    AudioSource.PlayClipAtPoint(coinCollectSound, transform.position); //plays the sound
    
	coinsLabel.text = coins.ToString(); //adds up the coins we get
}

function AdjustFootstepsAndJetpackSound(jetpackActive: boolean)    
{
    footstepsAudio.enabled = !dead && grounded; //play footsteps ONLY if we are alive and grounded
 
    jetpackAudio.enabled =  !dead && !grounded; //play jetpack sound only if we are alive and not grounded
    jetpackAudio.volume = jetpackActive ? 1.0f : 0.5f; //volume of jetpack decreases as we descend     
}

function RestartGame() 
{
    Application.LoadLevel (Application.loadedLevelName); //using NGUI to call this function to restart the current level
}
 
function ExitToMenu()
{
    Application.LoadLevel ("Main Menu"); //using NGUI to call this function to go back to main menu
}

/*
	I feel like a simple code of if(buttonpressed){jetpack force activate} would be far more optimal
	Movement speed should be a line of code, not 3 with 2 variables
*/