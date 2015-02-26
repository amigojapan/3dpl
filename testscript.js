//Copiright Usmar A Padow (amigojapan) usmpadow@gmail.com 2012 - 2015 Released as GPL LGPL in 2015 read COPYING.TXT for details
/*
	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
/*




//perhaps change the implementation so I can stop using quotes using teh getcomponent like this theCamera = GetComponent("MyCamera");
/* 
//implement later
a way where dragging cubes modifies the code
//examples

//How to make a cube (by the way, a line that starts with // is a comment and doesn't do anything
qb("mycube",0,0,0);

//now change the coordinates of mycube so you can see it move aroud for example change one of the 0s to a 1 or 2
qb("mycube",2,0,1);

//blue and green cubes, blue cube rotates, green cube moves left
//Declarations
qb("lynn",0,0,0);cl("lynn",Color.blue);
qb("usmar",2,0,0);cl("usmar",Color.green);
//Update function
rt("lynn",10,10,10);mv("usmar",-1,0,0);

//three cubes
//Declarations
qb("a*",0,0,0);
cl("a", Color.blue);
qb("b",2,1,1);
cl("b", Color.green);
qb("c",-2,-1,-1);
cl("c", Color.red);
//Update
rt("a",10,10,10);
rt("b",-10,-10,-10);
rt("c",10,10,10);

//car
//Declarations
ra("carbody",4,8);cl("carbody",Color.green);

ra("carroof",4,4);cl("carroof",Color.red);
an("carbody",90,90,0);
an("carroof",90,90,0);
cp("carbody",0,-1,0);
qb("tire1",-4,-2,-2);cl("tire1",Color.black);
qb("tire2",4,-2,-2);cl("tire2",Color.black);
an("tire1",90,90,0);
an("tire2",90,90,0);
//Update function
//rt("tire1",0,0,50);
//rt("tire2",0,0,50);
mv("carbody",0,1,0);
mv("carroof",0,1,0);
mv("tire1",0,1,0);
mv("tire2",0,1,0);
rt("tire1",0,0,50);
rt("tire2",0,0,50);

//example for real time evaluation
//Declatations (type it by hand letter by letter)
qb("cube1",0,0,0);
qb("cube2",3,0,0);
qb("cube1",-2,0,0);
cl("cube1",Color.green);
sc("cube2",2,1,1);
an("cube2",0,0,45);
//Update function (click START when you finish typing this)
rt("cube1",20,20,20);
mv("cube2",1,0,0);

//example with a function
//declarations
function blue(name) {
  cl(name,Color.blue);
}
qb("ino",2,2,2);qb("ino",-5,2,10);
blue("ino");
qb("ino2",5,2,2);
sc("ino2",3,2,2);
var a=0;
while(a<5) { a++; qb("a",a,a,a); }
for(b=0;b<6;b--) { qb("b",b,b,b); }
//update function
rt("ino",50,50,50);
mv("ino2",20,20,20);
rt("a",90,90,90);
rt("b",-90,-90,-90);
*/

/* things to do:
add load and save script options
add warning when program wont evaluate and perhaps the reason why
add a function to make transparent and invisible blocks
add collision detection
add a way to move the camera, probably with the same functions I used to move the cubes
*/
//public variables
import System;
import System.IO;
import System.Xml.Serialization;
import System.IO.Stream;
import System.Runtime.Serialization;
import System.Runtime.Serialization.Formatters.Binary;
import System.Collections.Generic; 

var ShowMainMenu=true;
var ShowAboutScreen=false;
var ShowCreativeModeMenu=false;
private var AboutBoxContent="3dpl - The 3d programming language.\nVersion Beta 3.1.1.\nCopyright 2012 by Usmar A. Padow (amigojapan) usmpadow@gmail.com\nHelp by Gregory Cox.\nPatrick Robotham.\nMusic from NathanWillsMusic.com";
var www;
var ShowDownloadMenu=false;
var ShowDescriptionAndDownloadMenu=false;
var ShowloginMenu=false;
var Message="";
var ShowMessageBox=false;
var InputEmail="";
var InputPassword="";
var LoginSuccesful=false;
var ShowInputBox=false;
var ShowFileDialog=false;
var UserInput=""; 
var InputAction="";
var EditBig=false;
var ShowDebug=false;
// The variable to control where the scrollview 'looks' into its child elements.
var scrollPosition : Vector2;
var scrollPositionFileDialog : Vector2;
var MemoryLeakScoll : Vector2;
// The string to display inside the scrollview. 2 buttons below add & clear this string.
var debugString = "Debug info:";
var path:String ="No path set";
var ObjectEditorMode=false;
//teleport
var TeleportX:String="0";
var TeleportY:String="1";
var TeleportZ:String="-10";
//ObjectBuilder
var CurrentCubesName:String="FailedToGiveACubeName";
var CurrentTextureWebOrFile:String="File";
var CurrentTextureName:String="";
var Currentalpha:String="1.0";
var CurrentRedValue:String="255";
var CurrentGreenValue:String="255";
var CurrentBlueValue:String="255";
var CurrentWrapOnSides:String="1";
var GiudingGreenLight:String ="Off";
//Map Editor
var ShowMapEditor:boolean=false;
var ShowProgrammingMode=false;
var CurrentObjFilename="";
var dataPath:String="No data path set";
//var scrollPositionMapObjects:Vector2;
//Map Editor Class
class MapObject {
  //@XmlAttribute("objfilename")
  public var objfilename="";  
  //@XmlAttribute("instancename")
  public var instancename="";
  //@XmlAttribute("x")
  public var x:int;
  //@XmlAttribute("y")
  public var y:int;
  //@XmlAttribute("z")
  public var z:int;
  
  public var rotx:int;
  
  public var roty:int;
  
  public var rotz:int;
}
//@XmlArray("MapObjectList")
//@XmlArrayItem("MapObject")
var MapObjectBuilderList : System.Collections.Generic.List.<MapObject>; 
MapObjectBuilderList = new System.Collections.Generic.List.<MapObject>();
var MapLoadedObjectsList = new System.Collections.Generic.List.<String>();

//Object Builder
//ObjectBuilderDeclarations+="var a : System.Collections.Generic.List.<Object> = new System.Collections.Generic.List.<Object>();\n";
//ObjectBuilderDeclarations+="vars[\"cubesarray\"]= a;\n";
//@XmlAttribute("Coordinates")
class LoadedTexture {
	public var TextureName:String=null;
	public var Texture_ : Texture;
}
var LoadedTextureList= new System.Collections.Generic.List.<LoadedTexture>();

class LoadedSound {
	public var FileName:String=null;
	public var AudioClip_ : AudioClip;
}
var LoadedSoundList= new System.Collections.Generic.List.<LoadedSound>();


//Object Builder Class
class Coordinates {
  @XmlAttribute("cubename")
  public var cubename="";  
  @XmlAttribute("x")
  public var x:int;
  @XmlAttribute("y")
  public var y:int;
  @XmlAttribute("z")
  public var z:int;
  @XmlAttribute("r")
  public var r : int=255;
  @XmlAttribute("g")
  public var g : int=255;
  @XmlAttribute("b")
  public var b : int=255;
  @XmlAttribute("TextureName")
  public var TextureName="";
  @XmlAttribute("TextureWebOrFile")
  public var TextureWebOrFile="File";  
  @XmlAttribute("alpha")
  var alpha:float=1.0;
  @XmlAttribute("WrapOnSides")
  var WrapOnSides:int=1;
  //add a parent property, that will point to the name of the AxisPoint, 
  //the AxisPoint will have no @arent, but the name should be the "name of teh object"
  //hmm, but I guess the name of hte AtcisPoint should be different for each instance of the object instatiated in 3dpl
  //maybe add anothe field called ObjectName or something...
  //also make a unique ID (I can just store the cube ID in cubename property)http://answers.unity3d.com/questions/246116/how-can-i-generate-a-guid-or-a-uuid-from-within-un.html
  //System.GUID.newGUID()
}
@XmlArray("ObjectList")
@XmlArrayItem("Object")
var ObjectBuilderList : System.Collections.Generic.List.<Coordinates>; 
ObjectBuilderList= new System.Collections.Generic.List.<Coordinates>();


//Binary files
class SaveLoad {
        public static function SaveFile(filename:String, obj:Object):void {
                try {
                        //Debug.Log("Writing Stream to Disk.", SaveLoad);
                        var fileStream:Stream = File.Open(filename, FileMode.Create);
                        var formatter:BinaryFormatter = new BinaryFormatter();
                        formatter.Serialize(fileStream, obj);
                        fileStream.Close();
                } catch(e:Exception) {
                        Debug.LogWarning("Save.SaveFile(): Failed to serialize object to a file " + filename + " (Reason: " + e.ToString() + ")");
                }
        }

        public static function LoadFile(filename:String):Object {
                try {
                        //Debug.Log("Reading Stream from Disk.", SaveLoad);
                        var fileStream:Stream = File.Open(filename, FileMode.Open, FileAccess.Read);
                        var formatter:BinaryFormatter = new BinaryFormatter();
                        var obj:Object= formatter.Deserialize(fileStream);
                        fileStream.Close();
                        return obj;
                } catch(e:Exception) {
                        Debug.LogWarning("SaveLoad.LoadFile(): Failed to deserialize a file " + filename + " (Reason: " + e.ToString() + ")");
                        return null;
                }       
        }
}


function Start() {
/*
	var test2 = new Coordinates();
	test2.cubename="Test456";
*/
	//var test = new MapObject();
	//test.objfilename="testing 123";
	//Debug.Log(test.objfilename);
	//AboutBoxContent+="here1";
	#if UNITY_STANDALONE_OSX
		//import System.IO;
		var Dir:DirectoryInfo = new DirectoryInfo(Application.dataPath);
		path = Dir.Parent.Parent.ToString()+"/Assets";
		//path = "/Users/amigojapan/Desktop/3dpl GPL/Assets/";
    	AboutBoxContent+="\n\nMac Data Folder:" + path;
    #endif
	dataPath=path;
	
	CubeMaterial = new Material (Shader.Find ("Transparent/Diffuse"));
	//AboutBoxContent+="here3";
    CubeMaterial.color = Color.white;
 	//AboutBoxContent+="here2";

    if (Application.platform == RuntimePlatform.WindowsPlayer || Application.platform == RuntimePlatform.LinuxPlayer) {
           dataPath=path;
           AboutBoxContent+="\n\nData Folder:"+dataPath;
    }
	position = Rect((Screen.width - crosshairTexture.width) / 2, (Screen.height - 
        crosshairTexture.height) /2, crosshairTexture.width, crosshairTexture.height);
}

var CubeMaterial:Material;//assigned in Start() function
function qb(name : String,x,y,z) {
	//create cube
	//example qb("mytag",1,1,1);
	var cube : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
    cube.transform.position = Vector3(x, y, z);
    cube.transform.name=name;
    
    
    //var material = new Material (Shader.Find ("Transparent/Diffuse"));
    //material.color = Color.white;
    // assign the material to the renderer
    //cube.renderer.material = material;
	cube.renderer.material = CubeMaterial;

    
    cubes.push(cube);
    //cube.renderer.material.
    //cube.renderer.material.shader = Shader.Find("Diffuse");
    //cube.renderer.material.color = Color.green;
    return cube;
    //move
    //cube.transform.Translate(0,10*Time.deltaTime,0);
}

function Unlisted_qb(name : String,x,y,z) {
	//create cube
	//example qb("mytag",1,1,1);
	var cube : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
    cube.transform.position = Vector3(x, y, z);
    cube.transform.name=name;
    
    
    var material = new Material (Shader.Find ("Transparent/Diffuse"));
    material.color = Color.white;
    // assign the material to the renderer
    cube.renderer.material = material;

    
    //cubes.push(cube);
    //cube.renderer.material.
    //cube.renderer.material.shader = Shader.Find("Diffuse");
    //cube.renderer.material.color = Color.green;
    return cube;
    //move
    //cube.transform.Translate(0,10*Time.deltaTime,0);
}

function RenderObject(UserDefinedObjectName:String, objlist:System.Collections.Generic.List.<Coordinates>, x:float, y:float, z:float) : GameObject {
	//Render cubes
	for(cords in objlist) {
    	if(cords.cubename=="AxisPoint") {
	    	var AxisPoint = qb(UserDefinedObjectName,0,0,0);// I think the bug is because AxisPoint is a cube at this point and gets deleted
	    	alpha(UserDefinedObjectName,0.0);//Make the AxisPoint invisible
	    	cubes.RemoveAt(cubes.length-1);//make it unlisted
	    	continue;
	    }
	    /*
    	if(cords.cubename.Substring(0,"collider".Length) =="collider") {//make colliders invisible
	    	qb(UserDefinedObjectName,0,0,0);
	    	alpha(UserDefinedObjectName,0.0);
	    	continue;
	    }
	    */
    	var ChildCube:GameObject=qb(cords.cubename, cords.x,cords.y,cords.z);
		if(cords.r!=255||cords.g!=255||cords.b!=255) cl(cords.cubename, Color32(cords.r,cords.g,cords.b,255));
		if(cords.alpha!=1.0) alpha(cords.cubename, cords.alpha);
		if(cords.TextureName!="") tx(cords.cubename, cords.TextureName,cords.TextureWebOrFile,cords.WrapOnSides);
		ChildCube.transform.parent = AxisPoint.transform;
    	if(cords.cubename.Substring(0,"collider".Length) =="collider") {//make colliders invisible
	    	alpha(cords.cubename,0.0);
		}
		cubes.RemoveAt(cubes.length-1);
	}
	AxisPoint.transform.position.x=x;
	AxisPoint.transform.position.y=y;
	AxisPoint.transform.position.z=z;
	return AxisPoint;
}

var MapParent:GameObject;
var MapName:String;
function Map(FileName:String,InstanceName:String,x:float, y:float, z:float) {//maybe should return object TODO
	//Renders a map made in teh Map Editor, use "Original Names" as the InstanceName if you want to keep the original names set in the map editor
	MapName=InstanceName;
	MapObjectBuilderList=SaveLoad.LoadFile(dataPath+"/Maps/"+FileName);
	//Render objects
	var myObj:GameObject;

	MapName=InstanceName;
	MapParent=qb("MapParent",0,0,10000000);
	alpha("MapParent",0.0);
	for(cords in MapObjectBuilderList) {
		if(InstanceName=="Original Names") {			 
			myObj=Obj(cords.objfilename,cords.instancename,cords.x,cords.y,cords.z);
		}
		else{
			myObj=Obj(cords.objfilename,InstanceName,cords.x,cords.y,cords.z);
		}
		myObj.transform.parent=MapParent.transform;
		myObj.transform.rotation = Quaternion.Euler(cords.rotx,cords.roty,cords.rotz);	
	}
}

class LoadedObject {
	public var ObjectName:String=null;
	//public var Object : System.Collections.Generic.List.<Coordinates>;
	public var Object : GameObject;
}
var LoadedObjectList= new System.Collections.Generic.List.<LoadedObject>();

/*
class ObjectInstances {
	public var InstanceName:String=null;
	public var ChildrenNames = new System.Collections.Generic.List.<String>();
}
var InstantiatedObjects= new System.Collections.Generic.List.<ObjectInstances>();
*/

var InstanceNameList= new System.Collections.Generic.List.<String>();
function CloneObject(obj:GameObject,InstanceName:String, x:float, y:float, z:float):GameObject {
		//var tmp:GameObject=GameObject.Find(FileName);//null ,the error is here, it seems it can't find the object after it has done cs(), I think it s because when the other objects got deleted. the inheritance caused this object to be deleted too
		var newobj:GameObject=Instantiate (obj, Vector3(x, y, z), Quaternion.identity);
		newobj.name=InstanceName;
		cubes.push(newobj);//put the object in the cubes array so it gets treated like a cube(TODO:rename cubes array to objects)
		//cubes.push(newobj);
		InstanceNameList.Add(InstanceName);
		return	newobj;
}

