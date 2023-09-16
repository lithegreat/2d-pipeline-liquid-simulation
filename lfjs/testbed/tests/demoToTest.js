function demoToTest (){
    // // 创建LiquidFun粒子系统
    // let particleSystemDef = new b2ParticleSystemDef();
    // particleSystemDef.radius = 0.05; // 粒子半径
    // let particleSystem = world.CreateParticleSystem(particleSystemDef);

    // // 设置粒子生成器的参数
    // let emitterDef = new b2ParticleGroupDef();
    // emitterDef.shape = new b2PolygonShape();
    // emitterDef.shape.SetAsBox(0.1, 0.1); // 粒子生成器的形状
    // emitterDef.position.Set(0, 2); // 粒子生成器的初始位置
    // emitterDef.color.Set(255, 0, 0, 255); // 粒子的颜色

    // // 定义生成粒子的频率
    // let particleGenerationRate = 60; // 每秒生成的粒子数

    // // 开始生成粒子的循环
    // function generateParticles() {
    // // 创建粒子群组并添加到粒子系统中
    //     let particleGroup = particleSystem.CreateParticleGroup(emitterDef);

    // // 设置粒子群组的持续时间，以后会销毁
    //     setTimeout(() => {
    //     particleSystem.DestroyParticleGroup(particleGroup);
    // }, 1000); // 粒子群组持续1秒

    // // 循环生成粒子
    //     setTimeout(generateParticles, 1000 / particleGenerationRate);
    // }

    // // 开始生成粒子
    // generateParticles();

    // // 模拟步进函数
    // function step() {
    //     world.Step(1 / 60, 10, 10);

    // // 这里可以添加其他逻辑

    //     requestAnimationFrame(step);
    // }

    // // 启动模拟
    // step();

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
    particleSystemDef.radius = 0.01
    particleSystemDef.dampingStrength = 0.5
    this.particleSystem = world.CreateParticleSystem(particleSystemDef)

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

    // 设置定时函数或循环，以便继续创建新的粒子
    setTimeout(Demo1, 100); // 每100毫秒创建一个粒子

}
