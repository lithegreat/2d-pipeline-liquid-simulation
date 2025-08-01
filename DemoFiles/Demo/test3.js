function demoTest() {
	camera.position.x = 0
	camera.position.y = 0
	camera.position.z = 10

	// Create border
	var borderDef = new b2BodyDef()
	var border = world.CreateBody(borderDef)
	var borderShape = new b2ChainShape()
	borderShape.vertices = [
		new b2Vec2(-5, -2),
		new b2Vec2(5, -2),
		new b2Vec2(5, 2),
		new b2Vec2(-5, 2)
	]
	borderShape.CreateLoop()
	border.CreateFixtureFromShape(borderShape, 0.0)

	// Create pipe
	var pipeDef = new b2BodyDef()
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
		new b2Vec2(-5, 1.75)
	]
	pipeShape.CreateLoop()
	pipe.CreateFixtureFromShape(pipeShape, 0.0)

	// Create particle system
	var particleSystemDef = new b2ParticleSystemDef()
	particleSystemDef.radius = 0.02
	particleSystemDef.dampingStrength = 0.5
	particleSystemDef.surfaceTensionPressureStrength = 0.2
	particleSystemDef.surfaceTensionNormalStrength = 0.2
	particleSystem = world.CreateParticleSystem(particleSystemDef)

	// particle group 1
	var pgd1 = new b2ParticleGroupDef()
	var particleShape1 = new b2CircleShape()
	particleShape1.radius = 0.117
	particleShape1.position.Set(-4.64, -1.75)
	pgd1.shape = particleShape1
	pgd1.flags = b2_tensileParticle | b2_colorMixingParticle
	pgd1.color.Set(255, 0, 0, 255)
	pgd1.linearVelocity.Set(0.5, 0)
	var xf1 = new b2Transform()
	xf1.SetIdentity()

	// particle group 2
	var pgd2 = new b2ParticleGroupDef()
	var particleShape2 = new b2CircleShape()
	particleShape2.radius = 0.117
	particleShape2.position.Set(-4.64, 1.75)
	pgd2.shape = particleShape2
	pgd2.flags = b2_tensileParticle | b2_colorMixingParticle
	pgd2.color.Set(0, 255, 0, 255)
	pgd2.linearVelocity.Set(0.5, 0)
	var xf2 = new b2Transform()
	xf2.SetIdentity()

	intervalId = setInterval(function () {
		particleSystem.DestroyParticlesInShape(particleShape1, xf1)
		particleSystem.DestroyParticlesInShape(particleShape2, xf2)
		particleSystem.CreateParticleGroup(pgd1)
		particleSystem.CreateParticleGroup(pgd2)

		// 获取所有粒子的位置
		var positions = particleSystem.GetPositionBuffer()

		console.log(positions.length)

		// 遍历粒子位置，检查每个粒子的 x 坐标
		for (var i = 0; i < positions.length; i += 2) {
			var x = positions[i]
			// 检查粒子是否到达右边
			if (x > 4) {
				// 符合条件的粒子将被销毁
				particleSystem.DestroyParticle(i / 2) // 使用 i / 2 获取粒子索引
			}
		}
	}, 50) // Create new particles every 50ms

	// testbed specific
	renderer.updateColorParticles = true
}
