<?php

class Knowledge
{
    public KnowableObject $objectsknown;
}

class UniversalIdentity
{
    public $timeidentity = array('human', 'time');
    public $contexts = array('human', new Context());

    public History $universalrecordhistory = null;

}

class KnowableObject
{
    public Pronouns $pronoun = null;


    public Attribute $attribute = null;

    public Countability $countableinfo = null;

    public History $objecthistory = null;

}


class History
{
    public $time = 0;
    public $log = array(
        //identity,action,actiontarget,witnesses
        array('(human,tag)', 'actionname', 'actiontarget', 'witness')
    );


}

//used as adjectives
class Attribute
{
    public $variables = array(
        //by tag, pronoun/noun
        //entity tags -attribute,value, value type
        array(
            'humans',
            array('smelliness', '5', 'int'),
            array('roughness', '2.0', 'float'),
            array('name', '2.0', 'string'),
            array('pronoun', 'pronounvalue', 'Pronouns'),
            array('color', 'blue', 'color')
        )

    );
    public History $history = null;
}

class Preposition
{
}

class Pronouns
{
    public $personal = "";
    public $reflexive = "";
    public $possessive = "";
    public $relative = "";
    public $interrogative = "";
    public $indefinite = "";

    public $article = "";

    public $identity = array(
        //by tag, pronoun/noun
        array('humans', 'object')

    );
}

class Countability
{
    //current count of the object
    public $count = 0;
    //when can this be considered plural
    public $single_plural_consider = 1;

}



class LiteratureSystem
{
    //array of characters
    //context
    public $words = array(
        array('large')
    );
    public $characters = array(
        array('consonant', 'n'),
        array('vowel', 'a')
    );
    //number and word for that number
    public $numbers = array(
        array('1', $words[0])
    );

    // tag to accomodate,
    //  tags to check on context,
    // where operation tag check,
    // tags for replacing on word,
    //  operation, 
    //letters to operate on
    // letters to add/replace

