class Thought {
    constructor(content, trigger = '') {
        this.content = content;
        this.trigger = trigger; // What caused this thought
        this.intensity = 0.5; // How strong/persistent
        this.emotionalCharge = {}; // Which emotions and how much
        this.creationTime = Date.now();
        this.accessCount = 0;
        this.decayRate = 0.05;
        this.associations = []; // Related memories, people, etc.
        this.truthValue = 0.5; // How true the person believes this is
        this.importance = 0.5; // How important this is to the person
        this.recurring = false; // Does this thought come back?
    }

    access() {
        this.accessCount++;
        this.intensity = Math.min(1.0, this.intensity + 0.1);
    }

    decay(deltaTime) {
        this.intensity = Math.max(0, this.intensity - (this.decayRate * deltaTime));
    }

    isActive() {
        return this.intensity > 0.2;
    }
}