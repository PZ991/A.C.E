// Quick test for specific functions
class QuickTest {
    constructor() {
        this.vowels = ['a', 'e', 'i', 'o', 'u'];
        this.consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    }

    beforelastletter(word, type) {
        if (word.length < 2) return false;
        const beforeLastChar = word[word.length - 2].toLowerCase();
        
        if (type === 'consonant') {
            return this.consonants.includes(beforeLastChar);
        } else if (type === 'vowel') {
            return this.vowels.includes(beforeLastChar);
        }
        return false;
    }

    addend(word, suffix) {
        return word + suffix;
    }

    replaceend(word, from, to) {
        if (word.endsWith(from)) {
            return word.slice(0, -from.length) + to;
        }
        return word;
    }

    doublelast(word) {
        if (word.length === 0) return word;
        return word + word.slice(-1);
    }

    applyOperation(word, operation) {
        if (!operation || operation === '') return word;
        
        let result = word;
        
        // Split by comma first, then process each operation
        const operations = operation.split(',').map(op => op.trim());
        
        for (let op of operations) {
            const funcMatch = op.match(/(\w+)\(([^)]*)\)/);
            if (funcMatch) {
                const [, funcName, params] = funcMatch;
                const paramList = params ? params.split(',').map(p => p.trim()) : [];
                
                switch (funcName) {
                    case 'addend':
                        result = this.addend(result, paramList[0] || '');
                        break;
                    case 'replaceend':
                        if (paramList.length >= 2) {
                            result = this.replaceend(result, paramList[0], paramList[1]);
                        }
                        break;
                    case 'doublelast':
                        result = this.doublelast(result);
                        break;
                }
            }
        }
        
        return result;
    }
}

const test = new QuickTest();

// Test specific issues
console.log("=== QUICK TESTS ===");
console.log("beforelastletter('boy', 'vowel'):", test.beforelastletter('boy', 'vowel'));
console.log("addend('cat', 's'):", test.addend('cat', 's'));
console.log("replaceend('city', 'y', 'ies'):", test.replaceend('city', 'y', 'ies'));
console.log("doublelast('run'):", test.doublelast('run'));
console.log("applyOperation('run', 'doublelast(),addend(ing)'):", test.applyOperation('run', 'doublelast(),addend(ing)'));

// Check the word "boy"
console.log("\n=== ANALYZING 'boy' ===");
console.log("Length:", 'boy'.length);
console.log("Last char:", 'boy'[2]);
console.log("Before last char:", 'boy'[1]);
console.log("Is 'o' a vowel?", test.vowels.includes('o')); 