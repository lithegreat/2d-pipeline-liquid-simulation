import Box2DFactory from '../Box2D/entry.js'
import { makeDebugDraw } from '../debugDraw.js'

const Box2DFactory_ = Box2DFactory
Box2DFactory_().then((box2D) => {
	const {
		b2ParticleGroup,
		b2ParticleGroupDef,
		b2ParticleSystemDef,
		b2ChainShape,
		b2PolygonShape,
		b2EdgeShape,
		b2Transform,
		b2World,
		b2BodyDef,
		b2Vec2,
		wrapPointer
	} = box2D

	const reifyArray = (array_p, numElements, sizeOfElement, ctor) =>
		Array(numElements)
			.fill(undefined)
			.map((_, index) => wrapPointer(array_p + index * sizeOfElement, ctor))

	// init the canvas and box2d world
	const canvas = document.getElementById('demo-canvas')
	const ctx = canvas.getContext('2d')
	const pixelsPerMeter = 32
	const cameraOffsetMetres = {
		x: 0,
		y: 0
	}
	const gravity = new b2Vec2(0, 0)
	const world = new b2World(gravity)

	// Create the pipe
	const pipeDef = new b2BodyDef()
	const pipe = world.CreateBody(pipeDef)
	{
		const pipeShape = new b2EdgeShape()
		pipeShape.SetTwoSided(new b2Vec2(0, 1), new b2Vec2(100, 1))
		pipe.CreateFixture(pipeShape, 0)
	}
	{
		const pipeShape = new b2EdgeShape()
		pipeShape.SetTwoSided(new b2Vec2(0, 2), new b2Vec2(100, 2))
		pipe.CreateFixture(pipeShape, 0)
	}
	{
		const pipeShape = new b2EdgeShape()
		pipeShape.SetTwoSided(new b2Vec2(0, 1), new b2Vec2(0, 2))
		pipe.CreateFixture(pipeShape, 0)
	}

	const airShape = new b2PolygonShape()
	airShape.SetAsBox(5, 1, new b2Vec2(6, 2), 0)

	const particleSystemDef = new b2ParticleSystemDef()
	particleSystemDef.radius = 0.1
	const particleSystem = world.CreateParticleSystem(particleSystemDef)

	// // Particle group for air particles (filling the pipe)
	// const airParticleGroupDef = new b2ParticleGroupDef()
	// airParticleGroupDef.shape = airShape
	// airParticleGroupDef.flags =
	// 	box2D.b2_tensileParticle | box2D.b2_colorMixingParticle
	// airParticleGroupDef.color.Set(255, 255, 255, 255) // White color for air
	// particleSystem.CreateParticleGroup(airParticleGroupDef)

	// Particle group for liquid particles (entering from the left)
	const liquidParticleGroupDef = new b2ParticleGroupDef()
	const liquidEmitterShape = new b2PolygonShape()
	const emitterWidth = 0.5 // Width of the emitter shape
	const emitterHeight = 0.5 // Height of the emitter shape
	liquidEmitterShape.SetAsBox(emitterWidth / 2, emitterHeight / 2, new b2Vec2(0.5, 1.5), 0)
	liquidParticleGroupDef.shape = liquidEmitterShape
	liquidParticleGroupDef.flags = box2D.b2_tensileParticle | box2D.b2_colorMixingParticle
	liquidParticleGroupDef.color.Set(0, 0, 255, 255) // Blue color for liquid
	liquidParticleGroupDef.linearVelocity.Set(2, 0) // Set the initial velocity to the right
	setInterval(function () {
		particleSystem.DestroyParticlesInShape(liquidEmitterShape, new b2Transform())
		const liquidParticleGroup = particleSystem.CreateParticleGroup(liquidParticleGroupDef)
		console.log(liquidParticleGroup)
		// 获取粒子的位置
		const positionsPointer = particleSystem.GetPositionBuffer()
		const count = particleSystem.GetParticleCount()
		const positions = reifyArray(positionsPointer, count * 2, b2Vec2)
		// 遍历每个粒子的位置
		for (let i = 0; i < count; i++) {
			const particleX = positions[i * 2].x // 获取 x 坐标
			// 如果粒子 x 坐标超过了 10，销毁它
			if (particleX > 10) {
				particleSystem.DestroyParticle(i)
			}
		}
	}, 500)

	const debugDraw = makeDebugDraw(ctx, pixelsPerMeter, box2D)
	world.SetDebugDraw(debugDraw)

	// calculate no more than a 60th of a second during one world.Step() call
	const maxTimeStepMs = (1 / 15) * 1000
	/** @param {number} deltaMs */
	const step = (deltaMs) => {
		const clampedDeltaMs = Math.min(deltaMs, maxTimeStepMs)
		world.Step(clampedDeltaMs / 1000, 3, 2)
	}

	const drawCanvas = () => {
		ctx.fillStyle = 'rgb(255,255,255)'
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		ctx.save()
		ctx.scale(pixelsPerMeter, pixelsPerMeter)
		const { x, y } = cameraOffsetMetres
		ctx.translate(x, y)
		ctx.lineWidth /= pixelsPerMeter

		ctx.fillStyle = 'rgb(255,255,0)'
		world.DebugDraw()

		ctx.restore()
	}

	/** @type {?number} */
	let handle
	;(function loop(prevMs) {
		const nowMs = window.performance.now()
		handle = requestAnimationFrame(loop.bind(null, nowMs))
		const deltaMs = nowMs - prevMs
		step(deltaMs)
		drawCanvas()
	})(window.performance.now())
})
