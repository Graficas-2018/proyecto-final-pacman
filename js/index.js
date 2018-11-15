function run() {
    requestAnimationFrame(function() { run(); });

        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        // animate();

        // Update the camera controller
        orbitControls.update();
}

function createScene(canvas) {

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Turn on shadows
    renderer.shadowMap.enabled = true;
    // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 600, 0);
    scene.add(camera);

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0,20,0);

    // Create a group to hold all the objects
    root = new THREE.Object3D;

    ambientLight = new THREE.AmbientLight ( 0xffffff );
    root.add(ambientLight);

    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xf4f614} );
    var pacman1 = new THREE.Mesh( geometry, material );
    scene.add( pacman1 );

    // Create a group to hold the objects
    group = new THREE.Object3D;
    root.add(group);

    // Now add the group to our scene
    scene.add( root );

    createBoard();
}

function createBoard(){
  var { paths } = mapgen();

  console.log(paths);

  var geometry;
  var material;
  var sphere;
  var diff = 120;
  var size = 5;

  for (var path in paths) {
    // console.log(path);
    for (var coords in paths[path]) {
      console.log(coords);
      geometry = new THREE.BoxGeometry( size, size, size );
      material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
      sphere = new THREE.Mesh( geometry, material );
      sphere.position.set(paths[path][coords].x-diff, 0, paths[path][coords].y-diff);
      group.add( sphere );
      if (paths[path][coords].cx != undefined) {
        geometry = new THREE.BoxGeometry( size, size, size );
        material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(paths[path][coords].cx-diff, 0, paths[path][coords].cy-diff);
        group.add( sphere );
      }
    }
  }
}

function createPacman(){

}
