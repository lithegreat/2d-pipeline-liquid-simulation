function test1() {
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 10
    
    //let gravity = new b2Vec2(0, 0)
    //let world = new b2World(gravity)

     // Create ground
    let groundDef = new b2BodyDef
    let ground = world.CreateBody(groundDef)
    let groundShape = new b2ChainShape()
    groundShape.vertices[0] = new b2Vec2(-5, -2)
    groundShape.vertices[1] = new b2Vec2(5, -2)
    groundShape.vertices[2] = new b2Vec2(5, 2)
    groundShape.vertices[3] = new b2Vec2(-5, 2)
    groundShape.CreateLoop()
    ground.CreateFixtureFromShape(groundShape, 0.0)

    // Create pipe 
    let pipeDef = new b2BodyDef
    let pipe = world.CreateBody(pipeDef)
    let pipeShape = new b2ChainShape()
    pipeShape.vertices.push(new b2Vec2(-5, 0.5))
    pipeShape.vertices.push(new b2Vec2(-5, -0.5))
    pipeShape.vertices.push(new b2Vec2(0, -0.5))
    pipeShape.vertices.push(new b2Vec2(0, 0.5))
    pipeShape.CreateLoop()
    pipe.CreateFixtureFromShape(pipeShape, 0.0)

    // Create fluid particles
    let particleSystemDef = new b2ParticleSystemDef()
    particleSystemDef.radius = 0.035
    particleSystemDef.dampingStrength = 0.5
    let particleSystem = world.CreateParticleSystem(particleSystemDef)

    // Emit particles into the pipe
    let pgd1 = new b2ParticleGroupDef()//Group 1
    let emitterShape1 = new b2CircleShape()
    emitterShape1.radius = 0.5
    emitterShape1.position.Set(-4, 1)
    pgd1.shape = emitterShape1
    pgd1.flags = b2_tensileParticle | b2_colorMixingParticle
    pgd1.color.Set(255, 0, 0, 255)
    pgd1.linearVelocity.Set(1, 0)
    particleSystem.CreateParticleGroup(pgd1)
    
    let pgd2 = new b2ParticleGroupDef()//Group 2
    let emitterShape2 = new b2CircleShape()
    emitterShape2.radius = 0.5
    emitterShape2.position.Set(-4, -1)
    pgd2.shape = emitterShape2
    pgd2.flags = b2_tensileParticle | b2_colorMixingParticle
    pgd2.color.Set(255, 0, 255, 0)
    pgd2.linearVelocity.Set(1, 0)
    particleSystem.CreateParticleGroup(pgd2)

    // testbed specific
    renderer.updateColorParticles = true
}