// let isDemoTestRunning = false; // 添加一个标志变量，用于控制是否运行 demoTest

function demoTest (){

    // isDemoTestRunning = true // 设置标志为true，表示 demoTest 正在运行
    
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 10

    // Create border
    var borderDef = new b2BodyDef
    var border = world.CreateBody(borderDef)
    var borderShape = new b2ChainShape()
    borderShape.vertices = [
        new b2Vec2(-5, -2),
        new b2Vec2(5, -2),
        new b2Vec2(5, 2),
        new b2Vec2(-5, 2),
    ]
    borderShape.CreateLoop()
    border.CreateFixtureFromShape(borderShape, 0.0)

    // Create pipe
    var pipeDef = new b2BodyDef
    var pipe = world.CreateBody(pipeDef)
    var pipeShape = new b2ChainShape()
    pipeShape.vertices = [
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
    pipeShape.CreateLoop()
    pipe.CreateFixtureFromShape(pipeShape, 0.0)

    // Create particle system
    var particleSystemDef = new b2ParticleSystemDef()
    particleSystemDef.radius = 0.02
    particleSystemDef.dampingStrength = 0.5
    particleSystem = world.CreateParticleSystem(particleSystemDef)

    // particle group 1
    var pgd1 = new b2ParticleGroupDef()
    var particleShape1 = new b2CircleShape()
    particleShape1.radius = 0.117
    particleShape1.position.Set(-4.64, -1.75)
    pgd1.shape = particleShape1
    pgd1.flags = b2_tensileParticle | b2_colorMixingParticle
    pgd1.color.Set(255, 0, 0, 255)
    pgd1.linearVelocity.Set(0.1, 0)
    particleSystem.CreateParticleGroup(pgd1)

    // particle group 2
    var pgd2 = new b2ParticleGroupDef()
    var particleShape2 = new b2CircleShape()
    particleShape2.radius = 0.117
    particleShape2.position.Set(-4.64, 1.75)
    pgd2.shape = particleShape2
    pgd2.flags = b2_tensileParticle | b2_colorMixingParticle
    pgd2.color.Set(0, 255, 0, 255)
    pgd2.linearVelocity.Set(0.1, 0)
    particleSystem.CreateParticleGroup(pgd2)

    // testbed specific
    renderer.updateColorParticles = true

    setInterval(function() {
        particleSystem.CreateParticleGroup(pgd1)
        particleSystem.CreateParticleGroup(pgd2)
    }, 1000); // 每1000毫秒创建一个粒子


}
