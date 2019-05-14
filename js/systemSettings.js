var SystemSettings = SystemSettings || {};

const ORANGE_VEC4 = new THREE.Vector4(1.0, 0.647, 0.0, 1.0);

SystemSettings.standardMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/spark.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 1.0, 0.0, 0.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

////////////////////////////////////////////////////////////////////////////////
// Basic system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.basic = {

    // Particle material
    particleMaterial : SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : SphereInitializer,
    initializerSettings : {
        sphere: new THREE.Vector4 ( 0.0, 0.0, 0.0, 10.0),
        color: ORANGE_VEC4,
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
        damping: new THREE.Vector3 ( 0.0, 0, 0 ), // (linear coeff, quadratic coeff, not in use )
        lifetime: 6,
        size:     10.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, 0, 0),
            attractors : [],
        },
        collidables: {},
    },

    // Scene
    maxParticles :  1000,
    particlesFreq : 1000,
    history: 40,
    createScene : function () {},
};

////////////////////////////////////////////////////////////////////////////////
// Oscilator system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.oscilator = {

    // Particle material
    particleMaterial : SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : SphereInitializer,
    initializerSettings : {
        sphere: new THREE.Vector4 ( 0.0, 0.0, 0.0, 0.0),
        color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 40.0, 0.0),
        damping: new THREE.Vector3 ( 0.01, 0, 0 ),
        lifetime: 30,
        size:     6.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, 0, 0),
            attractors : [ new THREE.Sphere( new THREE.Vector3(0.0, 20.0, 0.0), -500.0 ), new THREE.Sphere( new THREE.Vector3(0.0, -20.0, 0.0), -500.0 )],
        },
        collidables: {},
    },

    // Scene
    maxParticles :  1,
    particlesFreq : 150,
    //history: 20,
    createScene : function () {
        var sphere_geo = new THREE.SphereGeometry( 1.0, 32, 32 );
        var phong      = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x224422, side: THREE.DoubleSide } );
        var sphere = new THREE.Mesh( sphere_geo, phong )
        var sphere2= new THREE.Mesh( sphere_geo, phong )

        sphere.position.set (0,50,0);
        Scene.addObject( sphere );
        sphere2.position.set (0,-50,0);
        Scene.addObject( sphere2 );
    },
};


////////////////////////////////////////////////////////////////////////////////
// Fountain system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.fountainBounce = {

    // Particle material
    particleMaterial :  SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : FountainInitializer,
    initializerSettings : {
        sphere:   new THREE.Vector4 ( 0.0, 30.0, 0.0, 1.0 ),
        color: ORANGE_VEC4,
        velocity: new THREE.Vector3 ( 0.0, 30.0, 0.0),
        damping: new THREE.Vector3 ( 0.0, 0, 0 ),
        lifetime: 7,
        size:     5.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, -20, 0),
            attractors : [],
        },
        collidables: {
            bouncePlanes: [ {plane : new THREE.Vector4( 0, 1, 0, 0 ), damping : 0.8 } ],
        },
    },

    // Scene
    maxParticles :  9000,
    particlesFreq : 1000,
    //history: 20,
    createScene : function () {
        var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
        var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive: 0x222222, side: THREE.DoubleSide } );
        var plane     = new THREE.Mesh( plane_geo, phong );
        plane.rotation.x = -1.57;
        plane.position.y = 0;
        Scene.addObject( plane );

        var box_geo   = new THREE.BoxGeometry(10,30,10);
        var box       = new THREE.Mesh( box_geo, phong);
        box.position.set( 0.0, 15.0, 0.0 );
        Scene.addObject( box );

        var plane_geo_horiz = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
        var material_horiz = new THREE.MeshBasicMaterial( {color: 0xFF0000, alphaTest:0, visible: false } );
        var plane_horiz     = new THREE.Mesh( plane_geo_horiz, material_horiz);
        Scene.addObject( plane_horiz );

        
        
        // plane_horiz.rotation.y = -1.57;
        // plane_horiz.position.x = 0;

        
        
        
    },
};

