class AnimationSelf {
    constructor() {
        /**
         * Identifier or label for this animation entry
         * Example: "RunCycleSpeedCurve"
         */
        this.key = ""; // String

        /**
         * Path to the target node relative to the AnimationPlayer
         * Example: "Character/Skeleton/RightArm"
         */
        this.relative_path = ""; // String

        /**
         * Type of property being animated (used to determine how to apply 'value')
         * Example: "position:x", "rotation_degrees:z", "visible", "blend_shape:Smile"
         */
        this.type = ""; // String

        /**
         * Base value (as string, to be parsed depending on 'type')
         * Example: "1.0" for position, "true" for visibility
         */
        this.value = ""; // String

        /**
         * Controls how the value changes over time
         * Example: A custom curve that eases in or out (similar to Unity’s AnimationCurve)
         */
        this.curve = null; // Expected to be an instance of a Curve class or data object

        /**
         * Target animation clip to modify or extend
         * Example: An Animation resource loaded from `.tres` or `.anim`
         */
        this.clip = null; // Expected to be an Animation instance or reference

        /**
         * Whether this animation clip should loop
         * Example: true for idle loops, false for one-shot actions like attacks
         */
        this.loop = false; // Boolean
    }
}

class AnimationUser {
    constructor() {
        this.holder_parent = ""; 
        this.bone_parent = ""; 
        this.root_bone = ""; 

        this.layer = []; 
        this.holding_point = []; 
        this.rotation_orientation = []; 

        this.entity_animation_usage = null; // Resource (e.g., DefaultAnim_Scriptable)
        this.entity_animation_types_usage = ""; // String
    }
}


class AnimationUser {
    constructor() {
        /**
         * Path or identifier for the parent node that holds the animated entity
         * Example: "Character/HoldableItems" or "MountSocket"
         */
        this.holder_parent = ""; // String

        /**
         * Name or path to the parent bone or skeleton where animation begins
         * Example: "Spine", "Armature/Skeleton/Chest"
         */
        this.bone_parent = ""; // String

        /**
         * Main root bone used for reference or IK hierarchy
         * Example: "Hips" or "Armature/Skeleton/Root"
         */
        this.root_bone = ""; // String

        /**
         * Layer indexes for blending or ordering animation (e.g. additive layers)
         * Example: [0, 1] where 0 = base motion, 1 = override/upper-body
         */
        this.layer = []; // Array of integers

        /**
         * List of positions used for attaching or aligning objects (e.g., items or weapons)
         * Example: [ {x:0,y:1,z:0}, {x:0.5,y:0,z:-0.2} ]
         */
        this.holding_point = []; // Array of Vector3-like objects

        /**
         * List of rotations corresponding to holding points or bones
         * Example: [ {x:0,y:0,z:0,w:1}, {x:0.0, y:0.7071, z:0.0, w:0.7071} ]
         */
        this.rotation_orientation = []; // Array of Quaternion-like objects

        /**
         * A reference to a resource that defines the animation set used by the entity
         * Example: A custom AnimationSet instance that contains AnimationSelf entries
         */
        this.entity_animation_usage = null; // Can be another class instance like AnimationSet

        /**
         * A label or identifier for what type of animation set this is
         * Example: "Humanoid", "Beast", "Mechanical"
         */
        this.entity_animation_types_usage = ""; // String
    }
}


//might need conscience


//might need this
// class ProjectileValue {
//     constructor() {
//         // General
//         this.activator = ""; // String
//         this.targeting_deactivator = ""; // String

//         // Targeting
//         this.targeting_when_near = false; // Boolean
//         this.stop_targeting_when_out_of_dist = false;
//         this.targeting_dist = 0.0; // Float
//         this.smart_targeting = false;
//         this.targeting_rotation_speed = 0.0;
//         this.start_targeting_time = 0.0;
//         this.start_rotation_time = 0.0;

//         // Acceleration
//         this.accelerate_when_near = false;
//         this.stop_acceleration_distance = false;
//         this.stop_speed_out_of_dist = false;
//         this.accelerate_dist = 0.0;
//         this.destroy_on_max_acceleration = false;
//         this.acceleration_time = 0.0;
//         this.acceleration_speed = 0.0;
//         this.acceleration_min_max = { x: 0.0, y: 0.0 }; // Vector2

//         // Transform life
//         this.destroy_if_out_of_dist = false;
//         this.lifetime_dist = 0.0;
//         this.decay = false;
//         this.projectile_lifetime = 0.0;
//         this.end_targeting_time = 0.0;
//         this.end_rotation_time = 0.0;
//         this.end_accelaration = 0.0;
//         this.destroy_time = 0.0;
//         this.repeat_num_spawn = 0;
//         this.time_between_spawn = 0.0;

//         // Targeting max angling
//         this.destroy_if_out_of_angle = false;
//         this.angle = 0.0;
//         this.angle_xy = 0.0;
//         this.angle_zy = 0.0;

//         // AOE
//         this.explode = false;
//         this.explode_distance = 0.0;
//         this.delay_on_distance_or_contact = 0.0;
//         this.min_pressure = 0.0;
//         this.arming_distance = false;
//         this.arming_dist = 0.0;
//         this.time_start_rearm = 0.0;
//         this.unarming_distance = false;
//         this.unarming_dist = 0.0;
//         this.time_end_rearm = 0.0;
//         this.aoe = { x: 0.0, y: 0.0 }; // Vector2
//         this.increasing_speed = 0.0;
//         this.destroy_explode = false;
//         this.destroy_time_aoe = 0.0;
//         this.start_aoe_damage = 0.0;
//         this.end_aoe_damage = 0.0;

//         // Others
//         this.laser = false;
//         this.projectile_as_laser = false;
//         this.start_laser_damage = 0.0;
//         this.end_laser_damage = 0.0;
//         this.middle_damage = false;
//         this.middle_damage_multiplier = 0.0;
//         this.fade = false;
//         this.fade_start = 0.0;
//         this.fade_speed = 0.0;
//         this.drain = false;
//         this.drain_start = 0.0;
//         this.drain_speed = 0.0;
//         this.direction_drain = { x: 0.0, y: 0.0, z: 0.0 }; // Vector3
//         this.destroy_on_hit = false;
//         this.wall = false;
//         this.range_laser = 0.0;
//         this.instant_rotate = false;
//     }
// }
