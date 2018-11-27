// delta de la matriz es 4 maso


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

    drawpacman();

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

  // console.log(paths);

  var geometry;
  var material;
  var sphere;
  var diff = 120;
  var color;
  var minX = null, maxX = null, minY = null, maxY = null;


  // map[0][0] = 3;
  // map[1][0] = 3;

  for (var path in paths) {
    color = Math.random() * 0xffffff;
    for (var coords in paths[path]) {
      // drawSquare(color, paths[path][coords].x-diff, paths[path][coords].y-diff)
      if (minX == null || paths[path][coords].x-diff < minX)
        minX = paths[path][coords].x-diff;
      if (minY == null || paths[path][coords].y-diff < minY)
        minY = paths[path][coords].y-diff;
      if (maxX == null || paths[path][coords].x-diff > maxX)
        maxX = paths[path][coords].x-diff;
      if (maxY == null || paths[path][coords].y-diff > maxY)
        maxY = paths[path][coords].y-diff;
      if (paths[path][coords].cx != undefined) {
        // drawSquare(color, paths[path][coords].cx-diff, paths[path][coords].cy-diff)
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

  // console.log(minX);
  // console.log(maxX);
  // console.log(minY);
  // console.log(maxY);

  map = Array(((maxY+(minY * -1))/delta)+1).fill(0);
  for (var i = 0; i < map.length; i++) {
    map[i] = Array(((maxX+(minX * -1))/delta)+1).fill(0);
  }

  var arr = [];


  for (var path in paths) {
    for (var coords in paths[path]) {
      arr.push({'x': ((paths[path][coords].x)*delta)-diff, 'y': ((paths[path][coords].y)*delta)-diff});
      if (paths[path][coords].cx != undefined) {
        arr.push({'x': ((paths[path][coords].cx)*delta)-diff, 'y': ((paths[path][coords].cy)*delta)-diff});
      }
    }
  }


  arr.sort(function(a, b) {
    return a.y - b.y || a.x - b.x;
  });

  // console.log(arr);


  var x, y;
  var row;
  var openTunnel = true;

  for (var path in paths) {
    for (var coords in paths[path]) {
      x = Math.round((paths[path][coords].x-diff + (minX * -1))/delta);
      y = Math.round((paths[path][coords].y-diff + (minY * -1))/delta);
      if ((x == 0 || x == map[y].length -1) && openTunnel) {
        openTunnel = false;
        continue;
      } else if (x==0 || x == map[y].length -1) {
        openTunnel = true;
      }
      row = map[y];
      row[x] = 1;
      if (paths[path][coords].cx != undefined) {
        x = Math.round((paths[path][coords].cx-diff + (minX * -1))/delta);
        y = Math.round((paths[path][coords].cy-diff + (minY * -1))/delta);
        row = map[y];
        row[x] = 1;
      }
    }
  }

  var tunnelY = null;

  var firstSphere = true;
  color = Math.random() * 0xffffff;
  var endRow = true;

  for (var y in map) {
    firstSphere = true;
    // color = Math.random() * 0xffffff;
    for (var x in map[y]) {
      if(x == 0 && (y > 0 && y < map.length -2) && (map[parseInt(y)-1][x] == 1 && map[parseInt(y)+2][x] == 1)){
        firstSphere = false;
        tunnelY = y;
      }

      endRow = true;
      for (var i = x; i < map[y].length; i++) {
        if (map[y][i] == 1) {
          endRow = false;
          break;
        }
      }

      if(y == tunnelY)
        endRow = false;

      if (
        (y != 0 && y != map.length) &&
        // (map[y-1][x] != 1 && map[y+1][x]) &&
        (
          // Do not draw in center
          (x > 12 && x < 18 && y > 13 && y < 16) ||
          // Do not draw in center and end Row
          ( x == 15 && y == 13) || endRow
        )
      ) {
        continue;
      }
      if (map[y][x] == 1) {
        drawSquare(color, x*delta-diff, y*delta-diff);
        firstSphere = false;
      } else if(map[y][x] == 0) {
        if (firstSphere || x > map[y].length - 4 || y > map.length - 1)
          continue;
        if(map[y][parseInt(x)+1] == 1 || map[parseInt(y)+1][x] == 1 || map[parseInt(y)+1][parseInt(x)+1] == 1 || (map[parseInt(y)+1][parseInt(x)+1] == 1 && map[parseInt(y)-1][parseInt(x)-1] == 1))
          continue;
        drawSphere((x*delta-diff)+(delta/2),(y*delta-diff)+(delta/2));
      }
    }
  }

  console.log(map);

  // for (var x in map) {
  //   if (map[x][y] == 1) {
  //     drawSquare(color, x*delta-diff, y*delta-diff);
  //     firstSphere = false;
  //   } else if(map[x][y] == 0) {
  //     if (x == 0 || x == map.length-1 || y == 0 || y == map[x].length-1 || firstSphere)
  //       continue;
  //     drawSphere(x*delta-diff,y*delta-diff);
  //   }
  // }

  // console.log(map);

}

function drawpacman(){
  var geometry = new THREE.SphereGeometry( 5, 32, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xF4F614} );
  var pacman1 = new THREE.Mesh( geometry, material );
  scene.add( pacman1 );
}

function drawSquare(color, x, y){
  var size = 8;

  var geometry = new THREE.CubeGeometry( size, size, size );
  var material = new THREE.MeshBasicMaterial( {color: color} );
  var sphere = new THREE.Mesh( geometry, material );
  sphere.position.set(x, 0, y);
  group.add( sphere );
}

function drawSphere(i, j){
  var geometry = new THREE.SphereGeometry( 1, 10, 10 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  var sphere = new THREE.Mesh( geometry, material );
  sphere.position.set(i, 0, j);
  scene.add( sphere );
}
