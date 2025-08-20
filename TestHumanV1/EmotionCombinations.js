
class EmotionCombinations {
    static combinations = {
        'anger+fear': 'anxiety',
        'joy+surprise': 'excitement',
        'sadness+anger': 'frustration',
        'love+fear': 'anxiety',
        'pride+joy': 'triumph',
        'anger+disgust': 'contempt',
        'fear+surprise': 'shock'
    };

    static getCombination(emotion1, emotion2) {
        const key1 = `${emotion1}+${emotion2}`;
        const key2 = `${emotion2}+${emotion1}`;
        return this.combinations[key1] || this.combinations[key2] || null;
    }
}

// Export for use
