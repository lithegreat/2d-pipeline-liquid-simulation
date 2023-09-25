import Box2DFactory from 'Box2D.js'
import "renderer.js"
import "three.js"

/**
 * Make a copy of the Box2DFactory variable (this is a workaround to change its type).
 * Tell our IDE that the typings for this variable can be found inside node_modules/box2d-wasm
 * @type {import('box2d-wasm')}
 */
const Box2DFactory_ = Box2DFactory

Box2DFactory().then(box2D => {
    const { b2BodyDef, b2_dynamicBody, b2PolygonShape, b2Vec2, b2World } = box2D;

    camera = new THREE.PerspectiveCamera(70
        , windowWidth / windowHeight
        , 1, 1000);
    threeRenderer = new THREE.WebGLRenderer();
    threeRenderer.setClearColor(0xEEEEEE);
    threeRenderer.setSize(windowWidth, windowHeight);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;
    scene = new THREE.Scene();
    camera.lookAt(scene.position);

    document.body.appendChild( this.threeRenderer.domElement);

    // hack
    renderer = new Renderer();
    var gravity = new b2Vec2(0, 0);
    world = new b2World(gravity);
    Testbed();

    // in metres per second squared
    const gravity = new b2Vec2(0, 10);
    const world = new b2World(gravity);

    
});