    public $characterrules = array(
        //COUNTABLES

        // tags to check on the word, 
        // type of change, 
        // queryfunction, 
        // operation, 
        // letters to operate on, 
        // specific words
        // exemption words

        //Count nouns are usually made plural by adding –s or –es.
        array('plural,countable', 'count_nouns', '', 'addend(s,es)', '', ''),

        // If the noun ends in –y, change the –y to –ies to make it plural if the –y is preceded by a consonant.
        array('plural,countable', 'count_nouns', 'beforelastletter(consonant)', 'replastletter(y,eis)', '', ''),

        // if plural, check count nouns or others, if before letter is vowel, and last letter is y then add s
        // However, if a vowel proceeds the –y, add an –s to make it plural.
        array('plural,countable', 'count_nouns', 'beforelastletter(vowel),lastletter(y)', 'addend(s)', '', ''),
        // Generally, if the noun ends in –o, add –es to make it plural.

        array('plural,countable', 'count_nouns', 'lastletter(o)', 'addend(es)', '', ''),
        // if plural, check count nouns or others, if ast letter is f or fe then replace f with v and add es
        // If the noun ends in –f or –fe, change the –f to a –v and add –es.

        array('plural,countable', 'count_nouns', 'lastletter(f,fe)', 'replastetter(f,v),replastletter(fe,v),addend(es)','',''),


        // adding an ‘ed’ to the end of the base form of the regular verb and doubling the last consonant
        array('action,simple_past,regular', 'verb', 'lastletter(consonant)', 'duplicatelastletter(),addend(ed)', '', ''),


        // adding a ‘d’ to the end of the base form of the regular verb ending with an ‘e’
        array('action,simple_past,regular', 'verb',  'lastletter(e)', 'addend(d)', '', ''),

        // removing ‘y’ and adding an ‘ied’ to the end of the base form of the regular verb ending with a consonant and a ‘y’
        array('action,simple_past,regular', 'verb',  'lastletter(consonant),lastletter(y)', 'rep', 'addend(ied)', '',''),

        // adding ‘ed’ to monosyllabic words ending with a vowel followed by a ‘y’
        array('action,simple_past,regular', 'verb',  'lastletter(vowel),lastletter(y)', 'rep', 'addend(ed)', '',''),
        array('action,simple_past,regular', 'verb',  'lastletter(vowel),lastletter(y)', 'rep', 'addend(id)', '',''),


        // Irregular Verbs Ending in 'Ise' → 'Ose' → 'Isen'
        array('action,simple_past,irregular', 'verb', 'lastletter(ise)', 'rep', 'addend(ose)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(ise)', 'rep', 'addend(isen)', '',''),

        // Irregular Verbs Ending in 'Ow/Aw' → 'Ew' → 'Own/Awn'
        array('action,simple_past,irregular', 'verb', 'lastletter(ow)', 'rep', 'addend(ew)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(ow)', 'rep', 'addend(own)', '',''),

        array('action,simple_past,irregular', 'verb', 'lastletter(aw)', 'rep', 'addend(ew)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(aw)', 'rep', 'addend(awn)', '',''),

        // Irregular Verbs Ending in 'Ive' → 'Ove/Ave' → 'Iven'
        array('action,simple_past,irregular', 'verb', 'lastletter(ive)', 'rep', 'addend(ove)', '',''),
        array('action,simple_past,irregular', 'verb', 'lastletter(ive)', 'rep', 'addend(ave)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(ive)', 'rep', 'addend(iven)', '',''),

        // Irregular Verbs Ending in 'Et' → 'Ot' → 'Otten'
        array('action,simple_past,irregular', 'verb', 'lastletter(et)', 'rep', 'addend(ot)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(et)', 'rep', 'addend(otten)', '',''),

        // Irregular Verbs Ending in 'Ide/Ite' → 'Ode/Ote/Id/It' → 'Idden/Itten'
        array('action,simple_past,irregular', 'verb', 'lastletter(ide)', 'rep', 'addend(ode)', '',''),
        array('action,simple_past,irregular', 'verb', 'lastletter(ide)', 'rep', 'addend(id)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(ide)', 'rep', 'addend(idden)', '',''),

        array('action,simple_past,irregular', 'verb', 'lastletter(ite)', 'rep', 'addend(ote)', '',''),
        array('action,simple_past,irregular', 'verb', 'lastletter(ite)', 'rep', 'addend(it)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(ite)', 'rep', 'addend(itten)', '',''),

        // Irregular Verbs Ending in 'Ink/Ing/In' → 'Ank/Ang/An' → 'Unk/Ung/Un'
        array('action,simple_past,irregular', 'verb', 'lastletter(ink)', 'rep', 'addend(ank)', '',''),
        array('action,simple_past,irregular', 'verb', 'lastletter(ing)', 'rep', 'addend(ang)', '',''),
        array('action,simple_past,irregular', 'verb', 'lastletter(in)', 'rep', 'addend(an)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(ink)', 'rep', 'addend(unk)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(ing)', 'rep', 'addend(ung)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(in)', 'rep', 'addend(un)', '',''),

        // Irregular Verbs Ending in 'Ake' → 'Ook' → 'Aken'
        array('action,simple_past,irregular', 'verb', 'lastletter(ake)', 'rep', 'addend(ook)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(ake)', 'rep', 'addend(aken)', '',''),

        // Irregular Verbs Ending in 'Eak/Ake/Eal' → 'Oke/Ole' → 'Oken/Olen'
        array('action,simple_past,irregular', 'verb', 'lastletter(eak)', 'rep', 'addend(oke)', '',''),
        array('action,simple_past,irregular', 'verb', 'lastletter(eal)', 'rep', 'addend(ole)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(eak)', 'rep', 'addend(oken)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(eal)', 'rep', 'addend(olen)', '',''),

        // Irregular Verbs Ending in 'Ear' → 'Ore' → 'Orn/Orne'
        array('action,simple_past,irregular', 'verb', 'lastletter(ear)', 'rep', 'addend(ore)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(ear)', 'rep', 'addend(orn)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(ear)', 'rep', 'addend(orne)', '',''),

        // Irregular Verbs Ending in 'Oose' → 'Ose' → 'Osen'
        array('action,simple_past,irregular', 'verb', 'lastletter(oose)', 'rep', 'addend(ose)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(oose)', 'rep', 'addend(osen)', '',''),

        // Irregular Verbs With 'Ought/Aught' in the Simple Past and Past Participle Form
        array('action,simple_past,irregular', 'verb', 'lastletter(y)', 'rep', 'addend(ought)', '',''),
        array('action,simple_past,irregular', 'verb', 'lastletter(tch)', 'rep', 'addend(aught)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(y)', 'rep', 'addend(ought)', '',''),
        array('action,past_participle,irregular', 'verb', 'lastletter(tch)', 'rep', 'addend(aught)', '',''),

        //VERBS 
        //if verb and has tag manner, after the last letter of the word add ly = (obedient=obediently)
        array('action,manner','verb', 'afterlastletter()', 'vowel/consonant', 'addend(ly)', '', '')

        //create function that processes the tags and returns the word
        //prioritize the tags that are exactly the same, else check for the tags that are similar closest,
        // prioritze the number of correct tags first then move to missing or incorrect tag counts like if one condition turns like: (correct tags =2, incorrect tag =1)
        // case 1: (correct tags =2, incorrect tag =3),(correct tags =1, incorrect tag =3)= choose first
        // case 2: (correct tags =2, incorrect tag =2),(correct tags =3, incorrect tag =4)= choose second
        // case 3: (correct tags =1, incorrect tag =0),(correct tags =0, incorrect tag =2)= choose first
        // case 4: (correct tags =2, incorrect tag =0),(correct tags =1, incorrect tag =1)= choose first

    );

