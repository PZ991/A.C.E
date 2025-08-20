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
        this.outcomes = data.outcomes || [];
        this.success = data.success !== undefined ? data.success : true;
        this.context = data.context || {};
        
        // Enhanced properties
        this.significance = this.calculateSignificance();
        this.emotionalIntensity = 0;
        this.socialImpact = 0;
        this.personalRelevance = 0;
    }

    calculateSignificance() {
        // Combine multiple factors to determine overall significance
        return (this.emotionalWeight * 0.4 + 
                this.socialWeight * 0.3 + 
                this.memorability * 0.3);
    }

    decay(deltaTime) {
        // Significant events decay slower
        const significanceModifier = 1 - (this.significance * 0.5);
        this.memorability = Math.max(this.decayMin, 
            this.memorability - (this.decayRate * deltaTime * significanceModifier));
    }

    getEmotionalImpact() {
        // Calculate ongoing emotional impact of this historical event
        const timeFactor = Math.max(0.1, 1 - ((Date.now() - this.time) / (365 * 24 * 3600 * 1000))); // Decay over year
        return this.emotionalIntensity * this.significance * timeFactor;
    }
}
