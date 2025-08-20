class GameEngineUI {
    constructor() {
        this.engine = new GameEngine(this);
        this.selectedObject = null;
        this.setupEventListeners();
        this.createInitialObjects();
    }

    // Sets up all UI event listeners
    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => {
            this.engine.start();
        });

        document.getElementById('stopBtn').addEventListener('click', () => {
            this.engine.stop();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetObjects();
        });

        document.getElementById('addObjectBtn').addEventListener('click', () => {
            this.addRandomObject();
        });
    }

    // Creates initial test objects
    createInitialObjects() {
        const testObjects = this.createTestObjects();
        testObjects.forEach(obj => this.engine.addObject(obj));
        this.updateUI();
    }

    // Creates test objects for demonstration
    createTestObjects() {
        const player = new Object();
        player.tags = ['player', 'entity'];
        player.position = new Vector3(250, 250, 0);
        player.health = 100;
        player.maxHealth = 100;

        const enemy = new Object();
        enemy.tags = ['enemy', 'entity'];
        enemy.position = new Vector3(350, 250, 0);
        enemy.damage = 10;

        const damageOperation = new Operation();
        damageOperation.activator.activation = 'inradius';
        damageOperation.activator.operation = 'minus_continuous';
        damageOperation.activator.maxdistance = 80;
        damageOperation.activator.mindistance = 0;
        damageOperation.activator.activatedby.types = ['player'];
        damageOperation.activator.activatedby.mode = 'dynamic';
        
        damageOperation.valuetarget.key = 'health';
        damageOperation.targetself = false;
        damageOperation.valuetarget2.key = 'damage';
        damageOperation.targetself2 = true;
        
        enemy.operations = [damageOperation];

        const healingItem = new Object();
        healingItem.tags = ['item', 'healing'];
        healingItem.position = new Vector3(150, 250, 0);
        healingItem.healAmount = 15;

        const healOperation = new Operation();
        healOperation.activator.activation = 'Overlap';
        healOperation.activator.operation = 'add_continuous';
        healOperation.activator.maxdistance = 60;
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

    // Updates the entire UI
    updateUI() {
        this.renderObjects();
        this.updateObjectDetails();
        this.updateStats();
    }

    // Renders objects in the game world
    renderObjects() {
        const canvas = document.getElementById('worldCanvas');
        canvas.innerHTML = '';

        this.engine.objects.forEach(obj => {
            const element = document.createElement('div');
            element.className = `object ${obj.tags[0]}`;
            element.id = `obj-${obj.id}`;
            
            const size = obj.tags[0] === 'player' ? 40 : obj.tags[0] === 'enemy' ? 35 : 30;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.left = `${obj.position.x - size/2}px`;
            element.style.top = `${obj.position.y - size/2}px`;
            
            const emoji = obj.tags[0] === 'player' ? '👤' : obj.tags[0] === 'enemy' ? '👹' : '💊';
            element.textContent = emoji;
            
            element.addEventListener('click', () => {
                this.selectObject(obj);
            });

            canvas.appendChild(element);

            // Add range indicators for objects with operations
            obj.operations.forEach(operation => {
                if (operation.activator.maxdistance > 0) {
                    const range = document.createElement('div');
                    range.className = 'range-indicator';
                    const rangeSize = operation.activator.maxdistance * 2;
                    range.style.width = `${rangeSize}px`;
                    range.style.height = `${rangeSize}px`;
                    range.style.left = `${obj.position.x - rangeSize/2}px`;
                    range.style.top = `${obj.position.y - rangeSize/2}px`;
                    
                    canvas.appendChild(range);
                }
            });
        });
    }

    // Selects an object for detailed view
    selectObject(obj) {
        this.selectedObject = obj;
        this.updateObjectDetails();
        
        // Highlight selected object and its ranges
        document.querySelectorAll('.object').forEach(el => el.style.border = '');
        document.querySelectorAll('.range-indicator').forEach(el => el.classList.remove('active'));
        
        const element = document.getElementById(`obj-${obj.id}`);
        if (element) {
            element.style.border = '3px solid yellow';
        }
        
        // Highlight ranges for selected object
        const canvas = document.getElementById('worldCanvas');
        const ranges = canvas.querySelectorAll('.range-indicator');
        const objIndex = this.engine.objects.indexOf(obj);
        if (ranges[objIndex]) {
            ranges[objIndex].classList.add('active');
        }
    }

    // Updates object details panel
    updateObjectDetails() {
        const container = document.getElementById('objectDetails');
        container.innerHTML = '';

        this.engine.objects.forEach(obj => {
            const info = document.createElement('div');
            info.className = `object-info ${obj.tags[0]}`;
            
            const header = document.createElement('h4');
            header.innerHTML = `
                <span>${obj.tags[0].charAt(0).toUpperCase() + obj.tags[0].slice(1)}</span>
                <span style="font-size: 12px; opacity: 0.7;">${obj.id.substring(0, 6)}</span>
            `;
            info.appendChild(header);

            const tags = document.createElement('div');
            obj.tags.forEach(tag => {
                if (tag) {
                    const tagEl = document.createElement('span');
                    tagEl.className = 'tag';
                    tagEl.textContent = tag;
                    tags.appendChild(tagEl);
                }
            });
            info.appendChild(tags);

            // Show health if available
            if (obj.health !== undefined) {
                const healthDiv = document.createElement('div');
                const healthPercent = Math.max(0, Math.min(100, (obj.health / (obj.maxHealth || 100)) * 100));
                healthDiv.innerHTML = `
                    <div class="property">
                        <span>Health:</span>
                        <span class="property-value">${Math.round(obj.health)}/${obj.maxHealth || 100}</span>
                    </div>
                    <div class="health-bar">
                        <div class="health-fill" style="width: ${healthPercent}%"></div>
                    </div>
                `;
                info.appendChild(healthDiv);
            }

            // Show other properties
            const properties = ['damage', 'healAmount'];
            properties.forEach(prop => {
                if (obj[prop] !== undefined) {
                    const propDiv = document.createElement('div');
                    propDiv.className = 'property';
                    propDiv.innerHTML = `
                        <span>${prop.charAt(0).toUpperCase() + prop.slice(1)}:</span>
                        <span class="property-value">${obj[prop]}</span>
                    `;
                    info.appendChild(propDiv);
                }
            });

            // Show position
            const posDiv = document.createElement('div');
            posDiv.className = 'property';
            posDiv.innerHTML = `
                <span>Position:</span>
                <span class="property-value">(${Math.round(obj.position.x)}, ${Math.round(obj.position.y)})</span>
            `;
            info.appendChild(posDiv);

            // Show operations count
            if (obj.operations.length > 0) {
                const opsDiv = document.createElement('div');
                opsDiv.className = 'property';
                opsDiv.innerHTML = `
                    <span>Operations:</span>
                    <span class="property-value">${obj.operations.length}</span>
                `;
                info.appendChild(opsDiv);
            }

            container.appendChild(info);
        });
    }

    // Updates status and statistics
    updateStats() {
        document.getElementById('tickCounter').textContent = this.engine.tickCount;
        document.getElementById('objectCount').textContent = this.engine.objects.length;
        document.getElementById('operationCount').textContent = this.engine.operationCount;
    }

    // Updates engine status indicator
    updateStatus() {
        const indicator = document.getElementById('statusIndicator');
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        
        if (this.engine.running) {
            indicator.className = 'status-indicator running';
            startBtn.classList.remove('active');
            stopBtn.classList.add('active');
        } else {
            indicator.className = 'status-indicator stopped';
            startBtn.classList.remove('active');
            stopBtn.classList.remove('active');
        }
    }

    // Adds an entry to the activity log
    addLogEntry(message, type = 'info') {
        const log = document.getElementById('activityLog');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        
        const timestamp = new Date().toLocaleTimeString();
        entry.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
        
        log.insertBefore(entry, log.firstChild);
        
        // Keep only last 50 entries
        while (log.children.length > 50) {
            log.removeChild(log.lastChild);
        }
    }

    // Resets all objects to initial state
    resetObjects() {
        this.engine.objects = [];
        this.engine.tickCount = 0;
        this.engine.operationCount = 0;
        this.selectedObject = null;
        
        this.createInitialObjects();
        this.addLogEntry('Objects reset to initial state', 'info');
    }

    // Adds a random object to the game world
    addRandomObject() {
        const types = ['player', 'enemy', 'item'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        const obj = new Object();
        obj.tags = [type, 'entity'];
        obj.position = new Vector3(
            Math.random() * 400 + 50,
            Math.random() * 400 + 50,
            0
        );

        switch (type) {
            case 'player':
                obj.health = 80 + Math.random() * 40;
                obj.maxHealth = 100;
                break;
            case 'enemy':
                obj.damage = 5 + Math.random() * 10;
                
                // Add damage operation
                const damageOp = new Operation();
                damageOp.activator.activation = 'inradius';
                damageOp.activator.operation = 'minus_continuous';
                damageOp.activator.maxdistance = 60 + Math.random() * 40;
                damageOp.activator.mindistance = 0;
                damageOp.activator.activatedby.types = ['player'];
                damageOp.activator.activatedby.mode = 'dynamic';
                
                damageOp.valuetarget.key = 'health';
                damageOp.targetself = false;
                damageOp.valuetarget2.key = 'damage';
                damageOp.targetself2 = true;
                
                obj.operations = [damageOp];
                break;
            case 'item':
                obj.healAmount = 10 + Math.random() * 20;
                
                // Add heal operation
                const healOp = new Operation();
                healOp.activator.activation = 'Overlap';
                healOp.activator.operation = 'add_continuous';
                healOp.activator.maxdistance = 50 + Math.random() * 30;
                healOp.activator.mindistance = 0;
                healOp.activator.activatedby.types = ['player'];
                healOp.activator.activatedby.mode = 'dynamic';
                
                healOp.valuetarget.key = 'health';
                healOp.targetself = false;
                healOp.valuetarget2.key = 'healAmount';
                healOp.targetself2 = true;
                
                obj.operations = [healOp];
                break;
        }

        this.engine.addObject(obj);
    }
}