    public $timerules = array(
        //greater than = time passed
        //less than =time have not passed
        //call name, condition(not too far and not passed too much on 100min(or any time value),tag to add to word)
        array('simple present', 'not greater than(from), not less than', '100', 'simple_present'),
        array('simple past', 'not greater than(from)', '100', 'simple_present'),
        //unknown time but probably somewhere
        array('present perfect', 'unknown less than', '100', 'simple_present'),
        array('past participle', 'greater than', '100', 'past_participle'),

        array('future', 'not less than', '100', 'simple_present'),
    );
}

class Context
{

    public $valuedwords = array(

        //words,identity,similar words
        array(
            'large', //word
            array(
                'humans', //tag from which entity
                'greater than', //operation
                'scale,count,uncountable', //associatied values
                'big,huge,many', //associated words
                '70-100', //ratio comparison compared to the context (context = subject)
            )
        ),

        //words, indentity, code similarity context, 1-100 scaling(weight)
        array(
            'few',
            array(
                'humans',
                'less than',  
                'scale,count', //associatied values
                'small,tiny,countable', //associated words
                '20-100'
            )
        ),

        //words, indentity, code similarity context(tag to search if computing),
        array(
            'amount',
            array(
                'humans',
                'number'
            )
        ),

        //words, indentity, code similarity context, code name
        array(
            'color',
            array(
                'humans',
                '',
                'color',
                'red,blue,green',
                ''
            )
        ),

        //words, indentity, action(verb)
        array(
            'run',
            array(
                'humans',
                'action',
                'position',
                'move, fast, reposition',
                ''
            )
        ),

        //words, indentity, type, target
        array(
            'there',
            array(
                'humans',
                'range',
                'position',
                'location',
                'context'
            )
        ),



        //context year, each year have this many minutes
        //words, identity, value, value type
        array(
            'year',
            array(
                'humans',
                'valouerounded',
                'time',
                '525,600',
                'number'
            )
        ),
        //Month	        Days
        // January	    31
        // February	    28 (29 in leap years)
        // March	    31
        // April	    30
        // May	        31
        // June	        30
        // July	        31
        // August	    31
        // September	30
        // October	    31
        // November	    30
        // December	    31
        //words, identity,
        //words, identity, value, value type,repetition count, repetition constraint
        array(
            'january',
            array(
                'humans',
                'time',
                '44,640',
                'number',
                'once',
                'year'
            )
        ),

        //words, identity, value, value type,repetition count, repetition constraint,operation,value
        array(
            'february',
            array(
                'humans',
                'time',
                '40,320',
                'number',
                'once',
                'year',
                'aftervalue',
                '44,640'
            )
        ),
        //words, identity, value, value type,repetition count, repetition constraint,operation,value(added both jan and feb)
        array(
            'february',
            array(
                'humans',
                'time',
                '40,320',
                'number',
                'once',
                'year',
                'aftervalue',
                '84,960'
            )
        ),

        //         Days in Month	Minutes
//          28 days	        40,320 minutes
//          29 days	        41,760 minutes
//          30 days	        43,200 minutes
//          31 days	        44,640 minutes
        //words, identity, constraint tags
        array(
            'month',
            array(
                'humans',
                'time',
                'january,february,march...december'
            )
        ),

        //  1 day           1,440 minutes
        //  7 days      10,080 minutes


        //words, identity, constraint tags, repetition count, repetition constraint,'value repetition
        array(
            'week',
            array(
                'humans',
                'time',
                'month',
                '4',
                'month',
                '10,080'
            )
        ),

        //words, identity, constraint tags, repetition count, repetition constraint,'value repetition
        array(
            'day',
            array(
                'humans',
                'time',
                'week',
                '7',
                'week',
                '1,440'
            )
        ),


        //words, identity, constraint tags, repetition count
        array(
            'weekends',
            array(
                'humans',
                'time',
                'saturday,sunday',
                'unknown'
            )
        ),

        //         Day	        Minutes from Monday 0:00
//         Monday	    0
//         Tuesday	    1,440
//         Wednesday	2,880
//         Thursday	    4,320
//         Friday	    5,760
//         Saturday	    7,200
//         Sunday	    8,640
        //words, identity, constraint tags, operation
        array(
            'saturday',
            array(
                'humans',
                'time',
                'day',
                'greaterthanequal(7,200),lessthan(8,640)'
            )
        ),






    );


}

class Action
{

}
?>