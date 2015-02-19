#pragma strict
import System.Collections.Generic;

var availableRooms = new List.<GameObject>(); 
var currentRooms = new List.<GameObject>();  

private var screenWidthInPoints: float;

var availableObjects = new List.<GameObject>(); //will hold all the coin prefabs & lasers to be generated
var objects = new List.<GameObject>();  //will store all the already generated prefabs that are in game 

//will pick a random distance between the last object and the object to be created
var objectsMinDistance: float = 5.0f;    
var objectsMaxDistance: float = 10.0f;

//sets how high/low the objects can spawn within
var objectsMinY: float = -1.4f;
var objectsMaxY: float = 1.4f;

//sets the rotataion between a range
var objectsMinRotation: float = -45.0f;
var objectsMaxRotation: float = 45.0f;


function Start () {
	var height: float = 2.0f * Camera.main.orthographicSize; 
	screenWidthInPoints = height * Camera.main.aspect; //calculates the size of the screen in points
}

function FixedUpdate () {
	GenerateRoomIfRequired(); //periodically checks the function 
	GenerateObjectsIfRequired();
}

function AddRoom( farhtestRoomEndX: float)
{
    //create int var that will randomly select between the list of available rooms
    var randomRoomIndex: int = Random.Range(0, availableRooms.Count);
 
    //will instantiate the gameobject "room" randomly chosen by the above line of code
    var room: GameObject;
    room = Instantiate(availableRooms[randomRoomIndex]);
 
    //will calculate the room by the floor
    var roomWidth: float = room.transform.FindChild("floor").localScale.x;
 
    //set the room half ahead of where the room ends to add the new room? fuck if I know *figure this shit out!*
    var roomCenter: float = farhtestRoomEndX + roomWidth * 0.5f;
 
    //will set the position of the new room, only need x coordinates since y and z stay at 0 *important for cat runner!*
    room.transform.position = new Vector3(roomCenter, 0, 0);
 
    //add the new room to the list of current rooms
    currentRooms.Add(room);         
}

function GenerateRoomIfRequired()
{
    //creates a new list for rooms that need to be removed
    var roomsToRemove = new List.<GameObject>();
 
    //will see if a new room needs to be added (by default true when starting the game)
    var addRooms: boolean = true;        
 
    //saves the player x position
    var playerX: float = transform.position.x;
 
    //point where room should be removed after being certain distance away from mouse
    var removeRoomX: float = playerX - screenWidthInPoints;        
 
    //if there is no room a certain distance ahead of the mouse this var will check that
    var addRoomX: float = playerX + screenWidthInPoints;
 
    //checks where the level currently ends 
    var farthestRoomEndX: float = 0;
 
    for(var room in currentRooms)
    {
        //use the floor to determine how "big" the level is. Determine the room start and room end.
        var roomWidth: float = room.transform.FindChild("floor").localScale.x;
        var roomStartX: float = room.transform.position.x - (roomWidth * 0.5f);    
        var roomEndX: float = roomStartX + roomWidth;                            
 
        //if there are rooms after room start then no need to make new ones yet
        if (roomStartX > addRoomX)
            addRooms = false;
 
        //if room ends is behind the point of the removeroomx var then add it to the list of rooms to be removed
        if (roomEndX < removeRoomX)
            roomsToRemove.Add(room);
 
        //gets the rightmost point of the level
        farthestRoomEndX = Mathf.Max(farthestRoomEndX, roomEndX);
    }
 
    //removes rooms from the list and destroys them
    for(var room in roomsToRemove)
    {
        currentRooms.Remove(room);
        Destroy(room);            
    }
 
    //checks if new room needs to be added
    if (addRooms)
        AddRoom(farthestRoomEndX);
}

function AddObject(lastObjectX: float)
{
    //generates random index for the object to generate
    var randomIndex: int = Random.Range(0, availableObjects.Count);
 
    //creates an instance of the object that was randomly selected
    var obj: GameObject;
    obj = Instantiate(availableObjects[randomIndex]);
 
    //sets the objects position at a random interval & height using the vars we created
    var objectPositionX: float = lastObjectX + Random.Range(objectsMinDistance, objectsMaxDistance);
    var randomY: float = Random.Range(objectsMinY, objectsMaxY);
    obj.transform.position = new Vector3(objectPositionX,randomY,0); 
 
    //adds random rotation to the object
    var rotation: float = Random.Range(objectsMinRotation, objectsMaxRotation);
    obj.transform.rotation = Quaternion.Euler(Vector3.forward * rotation);
 
    //adds the newly created object for tracking & removal
    objects.Add(obj);            
}

function GenerateObjectsIfRequired()
{
    var playerX: float = transform.position.x; //gets player position        
    var removeObjectsX: float = playerX - screenWidthInPoints; //will remove object if it is behind player
    var addObjectX: float = playerX + screenWidthInPoints; //will add object a certain distance ahead of player
    var farthestObjectX: float = 0; //gets the farthest object in the screen and compares it with addobject to see if new objects need to be added
 
    // new list to mark objects for removal
    var objectsToRemove = new List.<GameObject>();
 
    for (var obj in objects)
    {
        //position of the  object
        var objX: float = obj.transform.position.x;
 
        //for each objX you get a maximum objX value in farthestObjectX at the end of the cycle
        farthestObjectX = Mathf.Max(farthestObjectX, objX);
 
        //if obj is far behind it is marked for removal by adding it to the removal list
        if (objX < removeObjectsX)            
            objectsToRemove.Add(obj);
    }
 
    //destroys objects in the remove list
    for (var obj in objectsToRemove)
    {
        objects.Remove(obj);
        Destroy(obj);
    }
 
    //if the playr is about to see the last object & there are no more objects ahead of it then call the code to add more objects
    if (farthestObjectX < addObjectX)
        AddObject(farthestObjectX);
}