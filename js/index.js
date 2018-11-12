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
  var size = 8;
  var color;
  var minX = null, maxX = null, minY = null, maxY = null;

  // map[0][0] = 3;
  // map[1][0] = 3;

  for (var path in paths) {
    color = Math.random() * 0xffffff;
    for (var coords in paths[path]) {
      drawSquare(color, paths[path][coords].x-diff, paths[path][coords].y-diff)
      if (minX == null || paths[path][coords].x-diff < minX)
        minX = paths[path][coords].x-diff;
      if (minY == null || paths[path][coords].y-diff < minY)
        minY = paths[path][coords].y-diff;
      if (maxX == null || paths[path][coords].x-diff > maxX)
        maxX = paths[path][coords].x-diff;
      if (maxY == null || paths[path][coords].y-diff > maxY)
        maxY = paths[path][coords].y-diff;
      if (paths[path][coords].cx != undefined) {
        drawSquare(color, paths[path][coords].cx-diff, paths[path][coords].cy-diff)
        if (minX == null || paths[path][coords].cx-diff < minX)
          minX = paths[path][coords].cx-diff;
        if (minY == null || paths[path][coords].cy-diff < minY)
          minY = paths[path][coords].cy-diff;
        if (maxX == null || paths[path][coords].cx-diff > maxX)
          maxX = paths[path][coords].cx-diff;
        if (maxY == null || paths[path][coords].cy-diff > maxY)
          maxY = paths[path][coords].cy-diff;
      }
    }
  }

  var map = Array(((maxX+(minX * -1))/4)+1).fill(0);
  for (var i = 0; i < map.length; i++) {
    map[i] = Array(((maxY+(minY * -1))/4)+1).fill(0);
  }


  var x, y;
  var row;

  for (var path in paths) {
    for (var coords in paths[path]) {
      x = Math.round((paths[path][coords].x-diff + (minX * -1))/4);
      y = Math.round((paths[path][coords].y-diff + (minY * -1))/4);
      // console.log(String(paths[path][coords].x-diff) + ', ' + String(paths[path][coords].y-diff));
      // console.log(String(x)+', '+String(y));
      row = map[x];
      row[y] = 1;
      if (paths[path][coords].cx != undefined) {
        // map[paths[path][coords].cx-diff][paths[path][coords].cy-diff] = 1;
      }
    }
  }

  var diffX = 128;
  var diffZ = 96;
  size = 1;
  for (var i = 0; i < map.length; i++) {
    if(i == map.length-1) break;
    if(i % 2 == 0) continue;
    for (var j = 0; j < map[i].length; j++) {
      if(j == map[i].length-1) break;
      if(j % 2 == 0) continue;
      if(map[i+1][j+1] == 1)
        continue;

      var geometry = new THREE.SphereGeometry( size, 10, 10 );
      var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
      var sphere = new THREE.Mesh( geometry, material );
      sphere.position.set((i*4)-diffX, 0, (j*4)-diffZ);
      scene.add( sphere );


    }
  }

  console.log(map);

  console.log("min X: "+minX);
  console.log("max X: "+maxX);
  console.log("min Y: "+minY);
  console.log("max Y: "+maxY);


}

function drawSquare(color, x, y){
  var size = 8;

  var geometry = new THREE.CubeGeometry( size, size, size );
  var material = new THREE.MeshBasicMaterial( {color: color} );
  var sphere = new THREE.Mesh( geometry, material );
  sphere.position.set(x, 0, y);
  group.add( sphere );
}
