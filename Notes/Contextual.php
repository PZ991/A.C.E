Variable-Related:
    size, weight, volume, temperature , intensity, brightness, texture, speed, distance, density, height, width, depth,
    shape, position, frequency, uality, price, value, level, type, range, rate, color, category

        Emotion or Sentiment-Related (in variable since emotions can be computed):
            happy, sad, angry, fear, excited, neutral, negative, positive
        Quantifier-Related (in variable since it is just a query of variables):
            some, all, none, many, several, few, any, every, more, less        
        Measurement/Unit-Related (in variable since this just rounds a variable from it depending from its base count):
            meters, kilograms, watts, degrees, percent, hours, dollars
        State-Related (just a status of a property or state of an action):
            on, off, open, closed, active, idle, locked, charged, running

Contextual-Related:
    maybe, possibly, probably, yes, no, if, then, while, unless ,despite, however because, although, situation, assumption, condition, fact, belief, intention, expectation, context, implication

        Spatial-Related(context comes from something):
            above, below, near, left, behind, in front of, inside, outside, between, north, south, here, there
        Modality/Epistemic Terms(context from a variable of action or thought):
            must, can, should, may, might, know, believe
        Causal-Related(context from what, why and result):
            because, causes, results in
        Comparative/Relative Terms(context from subject and target outcome or count):
            bigger, smaller, faster, same, different, equal, opposite
                Logic-Related (still under comparative )
                    if, then, else, and, or, not, implies, equivalent, therefore
                Probability/Evidence Terms (under comparative since it compares the current state to a future possibility)
                    likely, unlikely, possibly, evidence, proof
        Query(context from variables):
            what, why, how, where, who, when


Action-Related:
    run, walk, punch, move, jump, grab, release, lift, drop, write, rotate,
    turn, open, close, activate, deactivate, search, select, generate

    Property Action(Actions that use variables or states of the doer, like action/state(listen=use ears for input,analyze(use brain for thinking))):
        speak, listen, read
            Thought Related Actions:
                process, decide, compute, analyze, identify
                    Intent or Goal-Related(actions that are still in thought):
                    want, need, goal, try, intend, purpose, plan, aim
            Interaction/Communication-Related(mode of communication as an action):
                say, ask, reply, respond, tell, shout, whisper, question
            Self-Action related(actions that reflects from future or past action):
                continue, stop
    
    

Time-Related:
    Basic Time Variable:
        year, month, week, day, hour, minute, second
            Days:
                monday, tuesday, wednesday, thursday, friday, saturday, sunday
    Specific Time Variable:
        yesterday, today, tomorrow, morning, afternoon, evening, night, weekends, weekdays
    Contextual Time Variables:
        later, soon, always, often, sometimes, now, never
            Specific target context time variables:
                date, time, duration, deadline
            General target context time variables:
                era, century, seasons, quarterly, annually
                    Seasons
                        spring, summer, autumn, winter
    Event-Related:
        accident, birthday, storm, meeting, launch, death, festival
    Temporal Modifiers:
        now, later, before, after, soon, recently


Variable:

$knowledge[] = array(
    'word' => 'large',
    'metadata' => array(
        'entity' => 'general',
        'operation' => 'greater_than',
        'categories' => array('size', 'scale'),
        'similar_words' => array('big', 'huge', 'massive'),
        'value_range' => array(70, 100)
    )
);

$knowledge[] = array(
    'word' => 'weight',
    'metadata' => array(
        'entity' => 'physical',
        'type' => 'mass',
        'unit' => 'kg',
        'categories' => array('measure', 'scale')
    )
);

$knowledge[] = array(
    'word' => 'volume',
    'metadata' => array(
        'entity' => 'physical',
        'type' => 'space',
        'unit' => 'liters',
        'categories' => array('measure', 'scale')
    )
);

$knowledge[] = array(
    'word' => 'color',
    'metadata' => array(
        'entity' => 'visual',
        'type' => 'attribute',
        'values' => array('red', 'blue', 'green', 'yellow'),
        'categories' => array('appearance')
    )
);

$knowledge[] = array(
    'word' => 'intensity',
    'metadata' => array(
        'entity' => 'general',
        'type' => 'magnitude',
        'categories' => array('brightness', 'force')
    )
);


Context:
$knowledge[] = array(
    'word' => 'there',
    'metadata' => array(
        'entity' => 'spatial',
        'type' => 'location_reference',
        'context' => 'position'
    )
);

$knowledge[] = array(
    'word' => 'maybe',
    'metadata' => array(
        'entity' => 'logical',
        'type' => 'probability',
        'confidence' => '0.4-0.7',
        'categories' => array('uncertainty', 'contextual_logic')
    )
);

$knowledge[] = array(
    'word' => 'yes',
    'metadata' => array(
        'entity' => 'logical',
        'type' => 'confirmation',
        'value' => true,
        'categories' => array('binary', 'affirmative')
    )
);

$knowledge[] = array(
    'word' => 'no',
    'metadata' => array(
        'entity' => 'logical',
        'type' => 'negation',
        'value' => false,
        'categories' => array('binary', 'negative')
    )
);

Action:
$knowledge[] = array(
    'word' => 'run',
    'metadata' => array(
        'entity' => 'humans',
        'type' => 'action',
        'category' => 'movement',
        'similar_words' => array('jog', 'sprint', 'dash'),
        'speed' => 'fast'
    )
);

$knowledge[] = array(
    'word' => 'walk',
    'metadata' => array(
        'entity' => 'humans',
        'type' => 'action',
        'category' => 'movement',
        'similar_words' => array('stroll', 'step'),
        'speed' => 'slow'
    )
);

$knowledge[] = array(
    'word' => 'punch',
    'metadata' => array(
        'entity' => 'humans',
        'type' => 'action',
        'category' => 'combat',
        'similar_words' => array('strike', 'hit'),
        'effect' => 'impact'
    )
);

Time:
$knowledge[] = array(
    'word' => 'year',
    'metadata' => array(
        'entity' => 'time',
        'type' => 'duration',
        'value' => 525600,
        'unit' => 'minutes'
    )
);

$knowledge[] = array(
    'word' => 'january',
    'metadata' => array(
        'entity' => 'time',
        'type' => 'month',
        'value' => 44640,
        'unit' => 'minutes',
        'position_in_year' => 1
    )
);

$knowledge[] = array(
    'word' => 'month',
    'metadata' => array(
        'entity' => 'time',
        'type' => 'cycle',
        'subunits' => 'days',
        'average_days' => 30.44
    )
);

$knowledge[] = array(
    'word' => 'week',
    'metadata' => array(
        'entity' => 'time',
        'type' => 'cycle',
        'value' => 10080,
        'unit' => 'minutes',
        'days' => 7
    )
);

$knowledge[] = array(
    'word' => 'day',
    'metadata' => array(
        'entity' => 'time',
        'type' => 'unit',
        'value' => 1440,
        'unit' => 'minutes',
        'subunits' => array('hours' => 24, 'minutes' => 60)
    )
);

$knowledge[] = array(
    'word' => 'weekends',
    'metadata' => array(
        'entity' => 'time',
        'type' => 'subset',
        'includes' => array('saturday', 'sunday')
    )
);

$knowledge[] = array(
    'word' => 'saturday',
    'metadata' => array(
        'entity' => 'time',
        'type' => 'day_of_week',
        'position' => 6,
        'range_minutes' => array('gte' => 7200, 'lt' => 8640)
    )
);


