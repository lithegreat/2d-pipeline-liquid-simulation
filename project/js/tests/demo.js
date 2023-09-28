function demo (){
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 10

    // Create border
    let borderDef = new b2.BodyDef
    let border = world.CreateBody(borderDef)
    let borderShape = new b2.ChainShape()
    borderShape.vertices = [
        new b2.Vec2(-5, -2),
        new b2.Vec2(5, -2),
        new b2.Vec2(5, 2),
        new b2.Vec2(-5, 2),
    ]
    borderShape.CreateLoop(borderShape.vertices)
    border.CreateFixture(borderShape, 0.0)

    // Create pipe
    let pipeDef = new b2.BodyDef
    let pipe = world.CreateBody(pipeDef)
    let pipeShape = new b2.ChainShape()
    pipeShape.vertices = [
        new b2.Vec2(0, 0),
        new b2.Vec2(-5, -1.75),
        new b2.Vec2(-5, -2),
        new b2.Vec2(0, -0.25),
        new b2.Vec2(5, -0.25),
        new b2.Vec2(5, 0.25),
        new b2.Vec2(0, 0.25),
        new b2.Vec2(-5, 2),
        new b2.Vec2(-5, 1.75),
    ]
    pipeShape.CreateLoop(pipeShape.vertices)
    pipe.CreateFixture(pipeShape, 0.0)

    // Create particle system
    let particleSystemDef = new b2.ParticleSystemDef()
    particleSystemDef.radius = 0.025
    particleSystemDef.dampingStrength = 0.5
    particleSystemDef.surfaceTensionPressureStrength = 0.2
    particleSystemDef.surfaceTensionNormalStrength = 0.2
    particleSystem = world.CreateParticleSystem(particleSystemDef)

    // particle group 1
    let pgd1 = new b2.ParticleGroupDef()
    let particleShape1 = new b2.CircleShape()
    particleShape1.radius = 0.117
    particleShape1.m_p.Set(-4.64, -1.75)
    pgd1.shape = particleShape1
    pgd1.flags = b2._tensileParticle | b2._colorMixingParticle
    pgd1.color.Set(255, 0, 0, 255)
    pgd1.linearVelocity.Set(0.5, 0)
    let xf1 = new b2.Transform;
    xf1.SetIdentity();

    // particle group 2
    let pgd2 = new b2.ParticleGroupDef()
    let particleShape2 = new b2.CircleShape()
    particleShape2.radius = 0.117
    particleShape2.m_p.Set(-4.64, 1.75)
    pgd2.shape = particleShape2
    pgd2.flags = b2._tensileParticle | b2._colorMixingParticle
    pgd2.color.Set(0, 255, 0, 255)
    pgd2.linearVelocity.Set(0.5, 0)
    let xf2 = new b2.Transform;
    xf2.SetIdentity();

    intervalId = setInterval(function() {
        particleSystem.DestroyParticlesInShape(particleShape1,xf1)
        particleSystem.DestroyParticlesInShape(particleShape2,xf2)
        particleSystem.CreateParticleGroup(pgd1)
        particleSystem.CreateParticleGroup(pgd2)
    }, 50); // Create new particles every 50ms

    // testbed specific
    renderer.updateColorParticles = true
}
