// influence_propagation.js - How one entity's values affect others through relationships

let influencerMemory = new Memory();
influencerMemory.key = 'leader_speaks';
influencerMemory.tags.types = ['influential_person', 'speech'];
influencerMemory.variables_affected = [
    new Value('group_morale', 50),
    new Value('shared_belief', 30)
];

let followerMemory = new Memory();
followerMemory.key = 'influenced_by_leader';
followerMemory.tags.types = ['follower', 'influenced'];
followerMemory.variables_needed = [
    new Value('trust_leader', 40)
];
followerMemory.variables_affected = [
    new Value('personal_conviction', 25),
    new Value('group_loyalty', 60)
];

let skepticMemory = new Memory();
skepticMemory.key = 'resists_influence';
skepticMemory.tags.types = ['skeptical', 'independent'];
skepticMemory.exclude_tags.types = ['easily_influenced'];
skepticMemory.variables_affected = [
    new Value('independent_thinking', 40),
    new Value('social_tension', 20)
];