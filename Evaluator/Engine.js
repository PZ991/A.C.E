// Engine.js - Game engine runtime system that processes objects every 5 seconds
// Requires Values.js to be imported first

// Check if Vector3 is available from Values.js
if (typeof Vector3 === 'undefined') {
    console.error('Vector3 not found! Make sure Values.js is loaded first.');
}

// Main game engine class that manages all objects and processes their operations every 5 seconds
class GameEngine {
    constructor() {
        this.objects = [];
        this.globalVariables = {};
        this.running = false;
        this.tickInterval = null;
    }

    // Adds a new object to the engine's object collection for processing
    addObject(obj) {
        this.objects.push(obj);
        console.log(`Added object with ID: ${obj.id}`);
    }

    // Removes an object from the engine by its unique ID
    removeObject(id) {
        this.objects = this.objects.filter(obj => obj.id !== id);
        console.log(`Removed object with ID: ${id}`);
    }

    // Retrieves a value from an object based on the value specification (checks keycode, valueobject, or direct property)
    getValue(obj, valueSpec) {
        if (valueSpec.iskeycode) {
            return this.globalVariables[valueSpec.key] || 0;
        } else if (valueSpec.valueobject) {
            return valueSpec.valueobject[valueSpec.key] || valueSpec.value;
        } else {
            return obj[valueSpec.key] || valueSpec.value;
        }
    }

    // Sets a value on an object based on the value specification (updates keycode, valueobject, or direct property)
    setValue(obj, valueSpec, newValue) {
        if (valueSpec.iskeycode) {
            this.globalVariables[valueSpec.key] = newValue;
        } else if (valueSpec.valueobject) {
            valueSpec.valueobject[valueSpec.key] = newValue;
        } else {
            obj[valueSpec.key] = newValue;
        }
    }

    // Checks if two objects are within the distance range specified by the activator
    checkDistance(obj1, obj2, activator) {
        const distance = obj1.position.distance(obj2.position);
        return distance >= activator.mindistance && distance <= activator.maxdistance;
    }

    // Determines if an object matches the type requirements specified in a MultiType configuration
    matchesType(obj, multiType) {
        if (!obj.tags || obj.tags.length === 0) return false;
        
        const excludeTypes = multiType.excludetype.split(',').filter(t => t.trim());
        const targetTypes = multiType.types[0].split(',').filter(t => t.trim());
        
        // Check if object has excluded types
        for (let tag of obj.tags) {
            if (excludeTypes.includes(tag)) return false;
        }
        
        // Check if object matches target types
        switch (multiType.mode) {
            case 'dynamic':
                return targetTypes.some(type => obj.tags.includes(type));
            case 'sole':
                return targetTypes.every(type => obj.tags.includes(type)) && obj.tags.length === targetTypes.length;
            case 'static':
                return targetTypes.every(type => obj.tags.includes(type));
            default:
                return false;
        }
    }

    // Evaluates an operation between two objects and returns the result based on the operation type
    evaluateOperation(operation, sourceObj, targetObj = null) {
        if (operation.overrideoperation) {
            try {
                return eval(operation.overrideoperation);
            } catch (e) {
                console.error('Override operation failed:', e);
                return false;
            }
        }

        const value1 = this.getValue(operation.targetself ? sourceObj : targetObj, operation.valuetarget);
        const value2 = this.getValue(operation.targetself2 ? sourceObj : targetObj, operation.valuetarget2);

        switch (operation.activator.operation) {
            case 'greater than': return value1 > value2;
            case 'less than': return value1 < value2;
            case 'equal to': return value1 === value2;
            case 'not equal to': return value1 !== value2;
            case 'greater than or equal to': return value1 >= value2;
            case 'less than or equal to': return value1 <= value2;
            case 'or': return value1 || value2;
            case 'and': return value1 && value2;
            case 'xor': return !!(value1 ^ value2);
            case 'add': return value1 + value2;
            case 'minus': return value1 - value2;
            case 'divide': return value2 !== 0 ? value1 / value2 : 0;
            case 'multiply': return value1 * value2;
            case 'modulus': return value2 !== 0 ? value1 % value2 : 0;
            default: return false;
        }
    }

    // Processes activation conditions for an object and determines if an operation should trigger
    processActivation(obj, activator, otherObj = null) {
        switch (activator.activation) {
            case 'Always':
                return true;
            case 'Onhit':
            case 'Overlap':
                return otherObj && this.checkDistance(obj, otherObj, activator) && 
                       this.matchesType(otherObj, activator.activatedby);
            case 'inradius':
                return this.objects.some(other => 
                    other.id !== obj.id && 
                    this.checkDistance(obj, other, activator) && 
                    this.matchesType(other, activator.activatedby)
                );
            default:
                return false;
        }
    }

