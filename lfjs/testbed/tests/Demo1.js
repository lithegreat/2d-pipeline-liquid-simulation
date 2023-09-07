function Demo1() {
    camera.position.x = 0
    camera.position.y = 0;
    camera.position.z = 10;


    //Create ground
    var groundDef = new b2BodyDef;
    var ground = world.CreateBody(groundDef);
    var groundShape = new b2ChainShape();

    ground.CreateFixtureFromShape(groundShape, 0.0);


    var pipeDef = new b2BodyDef;
    var pipe = world.CreateBody(pipeDef);
    var pipeShape = new b2ChainShape();

    pipe.CreateFixtureFromShape(pipeShape, 0.0);


    var particleSystemDef = new b2ParticleSystemDef();
    particleSystemDef.radius = 0.03;
    particleSystemDef.dampingStrength = 0.5;
    var particleSystem = world.CreateParticleSystem(particleSystemDef);



    renderer.updateColorParticles = true;
}