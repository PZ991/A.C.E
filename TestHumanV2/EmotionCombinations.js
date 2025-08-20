class EmotionCombinations {
    static combinations = {
        'anger+fear': { result: 'anxiety', intensity: 0.8 },
        'joy+surprise': { result: 'excitement', intensity: 1.0 },
        'sadness+anger': { result: 'frustration', intensity: 0.9 },
        'love+fear': { result: 'anxiety', intensity: 0.7 },
        'pride+joy': { result: 'triumph', intensity: 1.1 },
        'anger+disgust': { result: 'contempt', intensity: 0.9 },
        'fear+surprise': { result: 'shock', intensity: 1.0 },
        'sadness+guilt': { result: 'shame', intensity: 0.8 },
        'anger+sadness': { result: 'bitterness', intensity: 0.9 },
        'joy+love': { result: 'bliss', intensity: 1.2 },
        'fear+anger': { result: 'rage', intensity: 1.1 },
        'surprise+joy': { result: 'delight', intensity: 1.0 }
    };

    static getCombination(emotion1, emotion2, intensity1, intensity2) {
        const key1 = `${emotion1}+${emotion2}`;
        const key2 = `${emotion2}+${emotion1}`;
        const combination = this.combinations[key1] || this.combinations[key2];
        
        if (combination) {
            const avgIntensity = (intensity1 + intensity2) / 2;
            return {
                emotion: combination.result,
                intensity: avgIntensity * combination.intensity
            };
        }
        
        return null;
    }

    static processEmotionalBlending(emotions) {
        const results = [];
        const emotionList = Object.entries(emotions).filter(([_, value]) => value > 0.3);
        
        // Check all pairs for combinations
        for (let i = 0; i < emotionList.length; i++) {
            for (let j = i + 1; j < emotionList.length; j++) {
                const [emotion1, intensity1] = emotionList[i];
                const [emotion2, intensity2] = emotionList[j];
                
                const combination = this.getCombination(emotion1, emotion2, intensity1, intensity2);
                if (combination) {
                    results.push(combination);
                }
            }
        }
        
        return results;
    }
}