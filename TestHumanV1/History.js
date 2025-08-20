class History {
    constructor(data = {}) {
        this.time = data.time || Date.now();
        this.subject = data.subject || '';
        this.action = data.action || '';
        this.actionTarget = data.actionTarget || '';
        this.witnesses = data.witnesses || [];
        this.location = data.location || '';
        this.memorability = data.memorability || data.emotionalWeight || 0.5;
        this.decayRate = data.decayRate || 0.01;
        this.decayMin = data.decayMin || 0.1;
        this.decayMax = data.decayMax || 1.0;
        this.emotionalWeight = data.emotionalWeight || 0.5;
        this.socialWeight = data.socialWeight || 0.5;
        this.outcomes = []; // What happened as a result
    }

    decay(deltaTime) {
        this.memorability = Math.max(this.decayMin, 
            this.memorability - (this.decayRate * deltaTime));
    }
}