function Obj(FileName:String,InstanceName:String, x:float, y:float, z:float):GameObject {
	//example XMLObj("MyObject.xml","InstanceName",x,y,z);
	var objectFound=false;
	var obj:LoadedObject;
	var newobj:GameObject;
	for(obj in LoadedObjectList) {
		if(obj.ObjectName==FileName) {
			//RenderObject(InstanceName,obj.Object,x,y,z);
			newobj= CloneObject(obj.Object,InstanceName, x, y, z);
			objectFound=true;
			return newobj;
		}
	}	
	if(!objectFound) {
		var path = dataPath+"/Objects/";        
		var obj2 = SaveLoad.LoadFile(path+FileName);
		
		//render object
		var go:GameObject=RenderObject(FileName,obj2,0,0,1000000000);//hack,render an object with the file name as the axis name in a place where it is not visible
		lo= new LoadedObject();
		lo.ObjectName=FileName;
		lo.Object=go;
		LoadedObjectList.Add(lo);
		newobj=CloneObject(go,InstanceName, x, y, z);
		return newobj;
	}

}

function XMLObj(FileName:String,InstanceName:String, x:float, y:float, z:float):GameObject {
	//example XMLObj("MyObject.xml","InstanceName",x,y,z);
	var objectFound=false;
	var obj:LoadedObject;
	var newobj:GameObject;
	for(obj in LoadedObjectList) {
		if(obj.ObjectName==FileName) {
			//RenderObject(InstanceName,obj.Object,x,y,z);
			newobj= CloneObject(obj.Object,InstanceName, x, y, z);
			objectFound=true;
			return newobj;
		}
	}	
	if(!objectFound) {
		var path = dataPath+"/Objects/";
        serializer = new XmlSerializer(typeof(System.Collections.Generic.List.<Coordinates>));	                
        reader = new FileStream(path+FileName, FileMode.Open);
		//serializer.Serialize(writer, ObjectBuilderList);
		var obj2 = serializer.Deserialize(reader) as System.Collections.Generic.List.<Coordinates>;
		reader.Close();
		
		//render object
		var go:GameObject=RenderObject(FileName,obj2,0,0,1000000000);//hack,render an object with the file name as the axis name in a place where it is not visible
		lo= new LoadedObject();
		lo.ObjectName=FileName;
		lo.Object=go;
		LoadedObjectList.Add(lo);
		newobj=CloneObject(go,InstanceName, x, y, z);
		return newobj;
	}

}
function alpha(name : String, alpha_ : float) {//sets alpha channel of a cube(this function made by patrick)
	//Example: makes a half transparent cube
	//qb("test",-0.5,1,0);
	//cl("test", Color.green);
	//alpha("test", 0.5);
    for (cube in cubes) {
      if (cube.transform.name == name) cube.renderer.material.color.a = alpha_;
    }
}

function cl(name : String,color_:Color) {
	//set a cube color
	//example qb("cars",0,0,0);qb("cars",2,0,0);qb("planes",4,0,0);cl("cars",Color.red);
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==name) cube.renderer.material.color = color_;
	}
}

function mv(name : String, x : float, y : float, z : float){
    //move
	//example
	//Declarations
	//qb("cars",0,0,0);qb("cars",2,0,0);qb("planes",4,0,0);cl("cars",Color.red);
	//Update function
	//mv("cars",10,10,10);
	if(name=="camera") {
		var theCamera : GameObject = Camera.main.gameObject;
		theCamera.transform.Translate(x*Time.deltaTime,y*Time.deltaTime,z*Time.deltaTime);
		return;
	}
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	 if(cube.transform.name==name) cube.transform.Translate(x*Time.deltaTime,y*Time.deltaTime,z*Time.deltaTime);
	}
}

function rt(name : String, x : float, y : float, z : float){
    //rotate
	//example
	//Declarations
	//qb("cars",0,0,0);qb("cars",2,0,0);qb("planes",4,0,0);cl("cars",Color.red);
	//Update function
	//rt("cars",10,10,10);
	if(name=="camera") {
		var theCamera : GameObject = Camera.main.gameObject;
		theCamera.transform.transform.Rotate(x*Time.deltaTime,y*Time.deltaTime,z*Time.deltaTime);
		return;
	}
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==name) cube.transform.Rotate(x*Time.deltaTime,y*Time.deltaTime,z*Time.deltaTime);
	}
}

function WrapTextureArdound6Sides(cube:GameObject) {	
	  var theMesh : Mesh;
	    theMesh = cube.transform.GetComponent(MeshFilter).mesh as Mesh;
	   cube.renderer.material.mainTexture.wrapMode = TextureWrapMode.Clamp;
	    // Now store a local reference for the UVs
	    var theUVs : Vector2[] = new Vector2[theMesh.uv.Length];
	    //debugString=theMesh.uv.Length.ToString();//displays 24 verices
	    theUVs = theMesh.uv;
	//Unity UV's are up-side-down. So the top of your picture is 0,1 and the bottom is 1,0. This just makes it even more confusing!
	
	//Ok so imagine this is the picture/texture/material :
	
	// 0,0 ------------ 1,0
	//     |          |
	//     |   PIC    |
	//     |          |
	// 0,1 ------------ 1,1
	//In unity it is actually
	
	// 0,1 ------------ 1,1
	//     |          |
	//     |   PIC    |
	//     |          |
	// 0,0 ------------ 1,0
	    // set UV co-ordinates
	/*
	2 -----1/10 ------- 9/6 -------- 5
	| FRONT  |  BACK     |   TOP      |
	0/14--3/8/13/18---11/4/17/22 ----7/21
	| BOTTOM |    LEFT   |   RIGHT    |
	12-------15/16------19/20----------22
	*/
	
	// Back Face
	theUVs[0] = Vector2(0.333,0.5);
	theUVs[1] = Vector2(0.666,1);
	theUVs[2] = Vector2(0.333,1);
	theUVs[3] = Vector2(0.666,0.5);
	
	// Top Face
	theUVs[4] = Vector2(0.666,0.5);
	theUVs[5] = Vector2(1,1);
	theUVs[6] = Vector2(0.666,1);
	theUVs[7] = Vector2(1,0.5);
	
	
	// Front Face
	theUVs[8] = Vector2(0,0.5);
	theUVs[9] = Vector2(0.333,1);
	theUVs[10] = Vector2(0,1);
	theUVs[11] = Vector2(0.333,0.5);
	
	// Bottom Face
	theUVs[12] = Vector2(0,0);
	theUVs[13] = Vector2(0.333,0.5);
	theUVs[14] = Vector2(0,0.5);
	theUVs[15] = Vector2(0.333,0);
	
	// Left Face
	
	theUVs[16] = Vector2(0.33,0);
	theUVs[17] = Vector2(0.66,0.5);
	theUVs[18] = Vector2(0.33,0.5);
	theUVs[19] = Vector2(0.66,0);
	
	// Right Face
	
	theUVs[20] = Vector2(0.66,0);
	theUVs[21] = Vector2(1,0.5);
	theUVs[22] = Vector2(0.66,0.5);
	theUVs[23] = Vector2(1,0);
	
	
	    // Assign the mesh its new UVs
	    theMesh.uv = theUVs;
}
function tx(name : String, textureFilenameOrUrl : String, source : String, WrapOnSides:int) {//since Beta 1.3
	//qb("brick",0,0,0);
	//tx("brick", "brick.png", "File", 1);
	//tx("brick", "brick.png", "File", 6);	
	var textureFound=false;
	for(var texture__:LoadedTexture in LoadedTextureList) {
		if(texture__.TextureName==textureFilenameOrUrl) {
		    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
		    	if(cube.transform.name==name) {
		    		cube.renderer.material.mainTexture = texture__.Texture_;
		    		if(WrapOnSides==6) WrapTextureArdound6Sides(cube);
		    		textureFound=true;
		    	}
			}
		}
	}	
	if(!textureFound) {
		var path = dataPath+"/Textures/";
		var url ="";
		if(source=="Web") {
			url=textureFilenameOrUrl;
		} else {//it will try to red it from the web
			url = "file://"+path+textureFilenameOrUrl;
		}
		//Debug.Log(url);
		
		geturl(url);
		var loadedtexture = new LoadedTexture();
		loadedtexture.TextureName=textureFilenameOrUrl;
		loadedtexture.Texture_=www.texture;
		LoadedTextureList.Add(loadedtexture);
		//You can then read out the www.texture value once the www request has completed. For example:
	     // Start a download of the given URL
	    //var www : WWW = new WWW (url);
	 
	    // Wait for download to complete
	    //yield www;
	 
	    // assign texture
	    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
	    	if(cube.transform.name==name&&!textureFound) {
	    		cube.renderer.material.mainTexture = www.texture;
	    		if(WrapOnSides==6) WrapTextureArdound6Sides(cube);
	    	}
		}
	}
}

function ra(name: String,width:int,height:int) {
	//rectangle 
	//example 	
	//ra("myRectangle",2,3);
	var cube : GameObject=qb(name,0,0,0);
	cube.transform.name=name;
	sc(name,width,height,0);
	return cube;

	/*
	//, this function may not be very useful since it it hard to rotate the whole rectangle in 3d space, insted single rectangles are rotated
		for(x=0;x<=width-1;x++) {
		for(y=0;y<=height-1;y++) {
			var cube : GameObject=qb(name,x,y,0);
			cube.transform.name=name;
			cl(name,color_);
		}
	}
	*/
}


function cp(name : String, x : float, y : float, z : float) {//name: String, x,y,z
    //Change position
	//example
	//Declarations
	//ra("myRectangle",Color.green,10,10);cp("myRectangle",10, 10, 10);
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==name) cube.transform.position = Vector3(x, y, z);
	}
} 
function sc(name : String, x : float, y : float, z : float) {//name: String, x,y,z
    //Scale a cube
	//example
	//Declarations
	//qb("myRectangle",10,10,10);sc("myRectangle",100,10,10);
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==name) cube.transform.localScale += Vector3(x,y,z);
	}
}

function an(name : String, x : float, y : float, z : float) {//name: String, x,y,z
    //Change euler angle argument must be from 0 to 360 degrees
	//example
	//Declarations
	//ra("myRectangle",Color.green,10,10);an("myRectangle",25,10,10);
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==name) cube.transform.eulerAngles = Vector3(x, y, z);
	}
}


function SetSkyNone() {
	RenderSettings.skybox= null;
}

public var Sunny1:Material;
function SetSkySunny1() {
	RenderSettings.skybox= Sunny1;
}

public var Sunny2:Material;
function SetSkySunny2() {
	RenderSettings.skybox= Sunny2;
}

public var Sunny3:Material;
function SetSkySunny3() {
	RenderSettings.skybox= Sunny3;
}

public var Overcast1:Material;
function SetSkyOvercast1() {
	RenderSettings.skybox= Overcast1;
}

public var Overcast2:Material;
function SetSkyOvercast2() {
	RenderSettings.skybox= Overcast2;
}

public var DawnDusk:Material;
function SetSkyDawnDusk() {
	RenderSettings.skybox= DawnDusk;
}

public var Eeire:Material;
function SetSkyEeire() {
	RenderSettings.skybox= Eeire;
}

public var MoonShine:Material;
function SetSkyMoonShine() {
	RenderSettings.skybox= MoonShine;
}

public var StarryNight:Material;
function SetSkyStarryNight() {
	RenderSettings.skybox= StarryNight;
}


function AttachSoundToCamera(FileName : String){
	var SoundFound=false;
	for(var sound__:LoadedSound in LoadedSoundList) {
		if(sound__.FileName==FileName) {
		    		Camera.main.gameObject.AddComponent("AudioSource");
		    		Camera.main.gameObject.audio.volume=1;
		    		Camera.main.gameObject.audio.clip = sound__.AudioClip_;
		    		SoundFound=true;
		}
	}	
	if(!SoundFound) {
		Camera.main.gameObject.AddComponent("AudioSource");
		var www : WWW = new WWW("file://"+dataPath+"/Audio/"+FileName);
		while(!www.isDone);
		Camera.main.gameObject.audio.clip = www.audioClip;
		//UnityEngine.Resources.Load("testsound") as AudioClip;
		Camera.main.gameObject.audio.volume=1;
		if(Camera.main.gameObject.audio.clip==null) throw("Error happened when loading "+"file://"+dataPath+"/Audio/"+FileName);

		var loadedsound = new LoadedSound();
		loadedsound.FileName=FileName;
		loadedsound.AudioClip_ = www.audioClip;
		LoadedSoundList.Add(loadedsound);
	}
}

function AttachSound(CubeName : String, FileName : String){
	if(CubeName=="camera") {
		AttachSoundToCamera(FileName);
		return;
	}
	var SoundFound=false;
	for(var sound__:LoadedSound in LoadedSoundList) {
		if(sound__.FileName==FileName) {
		    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
		    	if(cube.transform.name==name) {
		    		cube.AddComponent("AudioSource");
		    		cube.audio.volume=1;
		    		cube.audio.clip = sound__.AudioClip_;
		    		SoundFound=true;
		    	}
			}
		}
	}	
	if(!SoundFound) {
		var obj:GameObject;
	    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
	    	if(cube.transform.name==CubeName) obj=cube;
		}	
		obj.AddComponent("AudioSource");
		var www : WWW = new WWW("file://"+dataPath+"/Audio/"+FileName);
		while(!www.isDone);
		obj.audio.clip = www.audioClip;
		//UnityEngine.Resources.Load("testsound") as AudioClip;
		obj.audio.volume=1;
		if(obj.audio.clip==null) throw("Error happened when loading "+"file://"+dataPath+"/Audio/"+FileName);

		var loadedsound = new LoadedSound();
		loadedsound.FileName=FileName;
		loadedsound.AudioClip_ = www.audioClip;
		LoadedSoundList.Add(loadedsound);
	}
}

function PlaySound(cubeName : String){
	var obj:GameObject;
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==cubeName) obj=cube;
	}
	if(cubeName=="camera") obj = Camera.main.gameObject;
	if(!obj.audio.isPlaying && obj.audio.clip.isReadyToPlay)
		obj.audio.Play();
}

function PlaySoundLoop(cubeName : String){
	var obj:GameObject;
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==cubeName) obj=cube;
	}
	if(cubeName=="camera") obj = Camera.main.gameObject;
	if(!obj.audio.isPlaying && obj.audio.clip.isReadyToPlay) {
		obj.audio.loop=true;
		obj.audio.Play();
	}
}

function StopSound(cubeName : String){
	var obj:GameObject;
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==cubeName) obj=cube;
	}
	if(cubeName=="camera") obj = Camera.main.gameObject;
	if(obj.audio.isPlaying && obj.audio.clip.isReadyToPlay) {
		obj.audio.loop=false;
		obj.audio.Stop();
	}
}
function SetPitch(cubeName : String, Pitch:float){
	var obj:GameObject;
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==cubeName) obj=cube;
	}
	if(cubeName=="camera") obj = Camera.main.gameObject;
	obj.audio.pitch=Pitch;
}

function SetVolume(cubeName : String, Volume:float){
	var obj:GameObject;
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==cubeName) obj=cube;
	}
	if(cubeName=="camera") obj = Camera.main.gameObject;
	obj.audio.volume=Volume;
}

