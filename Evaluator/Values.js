// Values.js - Core game engine classes and value definitions

// Helper classes and types

// Creates a 3D vector with x, y, z coordinates for positioning and distance calculations
class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    // Calculates the 3D distance between this vector and another vector
    distance(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}

// Returns a default type string for value classification
function Type() {
    return 'default';
}

// Factory function that creates and returns a new Value instance
function Values() {
    return new Value();
}



// Original classes (unchanged with original comments preserved)
class Value{
    constructor(key,value){
        this.iskeycode=false;       // if the property is within the gameengine variable to search for in the object itself
        this.key='';                //value name
        this.value='';              //value to convert
        this.type=Type();           //type of the value
        this.valueobject=null;      // this is just a value but is a reference to an object

    }
}   

class Operation{

    constructor(key,value){
        this.activator=new Activator();     //how or when is this operation starts
        this.valuetarget=new Value();       //value to read from an object, if not sef dfind the value on the other object
        this.valuetarget2=new Value();      //value to affect on an object, if not sef dfind the value on the other object
        this.overrideoperation='';          //full code expression, all from above is not used
    }
}

class Activator{
    constructor(key,value){
        this.operation='greater than';      //(greater than, less than, equal to, not equal to, greater than or equal to, less than or equal to, or, and, xor, add, minus, divide, multiply, modulus, add_continuous, minus_continuous, divide_continuous, multiply_continuous, modulus_continuous)
        this.activation='Onhit'             //Onhit,Onhit_continuous,Onhit_left, Overlap, Overlap_continuous, Overlap_left,Other, OnConnectChild, OnConnectParent, ConnectedChildContinuous, ConnectedParentContinuous, OnSeparateChild, OnSeparateParent, Always, inradius, Self
        this.activatedby=new MultiType();   //type from an affector in this case since onHit then get the tags from the object that hit it
        this.distancevalmin=0.5;            //if not self(always), this is the value multiplier for min distance(will still be used if mindistance is greater than the current distance)
        this.distancevalmax=0.5;            //if not self(always), this is the value multiplier for max distance
        this.maxdistance=100;               //if not self(always)
        this.mindistance=10;                //if not self(always)
    }
}

class CommandValue {
    constructor() {
        this.activator=new Activator();     //how or when is this command starts
        this.values=[new Values()];         //values to readadable from an object
        this.targetClass='';                // which global class name to access
        this.targetfunction='';             // which function to access from the class or custom file
        this.filepath='';                   // for custom made classes/ files then access this torget its functions instead of the global classes
    }
}


class MultiType{
    constructor(key,value){
        this.types=['type1,type2'];         //types that tags something, also different combinations: (type1),(type2),(type1,type3),(type4,type5)
        this.mode='dynamic';                //whether this can also be called when other unrelated tags are included: dynamic,static
        this.excludetype=['','type3'];      //tags that are excluded,also on respective from the types
    } 
}


class Object{
    constructor(key,value){
        this.values=[new Values()];         //values to readadable from an object
        this.operations=[];                 //operations to affect the object or other objects
        this.tags=MultiType;                //tags of the object
        this.spawning=new Spawning();       //list of objects that this object will spawn
    }
}

class Spawning{
    constructor(key,value){
        this.tospawn=[];                    //either entity or object
        this.activator=new Activator();     //how or when is this spawner starts
        this.referenceobject=new Object();  //object to spawn
        this.facetarget=false;              //if there is a target, does it need to face that way on spawn
        this.isprojectile=false;            //is this a projectile
        this.undergroundspawn=false;        //can this object clip through the ground
        this.minspawnpos=new Vector3();     //min spawnpos from a referencetarget
        this.maxspawnpos=new Vector3();     //max spawnpos from a referencetarget
    }
}



// Individual context value that defines how a specific value should be evaluated
class ContextValue {
    constructor() {
        this.contextname='';                //name of the context
        this.embedded_memories = [];        //Array of Memory references
        this.tags = new MultiType();        //tags connected to this context

        this.embedded_values = [];          //variables that are related to this
        this.embedded_operations=[];        //operations that are related to this

        this.valuesconnected=[] ;           // The value to check (reference to object's value)
        this.comparisonType = [];           // 'equal', 'grth', 'lsth', 'inrange'
        this.requirementLevel = [];         // 'required', 'minor', 'not_required'
        this.targetValue = [];              // The value to compare against
        this.extraConsiderationRange = [];  // Additional range for 'minor' requirement level

        this.dissipationvalueranges=[];     //values to meet to calcel out this context
        this.convertible = false            //whether this context will become a value and replace the embedded values on the target once the conditions are met
    }
}
//CONTEXT, Values should also be context
//values can be a context
//context will ve added to an object if the values meet the context 