    // Processes a single object's operations and handles their activation and execution
    processObject(obj) {
        console.log(`Processing object ${obj.id} with tags: [${obj.tags.join(', ')}]`);
        
        // Process operations
        for (let operation of obj.operations) {
            let activated = false;
            let targetObj = null;

            // Check activation conditions
            if (operation.activator.activation === 'Always') {
                activated = true;
            } else {
                // Find potential target objects
                for (let other of this.objects) {
                    if (other.id !== obj.id && this.processActivation(obj, operation.activator, other)) {
                        activated = true;
                        targetObj = other;
                        break;
                    }
                }
            }

            if (activated) {
                const result = this.evaluateOperation(operation, obj, targetObj);
                console.log(`Operation result for ${obj.id}: ${result}`);
                
                // Handle continuous operations
                if (operation.activator.operation.includes('_continuous')) {
                    const baseOp = operation.activator.operation.replace('_continuous', '');
                    const value1 = this.getValue(operation.targetself ? obj : targetObj, operation.valuetarget);
                    const value2 = this.getValue(operation.targetself2 ? obj : targetObj, operation.valuetarget2);
                    
                    let newValue = value1;
                    switch (baseOp) {
                        case 'add': newValue = value1 + value2; break;
                        case 'minus': newValue = value1 - value2; break;
                        case 'multiply': newValue = value1 * value2; break;
                        case 'divide': newValue = value2 !== 0 ? value1 / value2 : value1; break;
                        case 'modulus': newValue = value2 !== 0 ? value1 % value2 : value1; break;
                    }
                    
                    this.setValue(operation.targetself ? obj : targetObj, operation.valuetarget, newValue);
                    console.log(`Updated value to: ${newValue}`);
                }
            }
        }
    }

    // Main tick function that processes all objects in the engine - called every 5 seconds
    tick() {
        console.log(`\n--- Game Engine Tick (${new Date().toLocaleTimeString()}) ---`);
        console.log(`Processing ${this.objects.length} objects`);
        
        for (let obj of this.objects) {
            this.processObject(obj);
        }
        
        console.log('--- Tick Complete ---\n');
    }

    // Starts the game engine runtime loop, processing all objects every 5 seconds
    start() {
        if (this.running) return;
        
        this.running = true;
        console.log('Game Engine Started - Running every 5 seconds');
        
        // Run immediately, then every 5 seconds
        this.tick();
        this.tickInterval = setInterval(() => this.tick(), 5000);
    }

    // Stops the game engine runtime loop and cleans up the interval
    stop() {
        if (!this.running) return;
        
        this.running = false;
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
            this.tickInterval = null;
        }
        console.log('Game Engine Stopped');
    }
}

// Test Case Setup

// Creates test objects with different behaviors for demonstrating the game engine functionality
function createTestObjects() {
    // Create a player object
    const player = new Object();
    player.tags = ['player', 'entity'];
    player.position = new Vector3(0, 0, 0);
    
    // Add a health value
    const healthValue = new Value();
    healthValue.key = 'health';
    healthValue.value = 100;
    player.values = [healthValue];
    player.health = 100;
    
    // Create an enemy object
    const enemy = new Object();
    enemy.tags = ['enemy', 'entity'];
    enemy.position = new Vector3(15, 0, 0); // Within range
    enemy.damage = 10;
    
    // Add an operation to enemy that damages player when in radius
    const damageOperation = new Operation();
    damageOperation.activator.activation = 'inradius';
    damageOperation.activator.operation = 'minus_continuous';
    damageOperation.activator.maxdistance = 20;
    damageOperation.activator.mindistance = 0;
    damageOperation.activator.activatedby.types = ['player'];
    damageOperation.activator.activatedby.mode = 'dynamic';
    
    damageOperation.valuetarget.key = 'health';
    damageOperation.targetself = false;
    damageOperation.valuetarget2.key = 'damage';
    damageOperation.targetself2 = true;
    
    enemy.operations = [damageOperation];
    
    // Create a healing item
    const healingItem = new Object();
    healingItem.tags = ['item', 'healing'];
    healingItem.position = new Vector3(5, 0, 0);
    healingItem.healAmount = 15;
    
    // Add operation that heals player when overlapping
    const healOperation = new Operation();
    healOperation.activator.activation = 'Overlap';
    healOperation.activator.operation = 'add_continuous';
    healOperation.activator.maxdistance = 5;
    healOperation.activator.mindistance = 0;
    healOperation.activator.activatedby.types = ['player'];
    healOperation.activator.activatedby.mode = 'dynamic';
    
    healOperation.valuetarget.key = 'health';
    healOperation.targetself = false;
    healOperation.valuetarget2.key = 'healAmount';
    healOperation.targetself2 = true;
    
    healingItem.operations = [healOperation];
    
    return [player, enemy, healingItem];
}

// Initialize and run test
console.log('=== Game Engine Runtime Test ===\n');

const engine = new GameEngine();
const testObjects = createTestObjects();

// Add objects to engine
testObjects.forEach(obj => engine.addObject(obj));

// Set some global variables for testing
engine.globalVariables.gameTime = 0;
engine.globalVariables.score = 0;

// Start the engine
engine.start();

// Stop the engine after 30 seconds for demo purposes
setTimeout(() => {
    engine.stop();
    console.log('\n=== Final State ===');
    testObjects.forEach(obj => {
        console.log(`Object ${obj.id} (${obj.tags.join(', ')}): health=${obj.health || 'N/A'}`);
    });
}, 30000);



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