SystemSettings.fountainSink = {

    // Particle material
    particleMaterial :  SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : FountainInitializer,
    initializerSettings : {
        sphere:   new THREE.Vector4 ( 0.0, 30.0, 0.0, 1.0 ),
        color:    new THREE.Vector4 ( 0.0, 0.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 30.0, 0.0),
        damping: new THREE.Vector3 ( 0.0, 0, 0 ),
        lifetime: 7,
        size:     5.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, -20, 0),
            attractors : [],
        },
        collidables: {
            sinkPlanes : [ { plane : new THREE.Vector4( 0, 1, 0, 0 ) } ],
        },
    },

    // Scene
    maxParticles :  6000,
    particlesFreq : 1000,
    //history: 1,
    createScene : function () {
        var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
        var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive: 0x222222, side: THREE.DoubleSide } );

        var box_geo   = new THREE.BoxGeometry(10,30,10)

        var plane     = new THREE.Mesh( plane_geo, phong );
        var box       = new THREE.Mesh( box_geo, phong );
        box.position.set( 0.0, 15.0, 0.0 );

        plane.rotation.x = -1.57;
        plane.position.y = 0;

        Scene.addObject( plane );
        Scene.addObject( box );
    },
};

////////////////////////////////////////////////////////////////////////////////
// Attractor system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.attractor = {

    // Particle material
    particleMaterial : SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : SphereInitializer,
    initializerSettings : {
        sphere:   new THREE.Vector4 ( 0.0, 0.0, 0.0, 5.0),
        color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
        damping: new THREE.Vector3 ( 0, 0, 0 ),
        lifetime: 7,
        size:     3.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, 0, 0),
            attractors : [ new THREE.Sphere( new THREE.Vector3(30.0, 30.0, 30.0), 750.0 ) ],
        },
        collidables: {},
    },

    // Scene
    maxParticles :  10000,
    particlesFreq : 1000,
    //history: 10,
    createScene : function () {
        var sphere_geo = new THREE.SphereGeometry( 1.0, 32, 32 );
        var phong      = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x442222, side: THREE.DoubleSide } );
        var sphere = new THREE.Mesh( sphere_geo, phong )

        sphere.position.set (30.0, 30.0, 30.0);
        Scene.addObject( sphere );
    },
};

////////////////////////////////////////////////////////////////////////////////
// Horse animation
////////////////////////////////////////////////////////////////////////////////

SystemSettings.animated = {

    // Particle Material
    particleMaterial :  SystemSettings.standardMaterial,

    // Initializer
    initializerFunction : AnimationInitializer,
    initializerSettings : {
        position: new THREE.Vector3 ( 0.0, 60.0, 0.0),
        color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, -40.0),
        damping: new THREE.Vector3 ( 0.0, 0, 0 ),
        lifetime: 1.25,
        size:     2.0,
    },

    // Updater
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, 0, 0),
            attractors : [],
        },
        collidables: {
            bouncePlanes: [ {plane : new THREE.Vector4( 0, 1, 0, 0 ), damping : 0.8 } ],
        },
    },

    // Scene
    maxParticles:  20000,
    particlesFreq: 1500,
    //history: 1,
    createScene : function () {
        var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
        var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x444444, side: THREE.DoubleSide } );
        var plane = new THREE.Mesh( plane_geo, phong );
        plane.rotation.x = -1.57;
        plane.position.y = 0;

        Scene.addObject( plane );
    },

    // Animation
    animatedModelName: "animated_models/horse.js",
    animationLoadFunction : function( geometry ) {

        mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true, transparent:true, opacity:0.5 } ) );
        mesh.scale.set( 0.25, 0.25, 0.25 );
        // mesh.position.set( 0.0, 30.0, 0.0 );
        Scene.addObject( mesh );
        ParticleEngine.addMesh( mesh );

        ParticleEngine.addAnimation( new THREE.MorphAnimation( mesh ) );
    },

};


////////////////////////////////////////////////////////////////////////////////
// Cloth
////////////////////////////////////////////////////////////////////////////////

