function Demo1() {
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 10

    //Create border
    let borderDef = new b2BodyDef
    let border = world.CreateBody(borderDef)
    let borderShape = new b2ChainShape()
    let borderVertices = [
        new b2Vec2(-5, -2),
        new b2Vec2(5, -2),
        new b2Vec2(5, 2),
        new b2Vec2(-5, 2),
    ]
    borderShape.vertices = borderVertices
    borderShape.CreateLoop()
    border.CreateFixtureFromShape(borderShape, 0.0)

    // Create pipe
    let pipeDef = new b2BodyDef
    let pipe = world.CreateBody(pipeDef)
    let pipeShape = new b2ChainShape()
    let pipeVertices = [
        new b2Vec2(0, 0),
        new b2Vec2(-5, -1.75),
        new b2Vec2(-5, -2),
        new b2Vec2(0, -0.25),
        new b2Vec2(5, -0.25),
        new b2Vec2(5, 0.25),
        new b2Vec2(0, 0.25),
        new b2Vec2(-5, 2),
        new b2Vec2(-5, 1.75),
    ]
    pipeShape.vertices = pipeVertices
    pipeShape.CreateLoop()
    pipe.CreateFixtureFromShape(pipeShape, 0.0)

    // Create particle system
    let particleSystemDef = new b2ParticleSystemDef()
    particleSystemDef.radius = 0.01
    particleSystemDef.dampingStrength = 0.5
    let particleSystem = world.CreateParticleSystem(particleSystemDef)

    // particle group 1
    let pgd1 = new b2ParticleGroupDef()
    let particleShape1 = new b2CircleShape()
    particleShape1.radius = 0.117
    particleShape1.position.Set(-4.64, -1.75)
    pgd1.shape = particleShape1
    pgd1.flags = b2_tensileParticle | b2_colorMixingParticle
    pgd1.color.Set(255, 0, 0, 255)
    pgd1.linearVelocity.Set(0.1, 0)
    particleSystem.CreateParticleGroup(pgd1)

    // particle group 2
    let pgd2 = new b2ParticleGroupDef()
    let particleShape2 = new b2CircleShape()
    particleShape2.radius = 0.117
    particleShape2.position.Set(-4.64, 1.75)
    pgd2.shape = particleShape2
    pgd2.flags = b2_tensileParticle | b2_colorMixingParticle
    pgd2.color.Set(0, 255, 0, 255)
    pgd2.linearVelocity.Set(0.1, 0)
    particleSystem.CreateParticleGroup(pgd2)


    // testbed specific
    renderer.updateColorParticles = true
}