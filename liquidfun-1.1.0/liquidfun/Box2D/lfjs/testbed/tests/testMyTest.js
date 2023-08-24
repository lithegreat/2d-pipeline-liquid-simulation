function TestMyTest() {
    camera.position.x = 3
    camera.position.y = 3;
    camera.position.z = 10;
    
    //var gravity = new b2Vec2(0, 0)
    //var world = new b2World(gravity);

     // Create ground
    var groundDef = new b2BodyDef();
    var ground = world.CreateBody(groundDef);
    var groundShape = new b2EdgeShape();
    groundShape.Set(new b2Vec2(0, 5.9), new b2Vec2(8, 5.9));
    ground.CreateFixtureFromShape(groundShape, 0);

    // Create pipe 
    var pipeDef = new b2BodyDef();
    var pipe = world.CreateBody(pipeDef);
    var pipeShape = new b2PolygonShape();
    var vertices = [
      new b2Vec2(0, 0),
      new b2Vec2(4, 0),
      new b2Vec2(4, 4),
      new b2Vec2(0, 4),
    ];
    pipeShape.vertices = vertices
    ground.CreateFixtureFromShape(pipeShape, 0.0);

    // Create fluid particles
    var particleSystemDef = new b2ParticleSystemDef();
    particleSystemDef.radius = 0.035;
    particleSystemDef.dampingStrength = 0.2;
    var particleSystem = world.CreateParticleSystem(particleSystemDef);

    // Emit particles into the pipe
    var emitterShape = new b2CircleShape();
    emitterShape.radius = 0.5;
    var particleGroupDef = new b2ParticleGroupDef();
    particleGroupDef.shape = emitterShape;
    particleGroupDef.position.Set(2.2, 3.9);
    particleSystem.CreateParticleGroup(particleGroupDef);

    // Set constant velocity for particles
    var velocity = new b2Vec2(5, 0);
  }