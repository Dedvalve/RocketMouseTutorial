#pragma strict
import UnityEngine.UI;

//stores the animations
var startButton: Animator;
var settingsButton: Animator;
var dialog: Animator;
var contentPanel: Animator;
var gearImage: Animator;

function Start()
{	//hides the panel at the start of the game
    var transform: RectTransform = contentPanel.gameObject.transform as RectTransform;        
    var position: Vector2 = transform.anchoredPosition;
    position.y -= transform.rect.height;
    transform.anchoredPosition = position;
}

function startGame () {
	Application.LoadLevel(1); //clicking start loads level 1	
}

function OpenSettings()
{
	//start & settings button are hidden at first to slide in when the scene opens
    startButton.SetBool("isHidden", true);
    settingsButton.SetBool("isHidden", true);
    
    //enables the settings box at the start so we can tell isHidden false - won't show up until after we click setting
    dialog.enabled = true;
    dialog.SetBool("isHidden", false);
}

function CloseSettings()
{
	//closing the settings box brings back our 2 other buttons
    startButton.SetBool("isHidden", false);
    settingsButton.SetBool("isHidden", false);
    dialog.SetBool("isHidden", true);
}
 
function ToggleMenu()
{	//enables the panel at the beginning but set the values to hide from the start so the animation only plays when we press
    contentPanel.enabled = true;
 
    var isHidden: boolean = contentPanel.GetBool("isHidden");
    contentPanel.SetBool("isHidden", !isHidden);
    
    //sets the gear image to true at start
    gearImage.enabled = true;
    gearImage.SetBool("isHidden", !isHidden);
}