function cd(nameA : String, nameB : String):boolean {
	//Collision Detecter
		//gives the distance between the red cube and the blue cube, when distance reaches 0 it means there was a collision
//cubes[0]=qb(1,1,1);cubes[1]=qb(3,1,1);cl(cubes[0],Color.red);cl(cubes[1],Color.blue);
//mv(cubes[1],-1,0,0);
//print(Vector3.Distance(cubes[0].transform.position,cubes[1].transform.position));
	//var sizeofcube : float =1.0;
	//var sizeofcube : float =1.0;
	var cubeA:GameObject;
	var cubeB:GameObject;
	if(nameA=="camera") {
		var sizeofcube =1.3;//this is a hack to avoid comming too close
		var theCamera : GameObject = Camera.main.gameObject;
		cubeA=theCamera;
		for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
			if(nameB=="ObjectEditorCubes") {
				if(cube.transform.name!="guide") {
					cubeB=cube;
					if(Vector3.Distance(cubeA.transform.position ,cubeB.transform.position)<=sizeofcube) return true;				
				}
				continue;
			}
			if(cube.transform.name==nameB) {
				cubeB=cube;
				if(Vector3.Distance(cubeA.transform.position ,cubeB.transform.position)<=sizeofcube) return true;
			} 
		}
		return false;

	}
	var boundsA: Bounds;
    var boundsB: Bounds;
	if(nameB==MapName) { 
		boundsA = Bounds(cubeA.transform.position, cubeA.transform.localScale);
		//You can loop over all children:
		for (var child : Transform in MapParent.transform) {
				for (var childofchild : Transform in child) {
			    	ChildBounds = Bounds(childofchild.transform.position, childofchild.transform.localScale);
					if(boundsA.Intersects(ChildBounds)) return true;
				}
		    //ChildBounds = Bounds(child.transform.position, child.transform.localScale);
			//if(boundsA.Intersects(ChildBounds)) return true;
		}
	}	

    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==nameA) cubeA=cube;
	}
			
    for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==nameB) {
    		cubeB=cube;
    		boundsA = Bounds(cubeA.transform.position, cubeA.transform.localScale);
    		boundsB = Bounds(cubeB.transform.position, cubeB.transform.localScale);
    		if(boundsA.Intersects(boundsB)) return true;
    		//You can loop over all children:
    		if(nameB==MapName) cubeB=MapParent;
			for (var child : Transform in cubeB.transform) {
			    ChildBounds = Bounds(child.transform.position, child.transform.localScale);
    			if(boundsA.Intersects(ChildBounds)) return true;
			}
    	} 
	}
	return false;
}

function cdcgo(Obj:GameObject):boolean {
	//Collision Detecter camera game object
	if(!Obj) return false;
	var cubeA:GameObject;
	var cubeB:GameObject;
	var sizeofcube =1.3;//this is a hack to avoid comming too close
	var theCamera : GameObject = Camera.main.gameObject;
	cubeA=theCamera;
	cubeB=Obj;
	if(Vector3.Distance(cubeA.transform.position ,cubeB.transform.position)<=sizeofcube) return true;				
	return false;
}

function cdoocwc(Obj:GameObject, ColliderName : String):boolean {//collider_trap
	//Collision Detecter Other objects's colider with camera
	if(!Obj) return false;
	var cubeA:GameObject;
	var TransformB:Transform;
	var sizeofcube =1.3;//this is a hack to avoid comming too close
	var theCamera : GameObject = Camera.main.gameObject;
	cubeA=theCamera;
	TransformB=Obj.transform.Find(ColliderName);
	if(Vector3.Distance(cubeA.transform.position ,TransformB.position)<=sizeofcube) return true;				
	return false;
}

function cdcm(Obj:GameObject, ColliderName : String):boolean {
	//Collision Detecter Collider with Map
	var transformA:Transform;
	var cubeB:GameObject;
	var boundsA: Bounds;
    var boundsB: Bounds;
    
    transformA=Obj.transform.Find(ColliderName);
    
	boundsA = Bounds(transformA.position, transformA.localScale);
	//You can loop over all children:
	for (var child : Transform in MapParent.transform) {
		for (var childofchild : Transform in child) {
	    	ChildBounds = Bounds(childofchild.transform.position, childofchild.transform.localScale);
			if(boundsA.Intersects(ChildBounds)) return true;
		}
	}
	return false;	
}

function cdco(Obj1:GameObject, ColliderName : String,Obj2:GameObject):boolean {
	//Collision Detecter Collider with Object
	var transformA:Transform;
	var cubeB:GameObject;
	var boundsA: Bounds;
    var boundsB: Bounds;
    
    transformA=Obj1.transform.Find(ColliderName);
    
	boundsA = Bounds(transformA.position, transformA.localScale);
	//You can loop over all children:
	/*
	for (var child : Transform in Obj2.transform) {
		for (var childofchild : Transform in child) {
	    	ChildBounds = Bounds(childofchild.transform.position, childofchild.transform.localScale);
			if(boundsA.Intersects(ChildBounds)) return true;
		}
	}
	*/
	for (var child : Transform in Obj2.transform) {
	    	ChildBounds = Bounds(child.transform.position, child.transform.localScale);
			if(boundsA.Intersects(ChildBounds)) return true;
	}
	
	return false;	
}


executing = false;
//var declarations : String = "cubes[0]=qb(1,1,1);\r\ncubes[1]=qb(5,1,1);";
//var upd : String = "mv(cubes[0],-1,-1,-1);\r\nmv(cubes[1],1,1,1);";
var declarations = "";
var PostProssesdeclarations : String = "";
var upd = "";
var olddeclarations = "";
var oldupd = "";
var executing=false;
var loopstarttime : double;
var now : double;
var GiudingGreenLightChange:boolean=true;
//var originalCamPos : Vector3;
//var firstrun=false;
//var obj = new Object();//object that holds cubes
//obj.q=10;
//var obj = {"q": 1};
//Debug.Log("Script Changed");
var cubes = new Array();
//static var vars = new Array();//<GeDaMo> COuld vars be an object? Then you could do vars.a = 1;
//class VariablesClass {}
//var varsobj= new VariablesClass();
//var varsobj=new Object();
var vars = new Hashtable();
var timeout : double=2;//ten seconds(probably want to make this a global variable so the user can set it if he knows the for loop is going to take more than 2 seconds, but 2 seconds seems resonable to wait if you made an infinite loop

var old_pointer;
var DrawMovingGuide:String="Off";
function draw_pointer() {
	if(ex("pointer")) dl("pointer");
	vars["pointer"]=qb("pointer",
	Mathf.Round(vars["guide"].transform.position.x),
	Mathf.Round(vars["guide"].transform.position.y),
	Mathf.Round(vars["guide"].transform.position.z));
	cl("pointer", Color.red);
	alpha("pointer", 0.4);
	//if(DrawMovingGuide=="Off") dl("guide");
	if(DrawMovingGuide=="Off") eq("guide","camera");
	old_pointer= vars["pointer"];
}

var crosshairTexture : Texture2D;
var Texture2D_Title : Texture2D;
var Texture_btnGameMode : Texture;
var Texture_btnCreativeMode : Texture;
var Texture_btn3dplMode : Texture;
var Texture_btnObjectEditor : Texture;
var Texture_btnMapEditor : Texture;
var position : Rect;
static var OriginalOn = false;
function draw_guide() {
	/*
	if(!ex("guide")){
		vars["guide"]=qb("guide",0,0,0);
		eq("guide","camera");//sets the bullet rotation and location to the same as the camera\n";
		cl("guide", Color.green);
	}
	if(GiudingGreenLightChange==true) {
		if(GiudingGreenLight=="On")
			alpha("guide", 0.05);
		else
			alpha("guide", 0.0);
		GiudingGreenLightChange=false;
	}
	if(GiudingGreenLight=="On")
		mv("guide",0,0,5);
	else
		mv("guide",0,0,20);//Guide speed
	if(Vector3.Distance(vars["camera"].transform.position ,vars["guide"].transform.position)>=4.0) {
		draw_pointer();
	}
	*/
	// returns a point exactly 2 meters in front of the camera:1
	var point = Camera.main.ViewportToWorldPoint(Vector3(0.5, 0.5, 4.0));
	if(!ex("guide")) {
		vars["guide"]=qb("guide",point.x,point.y,point.z);
		cl("guide", Color.green);
		alpha("guide", 0.0);
	} else {
		sp("guide",point.x,point.y,point.z);
	}
	draw_pointer();
}
function GetUniqueID():String{
		//Bug UniqueIDs get repeted, I think I can solve this by keeping a variable that is the count of cubes
		//(probably use a large integer type ofr something. and add 1 to each new ID"
		//OH! very possibly the problem is exactly because the type is integer uniqueID in the coordinates class
		//and it is overflowing with this data
		/*
		bug here
       var key:String = "ID";
 
       var random = new System.Random();              
       var  epochStart:System.DateTime = new System.DateTime(1970, 1, 1, 8, 0, 0, System.DateTimeKind.Utc);
       var timestamp :double= (System.DateTime.UtcNow - epochStart).TotalSeconds;
 
       var uniqueID:String =""// Application.systemLanguage                 //Language
         // +"-"+GetPlatform()                           //Device   
          +String.Format("{0:X}", System.Convert.ToInt32(timestamp))          //Time
          +String.Format("{0:X}", System.Convert.ToInt32(Time.time*1000000))     //Time in game
          +String.Format("{0:X}", random.Next(1000000000));          //random number
 */ 
       //Debug.Log("Generated Unique ID: "+uniqueID);
 /*
       if(PlayerPrefs.HasKey(key)){
         uniqueID = PlayerPrefs.GetString(key);      
       } else {       
         PlayerPrefs.SetString(key, uniqueID);
         PlayerPrefs.Save();  
       }
 */
       //return uniqueID;
       return System.Guid.NewGuid().ToString();//this should fix the bug
      
}

