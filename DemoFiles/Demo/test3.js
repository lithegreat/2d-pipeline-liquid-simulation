import Box2DFactory from '../Box2D/entry.js'
import { makeDebugDraw } from '../debugDraw.js'

const Box2DFactory_ = Box2DFactory;
Box2DFactory_().then(box2D => {
	const {
		b2ParticleGroupDef,
		b2ParticleSystemDef,
		b2PolygonShape,
		b2World,
		b2Vec2
	} = box2D;

	// init the canvas and box2d world
	const canvas = document.getElementById("demo-canvas");
	const ctx = canvas.getContext('2d');
	const pixelsPerMeter = 32;
	const cameraOffsetMetres = {
		x: 0,
		y: 0
	};
	const gravity = new b2Vec2(0, 0); // zero gravity
	const world = new b2World(gravity);

	// Create the ground
	const ground = world.CreateBody(new box2D.b2BodyDef());

	// Particle system for air
	const airParticleSystemDef = new b2ParticleSystemDef();
	airParticleSystemDef.radius = 0.02;
	const airParticleSystem = world.CreateParticleSystem(airParticleSystemDef);

	// Particle group for air particles (filling the pipe)
	const airParticleGroupDef = new b2ParticleGroupDef();
	const airEmitterShape = new b2PolygonShape();
	airEmitterShape.SetAsBox(0.5, 10); // A rectangular pipe shape
	airParticleGroupDef.shape = airEmitterShape;
	airParticleGroupDef.flags = box2D.b2_tensileParticle | box2D.b2_colorMixingParticle;
	airParticleGroupDef.color.Set(255, 255, 255, 255); // White color for air
	airParticleSystem.CreateParticleGroup(airParticleGroupDef);

	// Create Fixture for the pipe
	const pipeFixtureDef = new box2D.b2FixtureDef();
	pipeFixtureDef.shape = airEmitterShape;
	ground.CreateFixture(pipeFixtureDef);

	// Particle system for liquid
	const liquidParticleSystemDef = new b2ParticleSystemDef();
	liquidParticleSystemDef.radius = 0.02;
	const liquidParticleSystem = world.CreateParticleSystem(liquidParticleSystemDef);

	// Particle group for liquid particles (entering from the left)
	const liquidParticleGroupDef = new b2ParticleGroupDef();
	const liquidEmitterShape = new b2PolygonShape();
	liquidEmitterShape.SetAsBox(0.5, 10);
	liquidParticleGroupDef.shape = liquidEmitterShape;
	liquidParticleGroupDef.flags = box2D.b2_tensileParticle | box2D.b2_colorMixingParticle;
	liquidParticleGroupDef.color.Set(0, 0, 255, 255); // Blue color for liquid
	liquidParticleGroupDef.position.Set(-9, 0); // Set the initial position to the left of the pipe
	liquidParticleGroupDef.linearVelocity.Set(5, 0); // Set the initial velocity to the right
	const liquidParticleGroup = liquidParticleSystem.CreateParticleGroup(liquidParticleGroupDef);

	// Debug draw setup
	const debugDraw = makeDebugDraw(ctx, pixelsPerMeter, box2D);
	world.SetDebugDraw(debugDraw);

	// Main loop
	const maxTimeStepMs = 1 / 60 * 1000;
	let handle;
	(function loop(prevMs) {
		const nowMs = window.performance.now();
		handle = requestAnimationFrame(loop.bind(null, nowMs));
		const deltaMs = nowMs - prevMs;
		step(deltaMs);
		drawCanvas();
	}(window.performance.now()));

	function step(deltaMs) {
		const clampedDeltaMs = Math.min(deltaMs, maxTimeStepMs);
		world.Step(clampedDeltaMs / 1000, 3, 2);

		// Check if liquid particles reached the right side of the pipe and destroy them
		const liquidParticleCount = liquidParticleGroup.GetParticleCount();
		for (let i = 0; i < liquidParticleCount; i++) {
			const particlePosition = liquidParticleSystem.GetParticlePosition(liquidParticleGroup.GetBufferIndex() + i, new b2Vec2());
			if (particlePosition.x > 10) { // Assuming the right side of the pipe is at x = 10
				liquidParticleSystem.DestroyParticle(liquidParticleGroup.GetBufferIndex() + i);
			}
		}
	}

	function drawCanvas() {
		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.save();
		ctx.scale(pixelsPerMeter, pixelsPerMeter);
		const { x, y } = cameraOffsetMetres;
		ctx.translate(x, y);
		ctx.lineWidth /= pixelsPerMeter;

		ctx.fillStyle = 'rgb(255,255,0)';
		world.DebugDraw();

		ctx.restore();
	}
});
