function Test() {
    camera.position.x = 0
    camera.position.y = 0;
    camera.position.z = 10;
    
    //var gravity = new b2Vec2(0, 0)
    //var world = new b2World(gravity);

     // Create ground
    var groundDef = new b2BodyDef;
    var ground = world.CreateBody(groundDef);
    var groundShape = new b2ChainShape();
    groundShape.vertices[0] = new b2Vec2(-5, -2);
    groundShape.vertices[1] = new b2Vec2(5, -2);
    groundShape.vertices[2] = new b2Vec2(5, 2);
    groundShape.vertices[3] = new b2Vec2(-5, 2);
    groundShape.CreateLoop();
    ground.CreateFixtureFromShape(groundShape, 0.0);

    // Create pipe 
    var pipeDef = new b2BodyDef;
    var pipe = world.CreateBody(pipeDef);
    var pipeShape = new b2ChainShape();
    pipeShape.vertices.push(new b2Vec2(-5, 0.5));
    pipeShape.vertices.push(new b2Vec2(-5, -0.5));
    pipeShape.vertices.push(new b2Vec2(0, -0.5));
    pipeShape.vertices.push(new b2Vec2(0, 0.5));
    pipeShape.CreateLoop();
    pipe.CreateFixtureFromShape(pipeShape, 0.0);

    // Create fluid particles
    var particleSystemDef = new b2ParticleSystemDef();
    particleSystemDef.radius = 0.035;
    particleSystemDef.dampingStrength = 0.5;
    var particleSystem = world.CreateParticleSystem(particleSystemDef);

    // Emit particles into the pipe
    var pgd1 = new b2ParticleGroupDef();//Group 1
    pgd1.surfaceTensionNormalStrength = 1;
    var emitterShape = new b2CircleShape();
    emitterShape.radius = 0.5;
    emitterShape.position.Set(-4, 1);
    pgd1.shape = emitterShape;
    pgd1.flags = b2_tensileParticle | b2_colorMixingParticle;
    pgd1.color.Set(255, 0, 0, 255);
    pgd1.linearVelocity.Set(1, 0);
    particleSystem.CreateParticleGroup(pgd1);
    
    var pgd2 = new b2ParticleGroupDef();//Group 2
    pgd2.surfaceTensionNormalStrength = 0.5;
    var emitterShape = new b2CircleShape();
    emitterShape.radius = 0.5;
    emitterShape.position.Set(-4, -1);
    pgd2.shape = emitterShape;
    pgd2.flags = b2_tensileParticle | b2_colorMixingParticle;
    pgd2.color.Set(255, 0, 255, 0);
    pgd2.linearVelocity.Set(1, 0);
    particleSystem.CreateParticleGroup(pgd2);

    // Set constant velocity for particles
    var velocity = new b2Vec2(0, 0);

    // testbed specific
    renderer.updateColorParticles = true;
  }