var hack;
var GuideDrawn=false;
var MouseMove=true;
var horizontalSpeed : float = 2.0;
var verticalSpeed : float = 2.0;
var ObjectEditorCollisionDetection:boolean=false;
var MapObj:MapObject;
function Update() {
	if(ShowMapEditor) {
		if (Input.GetKey (KeyCode.RightArrow)) {
		    //mv("MapPointer",30,0,0);
		    //sp("MapPointer", vars["pointer"].transform.rotation.eulerAngles.x+30, vars["pointer"].transform.rotation.eulerAngles.y, vars["pointer"].transform.rotation.eulerAngles.z);
		    vars["pointer"].transform.Translate(1,0,0, Space.World);
		}
		if (Input.GetKey (KeyCode.LeftArrow)) {
		    //mv("MapPointer",-30,0,0);
		    //sp("MapPointer", vars["pointer"].transform.rotation.eulerAngles.x-30, vars["pointer"].transform.rotation.eulerAngles.y, vars["pointer"].transform.rotation.eulerAngles.z);		    
			vars["pointer"].transform.Translate(-1,0,0, Space.World);
		}
		if (Input.GetKey (KeyCode.DownArrow)) {
		    //mv("MapPointer",0,0,-30);
		    //sp("MapPointer", vars["pointer"].transform.rotation.eulerAngles.x, vars["pointer"].transform.rotation.eulerAngles.y, vars["pointer"].transform.rotation.eulerAngles.z-30);		    
			vars["pointer"].transform.Translate(0,0,-1, Space.World);
		}
		if (Input.GetKey (KeyCode.UpArrow)) {
		    //mv("MapPointer",0,0,30);
		    //sp("MapPointer", vars["pointer"].transform.rotation.eulerAngles.x, vars["pointer"].transform.rotation.eulerAngles.y, vars["pointer"].transform.rotation.eulerAngles.z+30);
			vars["pointer"].transform.Translate(0,0,1, Space.World);
		}
		//WSDA key movements
		if (Input.GetKey (KeyCode.D)) {
		    mv("camera",100,0,0);
		}
		if (Input.GetKey (KeyCode.A)) {
		    mv("camera",-100,0,0);
		}
		if (Input.GetKey (KeyCode.W)) {
		    mv("camera",0,100,0);
		}
		if (Input.GetKey (KeyCode.S)) {
		    mv("camera",0,-100,0);
		}			
		if (Input.GetKey (KeyCode.R)) {
		    mv("camera",0,0,100);
		}
		if (Input.GetKey (KeyCode.F)) {
		    mv("camera",0,0,-100);
		}
		if (Input.GetKeyUp (KeyCode.Space)) {
		  	//Disallow putting a cube where a cube already exists
		  	for(cords in  MapLoadedObjectsList) {
		    	if(cords.x==vars["pointer"].transform.position.x && cords.y==vars["pointer"].transform.position.y &&cords.z==vars["pointer"].transform.position.z) 
					return;
		    }		  
			MapObj = new MapObject();//this if failing
			MapObj.objfilename =  CurrentObjFilename;
			MapObj.instancename=CurrentCubesName;
			MapObj.x =  vars["pointer"].transform.position.x;
			MapObj.y =  0;
			MapObj.z =  vars["pointer"].transform.position.z;
			MapObj.rotx =vars["pointer"].transform.rotation.eulerAngles.x;
			MapObj.roty =vars["pointer"].transform.rotation.eulerAngles.y;
			MapObj.rotz =vars["pointer"].transform.rotation.eulerAngles.z;
			MapObjectBuilderList.Add(MapObj);
			var myObj=Obj(MapObj.objfilename,MapObj.instancename,MapObj.x,MapObj.y,MapObj.z);
			myObj.transform.rotation = Quaternion.Euler(MapObj.rotx,MapObj.roty,MapObj.rotz);	
			CurrentCubesName=GetUniqueID();
		   
		}
		if (Input.GetKeyUp (KeyCode.E)) {//Erase cube
			for(cords in MapObjectBuilderList) {
				if(cords.x==vars["pointer"].transform.position.x && cords.y==vars["pointer"].transform.position.y &&cords.z==vars["pointer"].transform.position.z) {
					dl(cords.instancename);
					MapObjectBuilderList.Remove(cords);
					break;
				}
			}
		}					
	}
	if(ShowProgrammingMode) {
		if(executing) {
			PreProcessor();
			try {
				eval(upd);
			 } catch(err) {
				 	//executing=false;
				 	debugString+="Error in Update Fcuntion:\n"+err;
				 	Debug.Log(err);
			}
		}
	} 
	if(ObjectEditorMode){//Object Editor Mode
		vars["camera"] =  Camera.main.gameObject;
		if (Input.GetKeyUp (KeyCode.M)) {
			if(DrawMovingGuide=="On") DrawMovingGuide="Off"; else DrawMovingGuide="On";
		}
		if(DrawMovingGuide=="On") {
			if(!GuideDrawn){
				draw_guide();
				GuideDrawn=true;
			}
			if (Input.GetKey (KeyCode.RightArrow)) {
			    mv("guide",5,0,0);
			    draw_pointer();
			}
			if (Input.GetKey (KeyCode.LeftArrow)) {
			    mv("guide",-5,0,0);
			    draw_pointer();
			}
			if (Input.GetKey (KeyCode.UpArrow)) {
			    mv("guide",0,5,0);
			    draw_pointer();
			}
			if (Input.GetKey (KeyCode.DownArrow)) {
			    mv("guide",0,-5,0);
			    draw_pointer();
			}
			if (Input.GetKey (KeyCode.W)) {
			    mv("guide",0,0,5);
			    draw_pointer();
			}
			if (Input.GetKey (KeyCode.S)) {
			    mv("guide",0,0,-5);
			    draw_pointer();
			}
	       
		} else {
			if (Input.GetKey (KeyCode.RightArrow)) {
			    rt("camera",0,100,0);
			    draw_guide();
			    
			}
			if (Input.GetKey (KeyCode.LeftArrow)) {
			    rt("camera",0,-100,0);
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.DownArrow)) {
			    rt("camera",100,0,0);
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.UpArrow)) {
			    rt("camera",-100,0,0);
			    draw_guide();
			}
			//WSDA key movements
			if (Input.GetKey (KeyCode.R)) {
				//store previous direction, allow movement in the opposite direction(TODO)if(ObjectEditorCollisionDetection&&cd("camera","ObjectEditorCubes")) return;
			    mv("camera",0,10,0);
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.F)) {
			    mv("camera",0,-10,0);
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.D)) {
			    mv("camera",10,0,0);
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.A)) {
			    mv("camera",-10,0,0);
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.W)) {
				if(ObjectEditorCollisionDetection&&cd("camera","ObjectEditorCubes")) return;
			    mv("camera",0,0,10);
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.S)) {
			    mv("camera",0,0,-10);
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.Z)) {//like an airplane makes a barrel roll left
		    	Camera.main.gameObject.transform.rotation = Quaternion.Euler(Camera.main.gameObject.transform.rotation.eulerAngles.x,Camera.main.gameObject.transform.rotation.eulerAngles.y,Camera.main.gameObject.transform.rotation.eulerAngles.z+2);
				//result=newangole %360; if less than 0 add 360, not nessesary
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.X)) {//like an airplane makes a barrel roll right
		    	Camera.main.gameObject.transform.rotation = Quaternion.Euler(Camera.main.gameObject.transform.rotation.eulerAngles.x,Camera.main.gameObject.transform.rotation.eulerAngles.y,Camera.main.gameObject.transform.rotation.eulerAngles.z-2);
				//result=newangole %360; if less than 0 add 360, not nessesary
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.T)) {
				if(ObjectEditorCollisionDetection&&cd("camera","ObjectEditorCubes")) return;
			    mv("camera",0,0,3);
			    draw_guide();
			}
			if (Input.GetKey (KeyCode.G)) {
			    mv("camera",0,0,-3);
			    draw_guide();
			}

			//if(Input.GetMouseButtonDown(0)){
    		//	MouseMove=true;
			//} 
			if (Input.GetKeyUp (KeyCode.Escape)) {
			    MouseMove=!MouseMove;
			    /*
			    Screen.showCursor = !MouseMove;//Hide  the cursor when editing blocks, and show it when not editing
			    if(!Screen.showCursor)
			    	Screen.lockCursor = true; //this only works on executable
			    else
			    	Screen.lockCursor = false;
			    */
				//Screen.lockCursor = true;
			}			
			
			
			if(MouseMove) {
				var h : float = horizontalSpeed * Input.GetAxis ("Mouse X");
	        	var v : float = verticalSpeed * -Input.GetAxis ("Mouse Y");
	        	Camera.main.gameObject.transform.Rotate (v, h, 0);
	        	draw_guide();
	        }
			
		}
		if (Input.GetKey (KeyCode.N)) {
			stabilizecamera();
		}
		//Steal(take) the RGB and Texture values of the block currently being pointed to
		if (Input.GetKey (KeyCode.Q)) {
		  for(cords in ObjectBuilderList) {
		    if(cords.x==vars["pointer"].transform.position.x && cords.y==vars["pointer"].transform.position.y &&cords.z==vars["pointer"].transform.position.z) {
		      //ObjectBuilderList.RemoveAt(1);
		      if(cords.cubename!="AxisPoint") {
				      CurrentTextureWebOrFile = cords.TextureWebOrFile;
				      CurrentTextureName = cords.TextureName;
					  CurrentRedValue = cords.r.ToString();
				      CurrentGreenValue = cords.g.ToString();
				      CurrentBlueValue = cords.b.ToString();
		   		      Currentalpha = cords.alpha.ToString();
				      CurrentWrapOnSides = cords.WrapOnSides.ToString();
				      break;
		      }
		    }
		  }
		}
		
		if (Input.GetKey (KeyCode.Space)) {
			  	//Disallow putting a cube where a cube already exists
	  		  	for(cords in ObjectBuilderList) {
			    if(cords.x==vars["pointer"].transform.position.x && cords.y==vars["pointer"].transform.position.y &&cords.z==vars["pointer"].transform.position.z) 
			      	if(cords.cubename!="AxisPoint") 
						return;
			      
			    }

			  
			  
		      if(DrawMovingGuide!="On") draw_guide();
		      var coordinates= new Coordinates();
		      coordinates.cubename =  CurrentCubesName;
		      coordinates.TextureWebOrFile =  CurrentTextureWebOrFile;
		      coordinates.TextureName =  CurrentTextureName;
   			  try {
				  coordinates.r =  int.Parse(CurrentRedValue);
			      coordinates.g =  int.Parse(CurrentGreenValue);
			      coordinates.b =  int.Parse(CurrentBlueValue);
		     } catch(err) {
   				Message="Invalid number for Colors, must be an integer number from 0 to 255";
   				ShowMessageBox=true;
   				return;
		     }
   		      coordinates.alpha =  parseFloat(Currentalpha);
		      coordinates.WrapOnSides =	parseInt(CurrentWrapOnSides);
		      coordinates.x =  Mathf.Round(old_pointer.transform.position.x);
		      coordinates.y =  Mathf.Round(old_pointer.transform.position.y);
		      coordinates.z =  Mathf.Round(old_pointer.transform.position.z);
		      ObjectBuilderList.Add(coordinates);
			  qb(coordinates.cubename, coordinates.x,coordinates.y,coordinates.z);
			  cl(coordinates.cubename, Color32(coordinates.r,coordinates.g,coordinates.b,255));
			  if(coordinates.alpha!=1.0) alpha(coordinates.cubename, coordinates.alpha);
			  if(coordinates.TextureName!="") tx(coordinates.cubename, coordinates.TextureName, coordinates.TextureWebOrFile, coordinates.WrapOnSides);
			  CurrentCubesName=GetUniqueID();//System.Guid.NewGuid().;//I have heard this may crash the app, a potential replacement is http://answers.unity3d.com/questions/246116/how-can-i-generate-a-guid-or-a-uuid-from-within-un.html
		      
		}
		if (Input.GetKey (KeyCode.E)) {//Erase cube
		  for(cords in ObjectBuilderList) {
		    if(cords.x==vars["pointer"].transform.position.x && cords.y==vars["pointer"].transform.position.y &&cords.z==vars["pointer"].transform.position.z) {
		      if(cords.cubename!="AxisPoint") {
		      	dl(cords.cubename);
		        ObjectBuilderList.Remove(cords);
		        break;
		      }
		    }
		  }
		}
	}
}



//rep("Visit ms","ms","w3");//works
//rep("\"hello world\"","\"","\\\"");
//print(rep("qb(\"a\",a,a,a);","\"","\\\""));//works
function rep(subject:String,needle:String,haystack:String) {
	var c=subject.Replace(needle,haystack);
	return c;
}

function starttimer() {
 loopstarttime = Time.realtimeSinceStartup;
}

function PreProcessor() {
/*BUG -- fixed on 2012/03/11 japan time (still small problem remains of what if a person calls a function withing a for loop incrimentor)
 the timeout still fails when there is a second while loop (and I think also for loop) I think this is because it is not a regex passed the g parameter, how do I pass that parameter?
 but that doesnt seem to be so according to http://msdn.microsoft.com/en-us/library/system.text.regularexpressions.regex.replace.aspx
 OK, after testing, it seems the IsMatch is not general (g), and thus it is not enforcing the open curly brace, this is good news
	oh now, I realise what is going on, I am creating a while() {    once one is there, the rest of the while loops are not being replaced
	ok, now I have the problem that it is matching even when it should not match... with while\\((.+)\\)*[^{]    matches even if there is a while with an open curly brace
greg:
regex
(test\([^\)]+\)\s*)($|[^b\s])
replacement string
$1 { $2
testing string
test(xyz) fff test(pop) bggg test(uuu)
result
test(xyz) { fff test(pop) bggg test(uuu) {
still will have trouble with stuff like test(function(a);bbb;ccc)
--fixed up to here, but new problem, why doesnt this work?:
var a=0;
while(a<5) { a++; qb("a",a,a,a); }
for(b=0;b<6;b--) { qb("b",b,b,b); }
--fixed, it was creating two instaces of tghe now variable, I made the nwo variable global
*/ 
	//preprocessor
	//p=System.Text.RegularExpressions.Regex.Replace("hello world","hello","goodbye");
	//force open curly brace
	var re : String;
	var replacement : String;
	//re ="for\\((.+)\\)*[^{]";//matches if there is no curly braced at the end
	//re ="for\\((.+)\\)(?!\\s*{)\\s*\\w";
	re ="(for\\([^\\)]+\\)\\s*)($|[^{\\s])";
	if(System.Text.RegularExpressions.Regex.IsMatch(declarations,re)) {
		//re ="for\\((.+)\\)";
		replacement="$1 { $2";
		declarations=System.Text.RegularExpressions.Regex.Replace(declarations,re,replacement);

	}

	//force open curly brace
	re ="(while\\([^\\)]+\\)\\s*)($|[^{\\s])";
	if(System.Text.RegularExpressions.Regex.IsMatch(declarations,re)) {
		//re ="while\\((.+)\\)";
		replacement="$1 { $2";
		declarations=System.Text.RegularExpressions.Regex.Replace(declarations,re,replacement);
	}
	//do later, enclse this in an if starement, so that the following only happens if there is a match in the previous IsMatch statements, this should improve efficiency
	PostProssesdeclarations=declarations;

	//add the timer
	/*
	you can see the effect of a timeout if you do:
	var a=0;
	while(a<5) { a++; qb("a",a,a,a); }
	chnage while to while(1)    it will time out and then you can edit it after the timeout
	*/
	re ="while\\((.+)\\)\\s*{";
	replacement="starttimer(); while($1) { now=Time.realtimeSinceStartup; if(now>=(loopstarttime+timeout)) {print(\"loop timeout.\"); break;}";
	PostProssesdeclarations=System.Text.RegularExpressions.Regex.Replace(PostProssesdeclarations,re,replacement);

	//add the timer
	//you can see the effect of a timeout if you do for(a=0;a<6;a++) { qb("a",a,a,a); } then erase teh ++  which causes an infinite loop, then it willt ime out, then you can go back to edit it and change it to --
	re ="for\\((.+)\\)\\s*{";
	//print("declarations:"+declarations);
	replacement="starttimer(); for($1) { now=Time.realtimeSinceStartup; if(now>=(loopstarttime+timeout)) {print(\"loop timeout.\"); break;}";
	PostProssesdeclarations=System.Text.RegularExpressions.Regex.Replace(PostProssesdeclarations,re,replacement);


}
function dl(name : String){//BUG, aparently the dl() cuntion is erasing the cubes from the screen, but the object count does not decrease.
    //delete
    for(i=0;i<cubes.length;) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	 if(cubes[i].transform.name==name) 	{
    	 	//cubes[i].renderer.material=null;
    	 	Destroy(cubes[i].renderer.material);
    	 	Destroy(cubes[i]);
    	 	//DestroyImmediate(cubes[i]);
    	 	cubes.RemoveAt(i);
    	 } else i++;
	}
}

function eq(nameA : String,nameB : String){
    //set to equal position and rotation
	if(nameB=="camera") {
		var theCamera : GameObject = Camera.main.gameObject;
		for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
			if(cube.transform.name==nameA) {
				cube.transform.rotation=Camera.main.gameObject.transform.rotation;
				cube.transform.localPosition=Camera.main.gameObject.transform.localPosition;
			}
		}
		return;
	}
    for (cubeB in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cubeB.transform.name==nameB) {
			for (cubeA in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
				if(cubeA.transform.name==nameA) cubeA.transform.rotation=cubeB.transform.rotation;
			}
		}
	}
}
function sp(name : String, x:float, y:float, z:float){
    //set position
	if(name=="camera") {
		Camera.main.gameObject.transform.position.x=x;
		Camera.main.gameObject.transform.position.y=y;
		Camera.main.gameObject.transform.position.z=z;
		return;
	}

    for (var cube:GameObject in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==name) {
			cube.transform.position.x=x;
			cube.transform.position.y=y;
			cube.transform.position.z=z;
			
		}
	}
}


function sr(name : String, x:float, y:float, z:float){
    //set rotation
	if(name=="camera") {
		Camera.main.gameObject.transform.rotation = Quaternion.Euler(x,y,z);
		return;
	}    
    for (var cube:GameObject in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
    	if(cube.transform.name==name) {
			cube.transform.rotation = Quaternion.Euler(x,y,z);
		}
	}
}

//make a function that returns the euler angle of a cube :TODO

function ex(name : String):boolean{
		for (cube in cubes) {//this for loop doesnt behave as the regular browser one which woudl return the index, it acutally returns the object
			//Debug.Log("in ex() cube.transform.name:"+cube.transform.name+"name:"+name);
			//Debug.Log("Exists");
			if(cube.transform.name==name) return true;
		}
		/*
		if(name=="guide"){
			Debug.Log("failed");
		}
		*/
		return false;
}
function cs() {
		for(cube in cubes) {
			Destroy(cube);
		}
		cubes = new Array();
}


function evalDeclarations() {
/*Bug
I am doing a continous eval on a string that is being edited real time, I want to do that, only problem is that it hangs when the program becomes an endless loop, for example eva;(for(a=0;a<-5;a)"; since a doesnt get incremented it gets stuck.... is there anyway to set a timeout for an eval? (this is nto ES on a browser 
this is not node.js either it is javascript in unity3d
this article seems to suggest this problem is not fixable http://bytes.com/topic/javascript/answers/808874-avoiding-infinite-loop-arbitrary-eval-user_code
onle quick fix I can think about is to check if the code conatins any for loops that are not incrimented and while loops that evaluate to true, and if so, dont eval the code, instead show an error message, but I dont like this solution, I prefer a timeout to the eval statement
hmm // Removes this script instance from the game object
Destroy (this);   the Destroy() function takes a second parameter as time to remove the game object, maybe I could use this as a timeout
*/
	if(ShowProgrammingMode) {
		PreProcessor();
		try {
			cs();		
		 	//print(PostProssesdeclarations);
		 	if(!executing) debugString="Debug info:\n";
		 	eval(PostProssesdeclarations);
		 } catch(err) {
		 	//executing=false;
		 	if(!executing) debugString="Debug info:\n";
		 	debugString+="Error in Declarations:\n"+err;
		 	Debug.Log(err);
		 }
	}  
	if(ObjectEditorMode){
		try {
			cs();		
		 	//print(PostProssesdeclarations);
		 	if(!executing) debugString="Debug info:\n";
			//vars["cubesarray"]= ObjectBuilderList;
			vars["camera"] =  Camera.main.gameObject;
			draw_guide();
		 } catch(err) {
		 	//executing=false;
		 	if(!executing) debugString="Debug info:\n";
		 	debugString+="Error in Declarations:\n"+err;
		 	Debug.Log(err);
		 }
	} 
}

function initexample() {
	executing=false;
	cs();		
	declarations="";
	upd="";
}

function geturl(url:String) {
		var www_inner : WWW = new WWW (url);
  		
  		// Wait for download to complete
    	//yield www_inner;
    	while(!www_inner.isDone);
		
		www=www_inner;
		//Debug.Log(url);
		//Debug.Log(www_inner.text);
}

