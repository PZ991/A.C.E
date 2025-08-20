/**
 * Combined Emotion System for Game Development
 * Integrates Weighted Score + Multi-dimensional + Contextual Triggers approaches
 * Based on comprehensive emotion table with primary emotions and related states
 */

class EmotionSystem {
  constructor() {
      // Emotion table mapping - each emotion has intensity (0-100)
      this.emotions = {
          // Primary emotions from your table
          joy: 0,
          anger: 0,
          disgust: 0,
          fear: 0,
          sadness: 0,
          nostalgia: 0,
          embarrassment: 0,
          anxiety: 0,
          ennui: 0,
          envy: 0
      };
      
      // Related emotions for each primary (from your table columns)
      this.emotionRelations = {
          joy: ['elation', 'indignation', 'mockery', 'relief', 'bittersweet', 'sentimentality', 'amusement', 'excitement', 'contentment', 'admiration'],
          anger: ['passion', 'rage', 'contempt', 'paranoia', 'resentment', 'disillusionment', 'humiliation', 'irritability', 'frustration', 'jealousy'],
          disgust: ['sarcasm', 'outrage', 'revulsion', 'dread', 'despair', 'disenchantment', 'shame', 'repulsion', 'cynicism', 'scorn'],
          fear: ['thrill', 'intimidation', 'aversion', 'terror', 'grief', 'yearning', 'mortification', 'panic', 'helplessness', 'insecurity'],
          sadness: ['gratitude', 'melancholy', 'disappointment', 'worry', 'depression', 'longing', 'regret', 'foreboding', 'resignation', 'inadequacy'],
          nostalgia: ['wonder', 'bitterness', 'disillusion', 'trepidation', 'wistfulness', 'reminiscence', 'self-consciousness', 'apprehension', 'languor', 'pining'],
          embarrassment: ['sheepishness', 'indignity', 'self-disgust', 'vulnerability', 'dejection', 'cringe', 'awkwardness', 'self-doubt', 'discomfort', 'self-pity'],
          anxiety: ['anticipation', 'agitation', 'concern', 'nervousness', 'despondency', 'unease', 'flustered', 'distress', 'restlessness', 'comparison'],
          ennui: ['serenity', 'apathy', 'jadedness', 'numbness', 'emptiness', 'detachment', 'indifference', 'listlessness', 'boredom', 'dissatisfaction'],
          envy: ['inspiration', 'hostility', 'loathing', 'inferiority', 'loneliness', 'covetousness', 'humbled', 'obsession', 'malaise', 'resentfulness']
      };
      
      // Multi-dimensional state
      this.currentState = {
          primary: null,
          secondary: null,
          intensity: 0,
          stability: 1.0,
          valence: 0,     // -1 (negative) to 1 (positive)
          arousal: 0      // -1 (low energy) to 1 (high energy)
      };
      
      // Decay rate per update cycle
      this.decayRate = 0.98;
      this.minThreshold = 5; // Minimum emotion value to be considered active
  }
  
  // Process game events that trigger emotional responses
  processEvent(eventType, intensity = 50, context = {}) {
      const emotionTriggers = {
          // Positive events
          'achievement': { joy: 30, contentment: 20 },
          'victory': { joy: 40, elation: 25, admiration: 15 },
          'discovery': { joy: 20, wonder: 30, excitement: 25 },
          'friendship': { joy: 25, gratitude: 20, contentment: 15 },
          
          // Negative events
          'betrayal': { anger: 35, resentment: 30, disappointment: 25 },
          'failure': { sadness: 30, frustration: 25, inadequacy: 20 },
          'death': { sadness: 40, grief: 35, longing: 20 },
          'humiliation': { embarrassment: 40, shame: 35, 'self-doubt': 25 },
          
          // Fear events
          'danger': { fear: 35, panic: 30, helplessness: 20 },
          'uncertainty': { anxiety: 30, nervousness: 25, unease: 20 },
          
          // Disgust events
          'corruption': { disgust: 35, revulsion: 30, cynicism: 20 },
          'injustice': { anger: 30, outrage: 35, contempt: 25 },
          
          // Complex events
          'nostalgia_trigger': { nostalgia: 35, reminiscence: 30, bittersweet: 25 },
          'boredom': { ennui: 30, listlessness: 25, apathy: 20 },
          'comparison': { envy: 25, inadequacy: 20, resentfulness: 15 }
      };
      
      const triggers = emotionTriggers[eventType];
      if (!triggers) return;
      
      // Apply intensity modifier
      const modifier = intensity / 50; // Normalize to 1.0 at base intensity
      
      // Update emotion scores
      Object.entries(triggers).forEach(([emotion, value]) => {
          if (this.emotions.hasOwnProperty(emotion)) {
              this.emotions[emotion] = Math.min(100, this.emotions[emotion] + (value * modifier));
          }
      });
      
      // Update multi-dimensional state
      this.updateEmotionalState();
  }
  