SystemSettings.cloth = {

    // Particle Material
    particleMaterial :  new THREE.MeshLambertMaterial( { color:0xff0000, side: THREE.DoubleSide  } ),

    // Initializer
    initializerFunction : ClothInitializer,
    initializerSettings : {
        position: new THREE.Vector3 ( 0.0, 60.0, 0.0),
        color:    new THREE.Vector4 ( 1.0, 0.0, 0.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
    },

    // Updater
    updaterFunction : ClothUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, -10.0, 0),
            attractors : [],
        },
        collidables: {
            bounceSpheres: [ {sphere : new THREE.Vector4( 0, 0, 0, 52.0 ), damping : 0.5 } ],
        },
    },

    // Scene
    maxParticles:  400,
    particlesFreq: 1000,
    createScene : function () {
        var sphere_geo = new THREE.SphereGeometry( 50.0, 32, 32 );
        var phong      = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x442222, side: THREE.DoubleSide } );

        Scene.addObject( new THREE.Mesh( sphere_geo, phong ) );

    },

    // Cloth specific settings
    cloth : true,
    width : 20,
    height : 20,
};

////////////////////////////////////////////////////////////////////////////////
// My System
////////////////////////////////////////////////////////////////////////////////

function genericPlaneScene() {

    var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
    var phong     = new THREE.MeshPhongMaterial({
        color: 0x444444, emissive: 0x222222, side: THREE.DoubleSide
    });

    var plane     = new THREE.Mesh( plane_geo, phong );
    plane.rotation.x = -1.57;
    plane.position.y = 0;

    // Scene.addObject( plane );

    // instantiate a loader
    // var loader = new THREE.CubeTextureLoader();
    // loader.setPath( 'textures/cube_maps/darkcity/' );

    // var texture = loader.load([
    //     'darkcity_bk.jpg',
    //     'darkcity_dn.jpg',
    //     'darkcity_ft.jpg',
    //     'darkcity_lf.jpg',
    //     'darkcity_rt.jpg',
    //     'darkcity_up.jpg'
    // ]);

    let loader = new THREE.TextureLoader();
    let texture = loader.load('images/london_eye.jpg');
    Scene._scene.background = texture;
}

/**
 * @description Return a JSON object that can be used to configure a fireworks 
 * particle system. Having a function ensures that repeated initializations of 
 * a fireworks particle system use independent JSON objects. Cloning objects is 
 * too much hustle :-)
 */
function generateGenericSystemConfig() {
    return {

        // Particle Material
        particleMaterial :  SystemSettings.standardMaterial,
    
        // Initializer
        initializerFunction : BasicFireworksInitializer,
        initializerSettings : {
            sphere:   new THREE.Vector4 ( 0.0, 100.0, 0.0, 1.0 ),
            origin: new THREE.Vector3 (0.0, 0.0, 0.0),
            color: new THREE.Vector4(142/255, 41/255, 219/255, 1.0),
            velocity: new THREE.Vector3 (0.0, 30.0, 0.0), 
            targetPosition: new THREE.Vector3 (0.0, 30.0, 0.0),
            damping: new THREE.Vector3 ( 0.0, 0, 0 ),
            lifetime: 7,
            size: 10.0,
        },
    
        // Updater
        updaterFunction : BasicFireworksUpdater,
        updaterSettings : {
            externalForces : {
                gravity :     new THREE.Vector3( 0, 0, 0),
                attractors : [],
            },
            collidables: {},
            targetPosition: new THREE.Vector3 (0.0, 30.0, 0.0),
            originalLifetime: 7,
            explodeLifetime: 7 / 4.0,
            explodePosition: new THREE.Vector3 (0.0, 30.0, 0.0),
            originalColor: new THREE.Vector4(142/255, 41/255, 219/255, 1.0)
        },
    
        // Scene
        maxParticles:  5000, // Ugly hack. To create a ball-like group of particles, set freq to x10
        particlesFreq: 100000,
        createScene : genericPlaneScene,
    
    };
}

SystemSettings.mySystem = generateGenericSystemConfig();