function postprogram(url:String,description:String) {
	var form = new WWWForm();
	var Program = "<declarations>"+declarations+"</declarations>"+"<updatefunction>"+upd+"</updatefunction>";

	form.AddField("description", description);
	form.AddField("prog", Program);
	
	
	//var headers = new Dictionary.<KeyType,ValueType>();
	//var headers : Dictionary.<KeyType,ValueType> = new Dictionary.<KeyType,ValueType>();
	//headers["SomeHeaderKey"] = "SomeHeaderValue";
	 
	//update later, this is depricated!*** var www_inner = new WWW( url, form.data, headers );
	
	var www_inner = new WWW( url, form.data);
	
	while(!www_inner.isDone);

	www=www_inner;
	Debug.Log("result from post query="+www_inner.text);
}
/*
function Start () {
    // Create a material with transparent diffuse shader
    var material = new Material (Shader.Find ("Transparent/Diffuse"));
    material.color = Color.white;
    // assign the material to the renderer
    renderer.material = material;
}
*/
//GameObject.Find("MainCamera").transform.eulerAngles.x;
function GetContetsOfTag(text:String,tag:String):String {
	var beginningtag="<"+tag+">";
	var endtag="</"+tag+">";
	//size == end - start?
	var size=text.IndexOf(endtag)-text.IndexOf(beginningtag);
	Debug.Log(text);
	return text.Substring(text.IndexOf(beginningtag)+beginningtag.Length ,size-beginningtag.Length);
}		
function ClearAllDialogs() {
	ShowDownloadMenu=false;
	ShowDescriptionAndDownloadMenu=false;
	ShowloginMenu=false;
	ShowMessageBox=false;
	ShowInputBox=false;
	ShowFileDialog=false;
}
function reinitcamera() {
				Camera.main.gameObject.transform.position = Vector3(0, 1, -10);
				Camera.main.gameObject.transform.rotation = Quaternion.Euler(0, 0, 0);
}
function stabilizeangle(angle) {
	if(angle<=135&&angle>=45) return 90;
	if(angle<=225&&angle>=130) return 180;
	if(angle<=315&&angle>=225) return 270;
	//if(angle<=90&&angle>=320) 
	return 0;//(for the other angles)otherwise return 0
}
function stabilizecamera() {
	Camera.main.gameObject.transform.rotation = Quaternion.Euler(stabilizeangle(Camera.main.gameObject.transform.rotation.eulerAngles.x),stabilizeangle(Camera.main.gameObject.transform.rotation.eulerAngles.y),stabilizeangle(Camera.main.gameObject.transform.rotation.eulerAngles.z));
	//result=newangole %360; if less than 0 add 360
}