  // Calculate weighted scores and determine primary/secondary emotions
  updateEmotionalState() {
      // Sort emotions by intensity
      const sortedEmotions = Object.entries(this.emotions)
          .filter(([_, value]) => value >= this.minThreshold)
          .sort(([, a], [, b]) => b - a);
      
      if (sortedEmotions.length === 0) {
          this.currentState = {
              primary: null,
              secondary: null,
              intensity: 0,
              stability: 1.0,
              valence: 0,
              arousal: 0
          };
          return;
      }
      
      // Set primary and secondary emotions
      this.currentState.primary = sortedEmotions[0][0];
      this.currentState.secondary = sortedEmotions[1] ? sortedEmotions[1][0] : null;
      
      // Calculate overall intensity (0-1)
      const maxEmotion = sortedEmotions[0][1];
      this.currentState.intensity = Math.min(1.0, maxEmotion / 100);
      
      // Calculate stability (how likely emotions are to change)
      // Lower stability when emotions are close in value
      const emotionSpread = sortedEmotions.length > 1 ? 
          (sortedEmotions[0][1] - sortedEmotions[1][1]) / 100 : 1.0;
      this.currentState.stability = Math.max(0.1, emotionSpread);
      
      // Calculate valence and arousal
      this.calculateValenceArousal();
  }
  
  // Map emotions to valence/arousal space
  calculateValenceArousal() {
      const emotionMapping = {
          joy: { valence: 0.8, arousal: 0.6 },
          anger: { valence: -0.6, arousal: 0.8 },
          disgust: { valence: -0.7, arousal: 0.4 },
          fear: { valence: -0.8, arousal: 0.7 },
          sadness: { valence: -0.6, arousal: -0.4 },
          nostalgia: { valence: 0.2, arousal: -0.2 },
          embarrassment: { valence: -0.4, arousal: 0.3 },
          anxiety: { valence: -0.5, arousal: 0.6 },
          ennui: { valence: -0.2, arousal: -0.8 },
          envy: { valence: -0.4, arousal: 0.5 }
      };
      
      let totalValence = 0;
      let totalArousal = 0;
      let totalWeight = 0;
      
      // Weight by emotion intensity
      Object.entries(this.emotions).forEach(([emotion, intensity]) => {
          if (intensity >= this.minThreshold && emotionMapping[emotion]) {
              const weight = intensity / 100;
              totalValence += emotionMapping[emotion].valence * weight;
              totalArousal += emotionMapping[emotion].arousal * weight;
              totalWeight += weight;
          }
      });
      
      if (totalWeight > 0) {
          this.currentState.valence = totalValence / totalWeight;
          this.currentState.arousal = totalArousal / totalWeight;
      }
  }
  
  // Decay emotions over time
  update() {
      Object.keys(this.emotions).forEach(emotion => {
          this.emotions[emotion] = Math.max(0, this.emotions[emotion] * this.decayRate);
      });
      
      this.updateEmotionalState();
  }
  
  // Get the current emotional state description
  getEmotionalDescription() {
      if (!this.currentState.primary) return "Neutral";
      
      const intensity = this.currentState.intensity;
      const intensityDesc = intensity > 0.8 ? "intense" : 
                           intensity > 0.5 ? "moderate" : "mild";
      
      let description = `${intensityDesc} ${this.currentState.primary}`;
      
      if (this.currentState.secondary) {
          description += ` with ${this.currentState.secondary}`;
      }
      
      return description;
  }
  
  // Get specific emotion intensity
  getEmotion(emotion) {
      return this.emotions[emotion] || 0;
  }
  
  // Get all active emotions
  getActiveEmotions() {
      return Object.entries(this.emotions)
          .filter(([_, value]) => value >= this.minThreshold)
          .sort(([, a], [, b]) => b - a);
  }
  
  // Get current state for UI/debugging
  getCurrentState() {
      return {
          ...this.currentState,
          description: this.getEmotionalDescription(),
          activeEmotions: this.getActiveEmotions()
      };
  }
}

// Usage Example:
const emotionSystem = new EmotionSystem();

// Process some game events
emotionSystem.processEvent('achievement', 60);
emotionSystem.processEvent('betrayal', 40);
console.log("After events:", emotionSystem.getCurrentState());

// Simulate time passing
for (let i = 0; i < 10; i++) {
  emotionSystem.update();
}
console.log("After decay:", emotionSystem.getCurrentState());

// Add another event
emotionSystem.processEvent('discovery', 70);
console.log("After discovery:", emotionSystem.getCurrentState());

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EmotionSystem;
}