function OnGUI () {
	if(ShowMainMenu) {
	    if (GUI.Button(Rect(10,10,100,20),"About")) {
			SetSkyOvercast2();
        	ShowAboutScreen=true;
        	ShowMainMenu=false;
       	}

		GUI.DrawTexture(Rect(Screen.width/2-Texture2D_Title.width/2,10,Texture2D_Title.width,Texture2D_Title.height), Texture2D_Title);
	    if (GUI.Button(Rect(Screen.width/2-Texture_btnCreativeMode.width/2-Texture_btnCreativeMode.width,Screen.height/2,Texture_btnCreativeMode.width,Texture_btnCreativeMode.height),Texture_btnGameMode)) {
        	Debug.Log("Clicked the button!");
       	}
	    if (GUI.Button(Rect(Screen.width/2-Texture_btnCreativeMode.width/2,Screen.height/2,Texture_btnCreativeMode.width,Texture_btnCreativeMode.height),Texture_btnCreativeMode)) {
        	Debug.Log("Clicked the button!");
        	ShowMainMenu=false;
        	ShowCreativeModeMenu=true;
       	}

	    if (GUI.Button(Rect(Screen.width/2-Texture_btnCreativeMode.width/2+Texture_btnCreativeMode.width,Screen.height/2,Texture_btnCreativeMode.width,Texture_btnCreativeMode.height),Texture_btn3dplMode)) {
        	Debug.Log("Clicked the button!");
			cs();
			reinitcamera();
			evalDeclarations();
			OriginalOn = false;
        	ShowMainMenu=false;
        	ShowProgrammingMode=true;
       	}
		return;
	}
	if(ShowAboutScreen) {
		var AboutWidth =600;
		var AboutHeight=400;
	 	GUILayout.BeginArea(Rect(Screen.width/2-AboutWidth/2 ,Screen.height/2-AboutHeight/2,AboutWidth,AboutHeight));//470 is the y position of the start button when the edit window is maximaized
	 		GUILayout.Label(AboutBoxContent);
		 	scrollPosition = GUILayout.BeginScrollView (scrollPosition, GUILayout.Width (220), GUILayout.Height (500));
			 	if(GUILayout.Button("Main Menu")) {
			 		cs();
			 		SetSkySunny2();
		        	ShowAboutScreen=false;
		        	ShowMainMenu=true;
	   	    	}
		    GUILayout.EndScrollView ();
		GUILayout.EndArea();
	}
	if(ShowCreativeModeMenu) {
		GUI.DrawTexture(Rect(Screen.width/2-Texture2D_Title.width/2,10,Texture2D_Title.width,Texture2D_Title.height), Texture2D_Title);
	    if (GUI.Button(Rect(Screen.width-110,10,100,20),"Main Menu")) {
        	Debug.Log("Clicked the button!");
        	ShowCreativeModeMenu=false;
        	ShowMainMenu=true;
   	    }
	    if (GUI.Button(Rect(Screen.width/2-Texture_btnCreativeMode.width/2-Texture_btnCreativeMode.width,Screen.height/2,Texture_btnCreativeMode.width,Texture_btnCreativeMode.height),Texture_btnObjectEditor)) {
        	Debug.Log("Clicked the button!");
        	//Screen.showCursor = false;//hide the cursor before starting object editor mode
        	//Screen.lockCursor = true;
			cs();
			reinitcamera();
			CurrentCubesName=GetUniqueID();//System.Guid.NewGuid().string;//I have heard this may crash the app, a potential replacement is http://answers.unity3d.com/questions/246116/how-can-i-generate-a-guid-or-a-uuid-from-within-un.html
			ObjectBuilderList= new System.Collections.Generic.List.<Coordinates>();
			var AxisPoint= new Coordinates();
			AxisPoint.cubename="AxisPoint";
			AxisPoint.x=0;
			AxisPoint.y=0;
			AxisPoint.x=0;
			AxisPoint.r=0;
			AxisPoint.g=255;
			AxisPoint.b=0;
			AxisPoint.TextureName="";
			AxisPoint.TextureWebOrFile="File";
			AxisPoint.alpha=0.5;
			ObjectBuilderList.Add(AxisPoint);
			qb(AxisPoint.cubename, AxisPoint.x, AxisPoint.y, AxisPoint.z);
			cl(AxisPoint.cubename,Color.green);
			alpha(AxisPoint.cubename,AxisPoint.alpha);
			GiudingGreenLightChange=true;//this is a hack to prevent the cube from becomming opaque qhen loading an xml file
			OriginalOn = true;        	
        	ShowCreativeModeMenu=false;
        	ObjectEditorMode=true;
   	    }
       	/*
	    if (GUI.Button(Rect(Screen.width/2-Texture_btnCreativeMode.width/2,Screen.height/2,Texture_btnCreativeMode.width,Texture_btnCreativeMode.height),Texture_btnCreativeMode)) {
        	Debug.Log("Clicked the button!");
        	ShowMainMenu=false;
        	ObjectEditorMode=true;

       	}
		*/
	    if (GUI.Button(Rect(Screen.width/2-Texture_btnCreativeMode.width/2+Texture_btnCreativeMode.width,Screen.height/2,Texture_btnCreativeMode.width,Texture_btnCreativeMode.height),Texture_btnMapEditor)) {
        	//Set the camera to be facing down from above
        	reinitcamera();
        	//bird's eye view
        	Camera.main.gameObject.transform.position = Vector3(0, 100, 0);
			Camera.main.gameObject.transform.rotation.x = 0.6912445;//this is the value for facing down
			CurrentCubesName=GetUniqueID();
        	ShowCreativeModeMenu=false;
        	ShowMapEditor=true;
        	Debug.Log("Clicked the Map Editor button!");
       	}
		return;
	}
	if(ShowMapEditor) {
	 	GUILayout.BeginArea(Rect(0,10,220,600));//470 is the y position of the start button when the edit window is maximaized
	 		GUILayout.Label("Object List");
		 	scrollPosition = GUILayout.BeginScrollView (scrollPosition, GUILayout.Width (220), GUILayout.Height (500));
			 	if(GUILayout.Button("Main Menu")) {
			 		cs();
		        	ShowMapEditor=false;
		        	ShowMainMenu=true;
	   	    	}
			    if(GUILayout.Button("LoadMap")) {
			    	InputAction="LoadMap";ShowFileDialog=true;
			    }
			    if(GUILayout.Button("Save Map")) {
			    	InputAction="SaveMap";ShowFileDialog=true;
			    }
			    if(GUILayout.Button("Browse Objects")) {
			    	InputAction="BrowseObjects";ShowFileDialog=true;
			    }
			    GUILayout.Label("Loaded Objects");
			    for(ObjectFileName in MapLoadedObjectsList) {
			    	if(GUILayout.Button(ObjectFileName)) {
			    		dl("MapPointer");
			    		vars["pointer"]=Obj(ObjectFileName,"MapPointer",Mathf.Round(Camera.main.gameObject.transform.position.x),0,Mathf.Round(Camera.main.gameObject.transform.position.y));
			    		CurrentObjFilename=ObjectFileName;
			    	}
			    }
			    GUILayout.Label("Rotation");
			    if(GUILayout.Button("Rotate 90 degrees")) {
			    	sr("MapPointer", 0, vars["pointer"].transform.rotation.eulerAngles.y+90, 0);
			    }
			    if(GUILayout.Button("Rotate 45 degrees")) {
			    	sr("MapPointer", 0, vars["pointer"].transform.rotation.eulerAngles.y+45, 0);
			    }			    
  				GUILayout.Label("Next Object's Name(ID)\nModify this when you want to\nhave control over an object\n.");
			    CurrentCubesName=GUILayout.TextField(CurrentCubesName);
			    if(GUILayout.Button("Help")) {
			    	Message="Load an object from \"Browse Objects\" and then move it using the cursor keys, place in using [SPACE], [E] to delete\nUse the following keys to scroll the map: [W] up [A] left [D] right [S] down.";
					ShowMessageBox=true;
			    }
			    if(GUILayout.Button("Debug On/Off")) {
			    	ShowDebug=!ShowDebug;
			    }		    
			  	if(GUILayout.Button("OK (or click center of screen)")) {//gives focous back to the game area
				    GUI.SetNextControlName("");
					GUI.FocusControl("");
			    }			    
		    GUILayout.EndScrollView ();
		GUILayout.EndArea();
	
		//return;
	}
	if(ShowProgrammingMode) {
		var declarationsx=10;
		var declarationsy=10;
		var declarationswidth=200;
		var declarationsheight=30;		
		var declarationstextareax=10;
		var declarationstextareay=35;
		var declarationstextareawidth=200;
		var declarationstextareaheight=100;
		var updatex=10;
		var updatey=130;
		var updatewidth=200;
		var updateheight=30;		
		var updatetextareax=10;
		var updatetextareay=160;
		var updatetextareawidth=200;
		var updatetextareaheight=100;
		var startbuttonx=10;
		var startbuttony=260;
		var startbuttonwidth=200;
		var startbuttonheight=30;
	    if(EditBig) {
			declarationsx=0;
			declarationsy=30;
			declarationswidth=710;//just before the tools for loging in
			declarationsheight=20;		
			declarationstextareax=0;
			declarationstextareay=50;
			declarationstextareawidth=710;
			declarationstextareaheight=200;
			updatex=0;
			updatey=declarationstextareay+declarationstextareaheight;
			updatewidth=710;
			updateheight=30;		
			updatetextareax=0;
			updatetextareay=updatey+20;
			updatetextareawidth=710;
			updatetextareaheight=200;
			startbuttonx=0;
			startbuttony=updatetextareay+updatetextareaheight;
			startbuttonwidth=710;
			startbuttonheight=30;		
		}
		if(!EditBig) {
			 if(GUI.Button(Rect(150,10,50,20),"Big")) {ClearAllDialogs();EditBig=true;} 
		} else {
			if(GUI.Button(Rect(50,10,150,20),"Small")) EditBig=false;			
		}
	
		GUI.Box(Rect(declarationsx, declarationsy, declarationswidth,declarationsheight),"Declarations");
		//declarations = EditorGUI.TextArea (Rect (10, 35, 200, 100), declarations, 200); 
		declarations = GUI.TextArea (Rect (declarationstextareax, declarationstextareay, declarationstextareawidth, declarationstextareaheight), declarations);
		if(declarations!=olddeclarations) {//text field changed
			if(!executing) {
				//declarations=declarations+"\nqb";//dirty bug fix for alpha channel not working
				evalDeclarations();
				//declarations=declarations.Substring(0,declarations.Length-4);
				//Debug.Log(declarations);
			}
			//Debug.Log("Declarations Text field has changed.");
			olddeclarations=declarations;
		} 
		GUI.Box(Rect(updatex, updatey, updatewidth,updateheight),"Update function");
		upd = GUI.TextArea (Rect (updatetextareax, updatetextareay, updatetextareawidth, updatetextareaheight), upd); 
		if(upd!=oldupd) {
			//Debug.Log("Update Text field has changed.");
			oldupd=upd;
		} 
		if(GUI.Button(Rect(startbuttonx,startbuttony,startbuttonwidth,startbuttonheight),executing?"STOP":"START")) {
		 	executing=!executing;//toggle
		 	//returning the camera to the original possition is not working , maybe it will work if I make the variable global
		 	//if(executing) originalCamPos = Camera.main.gameObject.localPosition;
			//if(executing) evalDeclarations();
			if(!executing) {
				//Camera.main.gameObject.localPosition = originalCamPos;
				//return camera to original position
				Camera.main.gameObject.transform.position = Vector3(0, 1, -10);
				Camera.main.gameObject.transform.rotation = Quaternion.Euler(0, 0, 0);
				evalDeclarations();
			}
		 	//<nogginBasher> amigojapan: in that case, i suggest you declare an object with var, and put all your new values *in* that
			//<nogginBasher>  var data = {}; eval("data.x = 20;"); data.x;
		 	//q=qb(1,1,1);
	 	}
	
		if(GUI.Button(Rect(220,10,40,20),"clear")) {//Load example 1
			EditBig=false;
			initexample();
	 	}
	 	
	
	 	
		var ExampleButtonOffset : int = 260;
		var ButtonWidth : int = 20;
		if(GUI.Button(Rect(740,10,140,20),"Upload to cloud")) {//Load example 1
			EditBig=false;
	    	if(!LoginSuccesful) {
	    	    Message="Please log-in first";
	    		ShowMessageBox=true;
	    		return;
	    	}
			postprogram("http://180.57.166.53/3dpl/3dplapi.php?action=post_program&email=usmpadow@gmail.com&password=testpassword&name=un_named_program","no description provided");
	 	}
		if(GUI.Button(Rect(880,10,140,20),"Download from cloud")) {
			EditBig=false;
			//use the limit mysql command to show only the page wanted select * from ppl_users limit 8,2;
	    	//geturl("https://api.github.com/users/amigojapan/gists");
	    	geturl("http://180.57.166.53/3dpl/3dplapi.php?action=get_listing&email=usmpadow@gmail.com&password=testpassword&starting_from_row=0&sort=top_rated");
	
			if(www!=null) Debug.Log(www.text);//GUILayout.TextArea (www.text, 700);
			ShowDownloadMenu=true;
	 	}
	 	if(GUI.Button(Rect(740,30,140,20),"Login")) {//Load example 1
	 		EditBig=false;
			ShowloginMenu=true;
	 	}
	 	if(GUI.Button(Rect(880,30,140,20),"Register")) {//Load example 1
	 		EditBig=false;
			postprogram("http://180.57.166.53/3dpl/3dplapi.php?action=post_program&email=usmpadow@gmail.com&password=testpassword&name=un_named_program","no description provided");
	 	}
	 	if(GUI.Button(Rect(740,50,140,20),"Save")) {//Load example 1
	 		EditBig=false;
			Message="Save program to:"+dataPath;
			InputAction="Save";	
			ShowFileDialog=true;
		}	
	 	if(GUI.Button(Rect(880,50,140,20),"Load")) {//Load example 1
	 		EditBig=false;
			Message="Load program from:"+dataPath;
			InputAction="Load";	
			ShowFileDialog=true;
	 	}
	 	if(GUI.Button(Rect(740,70,140,20),"About")) {//Load example 1
	 		EditBig=false;
			Message=AboutBoxContent;
			ShowMessageBox=true;
		}
	 	if(GUI.Button(Rect(880,70,140,20),"Debug On/Off")) {//Load example 1
	 		ShowDebug=!ShowDebug;//flip the value
		}
		if(GUI.Button(Rect(740,90,280,20),"Main Menu")) {//Load example 1
			cs();
			ShowProgrammingMode=false;
			ShowMainMenu=true;
		}
		if(GUI.Button(Rect(740,110,140,20),"Video tutorials")) {//Load example 1
			Application.OpenURL("http://amigojapan.github.com/3dpl/#videos");
		}
	 	if(GUI.Button(Rect(880,110,140,20),"Documentation")) {//Load example 1
	 		Application.OpenURL("https://github.com/amigojapan/3dpl/wiki/docs");
		}
		if(GUI.Button(Rect(740,130,280,20),"Homepage")) {//Load example 1
			Application.OpenURL("http://amigojapan.github.com/3dpl/");
		}		
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"1")) {//Load example 1
			initexample();		
			declarations="//How to make a cube\n";
			declarations=declarations+"qb(\"mycube\",0,0,0);";
			upd="";
			evalDeclarations();
	 	}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"2")) {//Load example 2
			initexample();		
			declarations="//Now change the coordinates of mycube so you can see it moves aroud\n";
			declarations=declarations+"qb(\"mycube\",2,0,1);";
			upd="";
			evalDeclarations();
	 	}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"3")) {//Load example 3
			initexample();		
			declarations="//Let's make 3 cubes\n";
			declarations=declarations+"qb(\"a\",0,0,0);\n";
			declarations=declarations+"qb(\"b\",2,1,1);\n";
			declarations=declarations+"qb(\"c\",-2,-1,-1);\n";		
			upd="";
			evalDeclarations();
	 	}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"4")) {//Load example 4
			initexample();		
			declarations="//Let's color the cubes\n";
			declarations=declarations+"qb(\"a\",0,0,0);\n";
			declarations=declarations+"qb(\"b\",2,1,1);\n";
			declarations=declarations+"qb(\"c\",-2,-1,-1);\n";		
			declarations=declarations+"cl(\"a\", Color.red);\n";
			declarations=declarations+"cl(\"b\", Color.green);\n";
			declarations=declarations+"cl(\"c\", Color.blue);\n";	
			upd="";
			evalDeclarations();
		}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"5")) {//Load example 5
			initexample();		
			declarations="";
			declarations=declarations+"qb(\"a\",0,0,0);\n";
			declarations=declarations+"qb(\"b\",2,1,1);\n";
			declarations=declarations+"qb(\"c\",-2,-1,-1);\n";		
			declarations=declarations+"cl(\"a\", Color.red);\n";
			declarations=declarations+"cl(\"b\", Color.green);\n";
			declarations=declarations+"cl(\"c\", Color.blue);\n";	
			upd="//Let's rotate the cubes\n";
			upd=upd+"rt(\"a\",10,10,10);\n";
			upd=upd+"rt(\"b\",-10,-10,-10);\n";
			upd=upd+"rt(\"c\",10,10,10);\n";
			upd=upd+"//click on start!\n";
			evalDeclarations();
		}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"6")) {//Load example 6
			initexample();		
			declarations="";
			declarations=declarations+"qb(\"a\",0,0,0);\n";
			declarations=declarations+"qb(\"b\",2,1,1);\n";
			declarations=declarations+"qb(\"c\",-2,-1,-1);\n";		
			declarations=declarations+"cl(\"a\", Color.red);\n";
			declarations=declarations+"cl(\"b\", Color.green);\n";
			declarations=declarations+"cl(\"c\", Color.blue);\n";	
			upd="//Let's move the cubes\n";
			upd=upd+"mv(\"a\",1,0,0);\n";
			upd=upd+"mv(\"b\",0,1,0);\n";
			upd=upd+"mv(\"c\",0,0,1);\n";
			upd=upd+"//click on start!\n";
			evalDeclarations();
		}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"7")) {//Load example 7
			initexample();		
			declarations="";
			declarations=declarations+"qb(\"a\",0,0,0);\n";
			declarations=declarations+"qb(\"b\",2,1,1);\n";
			declarations=declarations+"qb(\"c\",-2,-1,-1);\n";		
			declarations=declarations+"cl(\"a\", Color.red);\n";
			declarations=declarations+"cl(\"b\", Color.green);\n";
			declarations=declarations+"cl(\"c\", Color.blue);\n";	
			upd="//Move and rotate\n";
			upd=upd+"mv(\"a\",1,0,0);\n";
			upd=upd+"rt(\"b\",10,10,10);\n";
			upd=upd+"mv(\"c\",0,0,1);\n";
			upd=upd+"//click on start!\n";
			evalDeclarations();
		}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"8")) {//Load example 8
			initexample();		
			declarations="";
			declarations=declarations+"qb(\"a\",0,0,0);\n";
			declarations=declarations+"qb(\"b\",2,1,1);\n";
			declarations=declarations+"qb(\"c\",-2,-1,-1);\n";		
			declarations=declarations+"cl(\"a\", Color.red);\n";
			declarations=declarations+"cl(\"b\", Color.green);\n";
			declarations=declarations+"cl(\"c\", Color.blue);\n";	
			upd="//Rotate\n";
			upd=upd+"rt(\"a\",10,10,10);\n";
			upd=upd+"rt(\"b\",-10,-10,-10);\n";
			upd=upd+"rt(\"c\",10,10,10);\n";
			upd=upd+"//Move\n";
			upd=upd+"mv(\"a\",1,0,0);\n";
			upd=upd+"mv(\"b\",0,1,0);\n";
			upd=upd+"mv(\"c\",0,0,1);\n";
			upd=upd+"//click on start!\n";
			evalDeclarations();
		}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"9")) {//Load example 9
			initexample();		
			declarations="//for loops\n";
			declarations=declarations+"for(x=0;x<4;x++) {\n";
			declarations=declarations+"    qb(\"a\",x,x,x);\n";
			declarations=declarations+"}\n";		
			upd="";
			evalDeclarations();
		}
		ButtonWidth=30;
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"10")) {//Load example 10
			initexample();		
			declarations="//Functions\n";
			declarations=declarations+"function f(y) {//makes a bar\n";
			declarations=declarations+"    for(x=0;x<6;x++) { qb(\"a\",x,y,0); }\n";
			declarations=declarations+"}\nf(1);f(3);f(5);";		
			upd="";
			evalDeclarations();
		}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"11")) {//Load example 11
			initexample();		
			declarations="//Collision Detection\n";
			declarations=declarations+"qb(\"a\",3,0,0);\n";
			declarations=declarations+"qb(\"b\",0,0,0);\n";
			declarations=declarations+"cl(\"a\", Color.blue);\n";
			declarations=declarations+"cl(\"b\", Color.red);\n";
			upd="//Move until crash\n";
			upd=upd+"if(!cd(\"a\",\"b\")) {\n";
			upd=upd+"    mv(\"b\",1,0,0);\n";
			upd=upd+"}\n";
			evalDeclarations();
		}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"12")) {//Load example 12
			initexample();		
			declarations="//Moving camera\n";
			declarations=declarations+"for(x=0;x<4;x++) {\n";
			declarations=declarations+"    qb(\"a\",x,x,x);\n";
			declarations=declarations+"}\n";		
			upd="mv(\"camera\",1,1,1);\n";
			evalDeclarations();
		}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"13")) {//Load example 13
			initexample();		
			declarations="//Rotating camera\n";
			declarations=declarations+"for(x=0;x<4;x++) {\n";
			declarations=declarations+"    qb(\"a\",x,x,x);\n";
			declarations=declarations+"}\n";		
			upd="rt(\"camera\",1,1,1);\n";
			evalDeclarations();
		}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"14")) {//Load example 14
			initexample();		
			declarations="//Deleting an object\n";
			declarations=declarations+"qb(\"a\",3,0,0);\n";
			declarations=declarations+"qb(\"b\",0,0,0);\n";
			declarations=declarations+"cl(\"a\", Color.blue);\n";
			declarations=declarations+"cl(\"b\", Color.red);\n";
			upd="//Move until crash\n";
			upd=upd+"if(!cd(\"a\",\"b\")) {\n";
			upd=upd+"    mv(\"b\",1,0,0);\n";
			upd=upd+"} else { \n";
			upd=upd+"    dl(\"a\");\n";
			upd=upd+"}\n";
			evalDeclarations();
		}
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"15")) {//Load example 15
			initexample();		
			declarations="//Input Detection\n";
			declarations=declarations+"qb(\"a\",3,0,0);\n";
			upd="//Use arrow keys and [A] and [Z]\n";
			upd=upd+"if (Input.GetKey (KeyCode.RightArrow))\n";
			upd=upd+"    mv(\"a\",10,0,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.LeftArrow))\n";
			upd=upd+"    mv(\"a\",-10,0,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.UpArrow))\n";
			upd=upd+"    mv(\"a\",0,10,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.DownArrow))\n";
			upd=upd+"    mv(\"a\",0,-10,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.A))\n";
			upd=upd+"    mv(\"a\",0,0,10);\n";
			upd=upd+"if (Input.GetKey (KeyCode.Z))\n";
			upd=upd+"    mv(\"a\",0,0,-10);\n";
			evalDeclarations();
		}
		
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"16")) {//Load example 16
			initexample();
			declarations="//Blockout\n"; 
			declarations=declarations+"//walls\n";
			declarations=declarations+"depth=20;\n";
			declarations=declarations+"for(x=-15;x<20;x++) {\n";
			declarations=declarations+"    qb(\"topwall\",x,10,depth);\n";
			declarations=declarations+"}\n";
			declarations=declarations+"for(y=10;y>-10;y--) {\n";
	    	declarations=declarations+"    qb(\"sidewall\",-15,y,depth);\n";
			declarations=declarations+"}\n";
			declarations=declarations+"for(y=10;y>-10;y--) {\n";
			declarations=declarations+"    qb(\"sidewall\",20,y,depth);\n";
			declarations=declarations+"}\n";
			declarations=declarations+"for(x=-15;x<21;x++) {\n";
			declarations=declarations+"    qb(\"bottomwall\",x,-10,depth);\n";
			declarations=declarations+"}\n";
			declarations=declarations+"function block(name,x_start,y,color) {\n";
			declarations=declarations+"   depth=20;\n";
			declarations=declarations+"   for(x=x_start;x<x_start+5;x++) {\n";
			declarations=declarations+"       qb(name,x,y,depth);\n";
			declarations=declarations+"    }\n";
			declarations=declarations+"    cl(name, color);\n";
			declarations=declarations+"}\n";
			declarations=declarations+"//ball\n";
			declarations=declarations+"qb(\"ball\",-3,-6,depth);\n";
			declarations=declarations+"//paddle\n";
			declarations=declarations+"block(\"paddle\",-3,-8, Color.white);\n";
			declarations=declarations+"//blocks\n";
			declarations=declarations+"xoffset=-14;\n";
			declarations=declarations+"block(\"block0\",xoffset,7, Color.red);\n";
			declarations=declarations+"xoffset=xoffset+5;\n";
			declarations=declarations+"block(\"block1\",xoffset,7, Color.blue);\n";
			declarations=declarations+"xoffset=xoffset+5;\n";
			declarations=declarations+"block(\"block2\",xoffset,7, Color.green);\n";
			declarations=declarations+"xoffset=5;\n";
			declarations=declarations+"block(\"block3\",xoffset,4, Color.red);\n";
			declarations=declarations+"xoffset=xoffset+5;\n";
			declarations=declarations+"block(\"block4\",xoffset,4, Color.blue);\n";
			declarations=declarations+"xoffset=xoffset+5;\n";
			declarations=declarations+"block(\"block5\",xoffset,4, Color.green);\n";
			declarations=declarations+"vars[\"xspeed\"]=3;//x speed;\n";
			declarations=declarations+"vars[\"yspeed\"]=3;//y speed;\n";
			upd="if (Input.GetKey (KeyCode.RightArrow))\n";
			upd=upd+"    mv(\"paddle\",10,0,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.LeftArrow))\n";
			upd=upd+"    mv(\"paddle\",-10,0,0);\n";
			upd=upd+"if(cd(\"ball\",\"topwall\")) {\n";
			upd=upd+"    vars[\"yspeed\"]=-vars[\"yspeed\"];\n";
			upd=upd+"}\n";
			upd=upd+"if(cd(\"ball\",\"sidewall\")) {\n";
			upd=upd+"    vars[\"xspeed\"]=-vars[\"xspeed\"];\n";
			upd=upd+"}\n";				
			upd=upd+"if(cd(\"ball\",\"paddle\")) {\n";
			upd=upd+"    vars[\"yspeed\"]=-vars[\"yspeed\"];\n";
			upd=upd+"}\n";
			upd=upd+"mv(\"ball\",vars[\"xspeed\"],vars[\"yspeed\"],0);\n";
			upd=upd+"if(cd(\"ball\",\"block0\")) {\n";
			upd=upd+"    vars[\"yspeed\"]=-vars[\"yspeed\"];\n";
			upd=upd+"    dl(\"block0\");\n";
			upd=upd+"}\n";
			upd=upd+"if(cd(\"ball\",\"block1\")) {\n";
			upd=upd+"    vars[\"yspeed\"]=-vars[\"yspeed\"];\n";
			upd=upd+"    dl(\"block1\");\n";
			upd=upd+"}\n";
			upd=upd+"if(cd(\"ball\",\"block2\")) {\n";
			upd=upd+"    vars[\"yspeed\"]=-vars[\"yspeed\"];\n";
			upd=upd+"    dl(\"block2\");\n";
			upd=upd+"}\n";
			upd=upd+"if(cd(\"ball\",\"block3\")) {\n";
			upd=upd+"    vars[\"yspeed\"]=-vars[\"yspeed\"];\n";
			upd=upd+"    dl(\"block3\");\n";
			upd=upd+"}\n";
			upd=upd+"if(cd(\"ball\",\"block4\")) {\n";
			upd=upd+"    vars[\"yspeed\"]=-vars[\"yspeed\"];\n";
			upd=upd+"    dl(\"block4\");\n";
			upd=upd+"}\n";
			upd=upd+"if(cd(\"ball\",\"block5\")) {\n";
			upd=upd+"    vars[\"yspeed\"]=-vars[\"yspeed\"];\n";
			upd=upd+"    dl(\"block5\");\n";
			upd=upd+"}\n";
			Camera.main.gameObject.transform.rotation = Quaternion.Euler(-10, 0, 0);//set the camera at an angle for this game
			evalDeclarations();
		}
		
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"17")) {//Load example 17
			initexample();		
			declarations="//Space travel\n";
			declarations=declarations+"function big_asteroid(name,x,y,z,color) {\n";
			declarations=declarations+"    qb(name,x,y,z);\n";	
			declarations=declarations+"    qb(name,x-1,y,z);\n";	
			declarations=declarations+"    qb(name,x,y-1,z);\n";	
			declarations=declarations+"    qb(name,x,y,z-1);\n";	
			declarations=declarations+"    qb(name,x+1,y,z);\n";	
			declarations=declarations+"    qb(name,x,y+1,z);\n";	
			declarations=declarations+"    qb(name,x,y,z+1);\n";	
			declarations=declarations+"    cl(name, color);\n";	
			declarations=declarations+"}\n";	
			declarations=declarations+"//Asteroids\n";	
			declarations=declarations+"big_asteroid(\"Asteroid0\",7,7,7, Color.red);\n";	
			declarations=declarations+"big_asteroid(\"Asteroid1\",-7,-7,-7, Color.blue);\n";	
			declarations=declarations+"big_asteroid(\"Asteroid2\",14,14,14, Color.green);\n";	
			declarations=declarations+"big_asteroid(\"Asteroid3\",-14,-14,-14, Color.yellow);\n";	
			declarations=declarations+"\n";			
			upd="//Use arrow keys and [A] and [Z] and Space\n";
			upd=upd+"if (Input.GetKey (KeyCode.RightArrow))\n";
			upd=upd+"    rt(\"camera\",0,100,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.LeftArrow))\n";
			upd=upd+"    rt(\"camera\",0,-100,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.UpArrow))\n";
			upd=upd+"    rt(\"camera\",100,0,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.DownArrow))\n";
			upd=upd+"    rt(\"camera\",-100,0,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.A))\n";
			upd=upd+"    mv(\"camera\",0,0,10);\n";
			upd=upd+"if (Input.GetKey (KeyCode.Z))\n";
			upd=upd+"    mv(\"camera\",0,0,-10);\n";
			upd=upd+"if (Input.GetKey (KeyCode.Space)) {\n";
			upd=upd+"    qb(\"bullet\",0,0,0);\n";
			upd=upd+"    eq(\"bullet\",\"camera\");//sets the bullet rotation and location to the same as the camera\n";
			upd=upd+"}\n";		
			upd=upd+"if (ex(\"bullet\")) {\n";
			upd=upd+"   mv(\"bullet\",0,0,10);\n";
			upd=upd+"}\n";	
			upd=upd+"if(cd(\"bullet\",\"Asteroid0\")) \n";
			upd=upd+"    dl(\"Asteroid0\");\n";
			upd=upd+"if(cd(\"bullet\",\"Asteroid1\")) \n";
			upd=upd+"    dl(\"Asteroid1\");\n";
			upd=upd+"if(cd(\"bullet\",\"Asteroid2\")) \n";
			upd=upd+"    dl(\"Asteroid2\");\n";
			upd=upd+"if(cd(\"bullet\",\"Asteroid3\")) \n";
			upd=upd+"    dl(\"Asteroid3\");\n";
			evalDeclarations();
		}	
		
		ExampleButtonOffset = ExampleButtonOffset+ButtonWidth;
		if(GUI.Button(Rect(ExampleButtonOffset,10,ButtonWidth,20),"18")) {//Load example 18
			initexample();		
			declarations="//First person 3D platformer\n";
			declarations=declarations+"//draw floor\n";
			declarations=declarations+"for(x=-20;x<20;x++) {\n";
			declarations=declarations+"for(y=-20;y<20;y++) {\n";
			declarations=declarations+"     qb(\"floor\",x,-5,y);\n";
			declarations=declarations+"}}\n";
			declarations=declarations+"cl(\"floor\", Color.green);\n";
			declarations=declarations+"//trees\n";
			declarations=declarations+"function drawtree(x,y,z) {\n";
			declarations=declarations+"    var Brown : Color = Color(139.0,69.0,190.0);//RGB\n";
			declarations=declarations+"    qb(\"trunk\",x,y,z);\n";
			declarations=declarations+"    qb(\"trunk\",x,y+1,z);\n";
			declarations=declarations+"    qb(\"trunk\",x,y+2,z);\n";
			declarations=declarations+"    qb(\"trunk\",x,y+3,z);\n";
			declarations=declarations+"    cl(\"trunk\", Brown);\n";
			declarations=declarations+"    qb(\"bush\",x,y+4,z);\n";
			declarations=declarations+"    qb(\"bush\",x+1,y+4,z);\n";
			declarations=declarations+"    qb(\"bush\",x-1,y+4,z);\n";
			declarations=declarations+"    cl(\"bush\", Color.green);\n";
			declarations=declarations+"}\n";
			declarations=declarations+"//trees in front\n";
			declarations=declarations+"drawtree(0,-4,0);\n";
			declarations=declarations+"drawtree(5,-4,5);\n";
			declarations=declarations+"drawtree( -5,-4,15);\n";
			declarations=declarations+"//trees behind\n";
			declarations=declarations+"drawtree(-3,-4,-10);\n";
			declarations=declarations+"drawtree(-10,-4,-10);\n";
			declarations=declarations+"drawtree(5,-4,-15);\n";
			declarations=declarations+"\n";
			declarations=declarations+"vars[\"gforce\"]=-20;\n";
			upd="//Use arrow keys to move, Space to jump\n";
			upd=upd+"//Implement gravity\n";
			upd=upd+"if(!cd(\"camera\",\"floor\")&&!cd(\"camera\",\"bush\"))\n";
			upd=upd+"    mv(\"camera\",0,vars[\"gforce\"],0);\n";
			upd=upd+"//Get user input\n";
			upd=upd+"if (Input.GetKey (KeyCode.RightArrow))\n";
			upd=upd+"    rt(\"camera\",0,100,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.LeftArrow))\n";
			upd=upd+"    rt(\"camera\",0,-100,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.Space)) mv(\"camera\",0,100,0);\n";
			upd=upd+"if (Input.GetKey (KeyCode.UpArrow)&&!cd(\"camera\",\"trunk\"))\n";
			upd=upd+"    mv(\"camera\",0,0,10);\n";
			upd=upd+"if (Input.GetKey (KeyCode.DownArrow))\n";
			upd=upd+"    mv(\"camera\",0,0,-10);\n";
			evalDeclarations();
		}			
	} 
	if(ObjectEditorMode){//Object Editor Mode
		GUI.DrawTexture(position, crosshairTexture);
		if(GUI.Button(Rect(740,10,140,20),"Upload to cloud")) {//Load example 1
			EditBig=false;
	    	if(!LoginSuccesful) {
	    	    Message="Please log-in first";
	    		ShowMessageBox=true;
	    		return;
	    	}
			postprogram("http://180.57.166.53/3dpl/3dplapi.php?action=post_program&email=usmpadow@gmail.com&password=testpassword&name=un_named_program","no description provided");
	 	}
		if(GUI.Button(Rect(880,10,140,20),"Download from cloud")) {
			EditBig=false;
			//use the limit mysql command to show only the page wanted select * from ppl_users limit 8,2;
	    	//geturl("https://api.github.com/users/amigojapan/gists");
	    	geturl("http://180.57.166.53/3dpl/3dplapi.php?action=get_listing&email=usmpadow@gmail.com&password=testpassword&starting_from_row=0&sort=top_rated");
	
			if(www!=null) Debug.Log(www.text);//GUILayout.TextArea (www.text, 700);
			ShowDownloadMenu=true;
	 	}
	 	if(GUI.Button(Rect(740,30,140,20),"Login")) {//Load example 1
	 		EditBig=false;
			ShowloginMenu=true;
	 	}
	 	if(GUI.Button(Rect(880,30,140,20),"Register")) {//Load example 1
	 		EditBig=false;
			postprogram("http://180.57.166.53/3dpl/3dplapi.php?action=post_program&email=usmpadow@gmail.com&password=testpassword&name=un_named_program","no description provided");
	 	}
	 	if(GUI.Button(Rect(740,50,140,20),"Save Object")) {//Load example 1
	 		EditBig=false;
			Message="Save object to:"+dataPath;
			InputAction="SaveObject";	
			ShowFileDialog=true;
		}	
	 	if(GUI.Button(Rect(880,50,140,20),"Load Object")) {//Load example 1
	 		EditBig=false;
			Message="Load program from:"+dataPath;
			InputAction="LoadObject";	
			ShowFileDialog=true;
	 	}
	 	if(GUI.Button(Rect(740,70,140,20),"About")) {//Load example 1
	 		EditBig=false;
			Message=AboutBoxContent;
			ShowMessageBox=true;
		}
	 	if(GUI.Button(Rect(880,70,140,20),"Debug On/Off")) {//Load example 1
	 		ShowDebug=!ShowDebug;//flip the value
		}
		if(GUI.Button(Rect(740,90,280,20),"Main Menu")) {//Load example 1
			cs();
			//show mouse before leaving object editor
			MouseMove=true;
			/*
		    Screen.showCursor = !MouseMove;//Hide  the cursor when editing blocks, and show it when not editing
		    if(!Screen.showCursor)
		    	Screen.lockCursor = true; //this only works on executable
		    else
		    	Screen.lockCursor = false;
		    */
			ObjectEditorMode=false;
			ShowMainMenu=true;
		}
		if(GUI.Button(Rect(740,110,140,20),"Object Editor Help")) {//Load example 1
			Message="The green cube is the axis point of your object, draw around it.\nUse arrow keys or mouse to rotate the camera, [W] and [S] to zoom [T] and [G] to zoom slowly (Linear movement [R] Up [F] Down [D] Right [A] Left.)\n[ESC] to toggle between mouse moving mode and mouse pointer mode\n[SPACE] to place a cube and [E] to erase a cube [Q] to steal the properties of the cube infront of you.\n[Z] and [X] to do a barrel roll spin like an airplane, [N] to stablelize the camera(Use this when you are facing at an object at a weird angle).\n[M] to switch between static and  moving camera drawing modes.\nIn Static camera mode, arrows move up down left right [W] moves forward [S] moves back.\nAfter changin a property, click the center of the screen to continue placing cubes.";
			ShowMessageBox=true;
		}
	 	if(GUI.Button(Rect(880,110,140,20),"Quit 3dpl")) {//Load example 1
	 		  Application.Quit();
		}
	 	if(GUI.Button(Rect(740,130,140,20),"Export XML")) {//Load example 1
	 		EditBig=false;
			Message="Save object to:"+dataPath;
			InputAction="ExportXML";	
			ShowFileDialog=true;
		}	
	 	if(GUI.Button(Rect(880,130,140,20),"Import XML")) {//Load example 1
	 		EditBig=false;
			Message="Load program from:"+dataPath;
			InputAction="ImportXML";	
			ShowFileDialog=true;
	 	}
		
		//Properties dialog
	 	GUILayout.BeginArea(Rect(0,10,220,600));//470 is the y position of the start button when the edit window is maximaized
	 		GUILayout.Label("Properties");
		 	scrollPosition = GUILayout.BeginScrollView (scrollPosition, GUILayout.Width (220), GUILayout.Height (500));
			    GUILayout.Label("Select File or Web(URL)");
			    if(GUILayout.Button(CurrentTextureWebOrFile))
			    	if(CurrentTextureWebOrFile=="File") CurrentTextureWebOrFile="Web"; else CurrentTextureWebOrFile="File";
			    GUILayout.Label(CurrentTextureWebOrFile=="Web"?"Texture URL":"Current Texture File Name");
			    CurrentTextureName=GUILayout.TextField(CurrentTextureName);
			    if(GUILayout.Button("Browse Textures")) {InputAction="BrowseTextures";ShowFileDialog=true;}
			    //Add Browse button for browsing texture names
			    GUILayout.Label("Wrap texture around 1\nor 6 sides of the cube");
			    if(GUILayout.Button(CurrentWrapOnSides=="1"?"Change to 6 sides":"Change to 1 side"))
			    	if(CurrentWrapOnSides=="1") CurrentWrapOnSides="6"; else CurrentWrapOnSides="1";
			    GUILayout.Label("Alpha channel(transparentcy\n1=opauqe\n0.5=half transarent etc...");
			    Currentalpha=GUILayout.TextField(Currentalpha);
			    GUILayout.Label("Set Color to:");
			    //if(GUILayout.Button("Clear(no Color)")) {CurrentColor=;}//Color.clear
			    if(GUILayout.Button("White")) {CurrentRedValue="255";CurrentGreenValue="255";CurrentBlueValue="255";}
			    if(GUILayout.Button("Black")) {CurrentRedValue="0";CurrentGreenValue="0";CurrentBlueValue="0";}
			    if(GUILayout.Button("Blue")) {CurrentRedValue="0";CurrentGreenValue="0";CurrentBlueValue="255";}
			    if(GUILayout.Button("Green")) {CurrentRedValue="0";CurrentGreenValue="255";CurrentBlueValue="0";}
			    if(GUILayout.Button("Red")) {CurrentRedValue="255";CurrentGreenValue="0";CurrentBlueValue="0";}
			    //if(GUILayout.Button("Yellow")) {CurrentColor=Color.yellow;}
			    GUILayout.Label("Set Color to RGB(Reg Green Blue)\nDecimal value:");
			    if(GUILayout.Button("See color chart")) Application.OpenURL("http://www.rapidtables.com/web/color/RGB_Color.htm");
			    GUILayout.Label("Red");
			    CurrentRedValue=GUILayout.TextField(CurrentRedValue);
			    GUILayout.Label("Green");
			    CurrentGreenValue=GUILayout.TextField(CurrentGreenValue);
			    GUILayout.Label("Blue");
			    CurrentBlueValue=GUILayout.TextField(CurrentBlueValue);
			    if(GUILayout.Button("Set to this RGB")) {
			    	var garbage:int;
		  			try {
						garbage =  int.Parse(CurrentRedValue);
					    garbage =  int.Parse(CurrentGreenValue);
					    garbage =  int.Parse(CurrentBlueValue);
				    } catch(err) {
		   				Message="Invalid number for Colors, must be an integer number from 0 to 255";
		   				ShowMessageBox=true;
		   				return;
				   }
				}
 				GUILayout.Label("Draw Static Camera [M] key\nThis may be an easier way to draw\nthan flying for some cases.");
			    if(GUILayout.Button(DrawMovingGuide=="On"?"Turn off":"Turn on"))
			    	if(DrawMovingGuide=="On") DrawMovingGuide="Off"; else DrawMovingGuide="On";
 				GUILayout.Label("Teleport to point of orgigin\n(useful when you geyt lost)");
			    if(GUILayout.Button("Teleport to point of orgigin"))
			    	reinitcamera();
 				GUILayout.Label("Green \"guide\" flash");
			    if(GUILayout.Button(GiudingGreenLight=="On"?"Turn off":"Turn on")) {
			    	if(GiudingGreenLight=="On") GiudingGreenLight="Off"; else GiudingGreenLight="On";
			    	GiudingGreenLightChange=true;
			    }
			    
			    if(GUILayout.Button(ObjectEditorCollisionDetection?"Turn off Collision Detection":"Turn on Collision Detection")) {
			    	ObjectEditorCollisionDetection=!ObjectEditorCollisionDetection;//if(ObjectEditorCollisionDetection) GiudingGreenLight="Off"; else GiudingGreenLight="On";
			    }
			  	GUILayout.Label("Next Cube's Name(ID)\nModify this when you want to\nhave control over a single cube\n of the object.");
			    CurrentCubesName=GUILayout.TextField(CurrentCubesName);
			  if(GUILayout.Button("OK (or click center of screen)")) {//gives focous back to the game area
				    GUI.SetNextControlName("");
					GUI.FocusControl("");
			    }
		    GUILayout.EndScrollView ();
		GUILayout.EndArea();
	}
	//view in both modes
	//show current coordinates on bottom right
	//GUI.TextField(Rect(800,500,100,20), 
	GUI.TextField(Rect(Screen.width-190,Screen.height-120,100,20),
	"x="+Mathf.Round(Camera.main.gameObject.transform.position.x).ToString()+
	"y="+Mathf.Round(Camera.main.gameObject.transform.position.y).ToString()+
	"z="+Mathf.Round(Camera.main.gameObject.transform.position.z).ToString());
	//TeleportX=GUI.TextField(Rect(800,520,30,20),TeleportX);
	//TeleportY=GUI.TextField(Rect(830,520,30,20),TeleportY);
	//TeleportZ=GUI.TextField(Rect(860,520,30,20),TeleportZ);
	TeleportX=GUI.TextField(Rect(Screen.width-190,Screen.height-100,30,20),TeleportX);
	TeleportY=GUI.TextField(Rect(Screen.width-160,Screen.height-100,30,20),TeleportY);
	TeleportZ=GUI.TextField(Rect(Screen.width-130,Screen.height-100,30,20),TeleportZ);
	
	//if(GUI.Button(Rect(890,520,30,20),"Go!")) {
	if(GUI.Button(Rect(Screen.width-100,Screen.height-100,30,20),"Go!")) {
  		Camera.main.gameObject.transform.position.x=int.Parse(TeleportX);	
  		Camera.main.gameObject.transform.position.y=int.Parse(TeleportY);	
  		Camera.main.gameObject.transform.position.z=int.Parse(TeleportZ);	
	}
 	//debug view
  	if(ShowDebug) {
	 	GUILayout.BeginArea(Rect(0,470+30,710,100));//470 is the y position of the start button when the edit window is maximaized
		 	scrollPosition = GUILayout.BeginScrollView (scrollPosition, GUILayout.Width (710), GUILayout.Height (80));
			    GUILayout.TextArea (debugString);
			   	GUILayout.Label("All Object count " + FindObjectsOfType(typeof(UnityEngine.Object)).Length+
			   	"\nCubes " + cubes.length+
			   	"\nTextures " + FindObjectsOfType(typeof(Texture)).Length+
			   	"\nAudioClips " + FindObjectsOfType(typeof(AudioClip)).Length+
			   	"\nMeshes " + FindObjectsOfType(typeof(Mesh)).Length+
			   	"\nMaterials " + FindObjectsOfType(typeof(Material)).Length+
			   	"\nGameObjects " + FindObjectsOfType(typeof(GameObject)).Length+
			   	"\nComponents " + FindObjectsOfType(typeof(Component)).Length);

		    GUILayout.EndScrollView ();
			if (GUILayout.Button ("Clear")) {
			        debugString = "Debug info:\n";
			        //Type T = typeof(GUIUtility);
			        //System.Reflection.PropertyInfo P = T.GetProperty("systemCopyBuffer", System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic);
			        //P.SetValue(null,debugString,null);
			        //window.clipboardData.setData('text','This has been copied to your clipboard.');
			        //var a : System.Collections.Generic.List.<Object> = new System.Collections.Generic.List.<Object>;
			        //a.Add(item);
			}
		GUILayout.EndArea();
	}
  	if(ShowMessageBox){
		GUILayout.BeginArea(new Rect(250,100,500,500));
            GUILayout.Label(Message);
            if(GUILayout.Button("Dismiss")) ShowMessageBox=false;
		GUILayout.EndArea();			
	}

 	if(ShowInputBox){
		GUILayout.BeginArea(new Rect(250,100,500,500));
            GUILayout.Label(Message);
            UserInput=GUILayout.TextField(UserInput);            
            if(GUILayout.Button("OK")) {
            	//var path = dataPath+"/";
            	//if(InputAction=="SetNameForCurrentCubes"){
            	//	CurrentCubesName=UserInput;
            	//}
            	if(InputAction=="Load"){
            	}
            	InputAction="";
               	ShowInputBox=false;
            	return;
            }
            if(GUILayout.Button("Dismiss")) ShowInputBox=false;
		GUILayout.EndArea();
	}
 	if(ShowFileDialog){
		var fileInfo;
		if(InputAction=="Save" || InputAction=="Load") {
	 		path = dataPath+"/Programs/";
			fileInfo = new System.IO.Directory.GetFiles(path,"*.declarations");
		} else if(InputAction=="SaveObject" || InputAction=="LoadObject") {
	 		path = dataPath+"/Objects/";
			fileInfo = new System.IO.Directory.GetFiles(path,"*.obj");
		} else if(InputAction=="ImportXML" || InputAction=="ExportXML") {
	 		path = dataPath+"/Objects/";
			fileInfo = new System.IO.Directory.GetFiles(path,"*.xml");
		} else if(InputAction=="BrowseTextures") { 
	 		path = dataPath+"/Textures/";
			fileInfo = new System.IO.Directory.GetFiles(path);
		} else if(InputAction=="BrowseObjects") {
	 		path = dataPath+"/Objects/";
			fileInfo = new System.IO.Directory.GetFiles(path,"*.obj");
		} else if(InputAction=="SaveMap" || InputAction=="LoadMap") {
	 		path = dataPath+"/Maps/";
			fileInfo = new System.IO.Directory.GetFiles(path,"*.map");
		}
		GUILayout.BeginArea(new Rect(250,100,500,500));
            GUILayout.Label(Message);
		 	scrollPositionFileDialog = GUILayout.BeginScrollView (scrollPositionFileDialog, GUILayout.Width (500), GUILayout.Height (200));
		 		var counter=0;
				for (var junk in fileInfo) {
					var strFile=fileInfo[counter];
					if(InputAction=="Save" || InputAction=="Load") {
						strFile=strFile.Substring(path.Length, strFile.Length-".declarations".Length-path.Length);//get just the program name, no extention or path
					}else{
						strFile=strFile.Substring(path.Length, strFile.Length-path.Length);//get the xml filename with extention
					}	
					if(GUILayout.Button(strFile)) UserInput=strFile;
					counter++;
				}
		    GUILayout.EndScrollView ();
            UserInput=GUILayout.TextField(UserInput);
            if(GUILayout.Button("OK")) {
            	if(InputAction=="Save"){
            		System.IO.File.WriteAllText(path+UserInput+".declarations", declarations);
            		System.IO.File.WriteAllText(path+UserInput+".update", upd);            		
            	}
            	if(InputAction=="Load"){            		
            		declarations=System.IO.File.ReadAllText(path+UserInput+".declarations");
	           		upd=System.IO.File.ReadAllText(path+UserInput+".update");
	           		cs();//I am trying to fix the problem that when I load a program that has a huge map, it says "Could not create actor. Maybe you are using too many colliders or rigidbodies in you scene?" I think it is because I have not cleared teh cubes fist, this did not work :(
					//evalDeclarations();
					Debug.Log("Load reached");
            	}
            	var serializer : XmlSerializer;
            	//var stream : Stream;
            	if(InputAction=="SaveObject"){
            		if(UserInput.Substring(UserInput.Length-4)!=".obj") 
            			UserInput=UserInput+".obj";
            			
					SaveLoad.SaveFile(path+UserInput , ObjectBuilderList);
				
					Message="Save compelted succesfully!";
					ShowMessageBox=true;   	
					//Remove Object from List, so that it gets loaded again, because it has been modified
					for(var obj:LoadedObject in LoadedObjectList) {
						if(obj.ObjectName==UserInput) {
							LoadedObjectList.Remove(obj);
						}
					}
					//TODO:clean up unseen object at the far away point.
            	}
            	if(InputAction=="LoadObject"){
       				cs();
	 				reinitcamera();
	 				//possible bug, I heard that textures appear to be seen twice when loading an XML in Object edior
	 				//I can think that the cause may be because I am not clearing ObjectBuilderList before deserializing the
	 				//XML, I would not think that it would append it to the list, but it is possible.
										
					ObjectBuilderList=SaveLoad.LoadFile(path+UserInput);
					//Render cubes
					for(cords in ObjectBuilderList) {
				    	qb(cords.cubename, cords.x,cords.y,cords.z);
		  				if(cords.r!=255||cords.g!=255||cords.b!=255) cl(cords.cubename, Color32(cords.r,cords.g,cords.b,255));
		  				if(cords.alpha!=1.0) alpha(cords.cubename, cords.alpha);
		  				if(cords.TextureName!="") tx(cords.cubename, cords.TextureName,cords.TextureWebOrFile,cords.WrapOnSides);
					}
					GiudingGreenLightChange=true;//this is a hack to prevent the cube from becomming opaque qhen loading an xml file
					//vars["cubesarray"]= new System.Collections.Generic.List.<Coordinates>();
					//vars["cubesarray"] = ObjectBuilderList;    		
               	}

            	if(InputAction=="ExportXML"){
            		if(UserInput.Substring(UserInput.Length-4)!=".xml") 
            			UserInput=UserInput+".xml";
	                serializer = new XmlSerializer(typeof(System.Collections.Generic.List.<Coordinates>));	                
	                var stream = new FileStream(path+UserInput, FileMode.Create);
	                var writer =    new  System.Xml.XmlTextWriter(stream,  System.Text.Encoding.UTF8);
					serializer.Serialize(writer, ObjectBuilderList);
					writer.Close();
					Message="Save compelted succesfully!";
					ShowMessageBox=true;   	
					//Remove Object from List, so that it gets loaded again, because it has been modified
					for(var obj:LoadedObject in LoadedObjectList) {
						if(obj.ObjectName==UserInput) {
							LoadedObjectList.Remove(obj);
						}
					}
					//TODO:clean up unseen object at the far away point.
            	}
            	if(InputAction=="ImportXML"){
       				cs();
	 				reinitcamera();
	 				//possible bug, I heard that textures appear to be seen twice when loading an XML in Object edior
	 				//I can think that the cause may be because I am not clearing ObjectBuilderList before deserializing the
	 				//XML, I would not think that it would append it to the list, but it is possible.

	                serializer = new XmlSerializer(typeof(System.Collections.Generic.List.<Coordinates>));	                
	                reader = new FileStream(path+UserInput, FileMode.Open);
					//serializer.Serialize(writer, ObjectBuilderList);
					ObjectBuilderList = serializer.Deserialize(reader) as System.Collections.Generic.List.<Coordinates>;
					reader.Close();
					
					//Render cubes
					for(cords in ObjectBuilderList) {
				    	qb(cords.cubename, cords.x,cords.y,cords.z);
		  				if(cords.r!=255||cords.g!=255||cords.b!=255) cl(cords.cubename, Color32(cords.r,cords.g,cords.b,255));
		  				if(cords.alpha!=1.0) alpha(cords.cubename, cords.alpha);
		  				if(cords.TextureName!="") tx(cords.cubename, cords.TextureName,cords.TextureWebOrFile,cords.WrapOnSides);
					}
					GiudingGreenLightChange=true;//this is a hack to prevent the cube from becomming opaque qhen loading an xml file
					//vars["cubesarray"]= new System.Collections.Generic.List.<Coordinates>();
					//vars["cubesarray"] = ObjectBuilderList;    		
               	}
				if(InputAction=="BrowseTextures") {
				 	CurrentTextureName=UserInput;
				}
				if(InputAction=="BrowseObjects") {
					Message="Loading Object...";
					ShowMessageBox=true;
					if(ex("MapPointer")) dl("MapPointer");
					vars["pointer"]=Obj(UserInput,"MapPointer",Mathf.Round(Camera.main.gameObject.transform.position.x),0,Mathf.Round(Camera.main.gameObject.transform.position.y));
					CurrentObjFilename=UserInput;
					ShowMessageBox=false;
					MapLoadedObjectsList.Add(UserInput);
				}
				
            	if(InputAction=="SaveMap"){
            		if(UserInput.Substring(UserInput.Length-4)!=".map") 
            			UserInput=UserInput+".map";
            			
					SaveLoad.SaveFile(path+UserInput , MapObjectBuilderList);
				
					Message="Save compelted succesfully!";
					ShowMessageBox=true;   	
            	}
            	if(InputAction=="LoadMap"){
       				cs();
	 					
					MapObjectBuilderList=SaveLoad.LoadFile(path+UserInput);
					//Render cubes
					for(cords in MapObjectBuilderList) {
						var myObj=Obj(cords.objfilename,cords.instancename,cords.x,cords.y,cords.z);
						myObj.transform.rotation = Quaternion.Euler(cords.rotx,cords.roty,cords.rotz);	
					}
					GiudingGreenLightChange=true;//this is a hack to prevent the cube from becomming opaque qhen loading an xml file
					//vars["cubesarray"]= new System.Collections.Generic.List.<Coordinates>();
					//vars["cubesarray"] = ObjectBuilderList;    		
               	}
				
            	InputAction="";
               	ShowFileDialog=false;
            	return;
            }
            if(GUILayout.Button("Dismiss")) ShowFileDialog=false;
		GUILayout.EndArea();
	}	
	
	if(ShowloginMenu){
		GUILayout.BeginArea(new Rect(250,100,500,500));
            GUILayout.Label("Login:(if you have not registered yet, click register)");
            GUILayout.Label("Email");
            //var InputEmail;
            InputEmail=GUILayout.TextField(InputEmail);
            GUILayout.Label("Password");
            //var InputPassword;
            InputPassword=GUILayout.TextField(InputPassword);
            if(GUILayout.Button("OK,Login!")) {
            	ShowloginMenu=false;
            	geturl("http://180.57.166.53/3dpl/3dplapi.php?action=login&email="+WWW.EscapeURL(InputEmail)+"&password="+WWW.EscapeURL(InputPassword));
            	Message=www.text;
            	ShowMessageBox=true;
            	if(www.text=="login succesful") LoginSuccesful=true;
            }
            if(GUILayout.Button("I forgot my password, send it to me by email")) {
            	ShowloginMenu=false;
            	//geturl("http://180.57.166.53/3dpl/3dplapi.php?action=get_program&email=usmpadow@gmail.com&password=testpassword&progID="+progID);
            	//ShowDescriptionAndDownloadMenu=true;
            }
            if(GUILayout.Button("Dismiss")) ShowloginMenu=false;
		GUILayout.EndArea();
		
	}

	if(ShowDownloadMenu){
		if(www!=null) var txt2: String=www.text;
		var txt3=txt2.Substring(0,txt2.Length-1);//get rid of the last newline
		var ListItems=txt3.Split('\n'[0]);
		GUILayout.BeginArea(new Rect(250,100,500,500));
            GUILayout.Label("Downloads: Program ID, Name, Sum of Votes, Total Votes ");
            for(var txtButtonInfo in ListItems) if(GUILayout.Button(txtButtonInfo)) {
	            	ShowDownloadMenu=false;
	            	//download selected program
	            	var progID:String=txtButtonInfo.Split(','[0])[0];
	            	//Debug.Log(progID);
	            	geturl("http://180.57.166.53/3dpl/3dplapi.php?action=get_program&email=usmpadow@gmail.com&password=testpassword&progID="+progID);
	            	ShowDescriptionAndDownloadMenu=true;
            	}
            if(GUILayout.Button("Dismiss")) ShowDownloadMenu=false;
		GUILayout.EndArea();
		
	}
	if(ShowDescriptionAndDownloadMenu){
		if(www!=null) var txt5: String=www.text;
		var ProgramDescription = GetContetsOfTag(txt5,"description");
		var ProgramDeclarations = GetContetsOfTag(txt5,"declarations");
		var ProgramUpdateFunction = GetContetsOfTag(txt5,"updatefunction");
		GUILayout.BeginArea(new Rect(250,100,500,500));
            GUILayout.Label("Downloaded program description:");
            GUILayout.Label(ProgramDescription);
            GUILayout.Label("Warning! these programs, like any other program, may contain viruses, Load them at your own risk");
            if(GUILayout.Button("Load program")) { 
	            	initexample();//I know I should rename this function, since it is not only used for examples
	            	declarations=ProgramDeclarations;
	            	upd=ProgramUpdateFunction;
	            	ShowDescriptionAndDownloadMenu=false; 
	            	evalDeclarations();
            	}
            if(GUILayout.Button("Don't Load")) { ShowDescriptionAndDownloadMenu=false; }
		GUILayout.EndArea();
	}

	//add example of scaleing
}
//string cleanString = Regex.Replace(inputString, @"[^0-9\-]", "");
