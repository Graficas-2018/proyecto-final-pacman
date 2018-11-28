var clock = new THREE.Clock();
// delta de la matriz es 4 maso
var geometry_pacman = new THREE.SphereGeometry( 5, 32, 32 );
var material_pacman = new THREE.MeshBasicMaterial( {color: 0xF4F614} );
var pacman1 = new THREE.Mesh( geometry_pacman, material_pacman );

function run() {
    requestAnimationFrame(function() { run(); });

        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        // animate();
        var now = Date.now();
        if (now - currentTime >= 400) {
          moveGhosts();
          currentTime = now;
        }

        switch (rotation) {
          case 0:
            camera.position.set(pacman1.position.x , pacman1.position.y + 30, pacman1.position.z + 60);
            break;

          case 1:
            camera.position.set(pacman1.position.x + 60, pacman1.position.y + 30, pacman1.position.z );
            break;

          case 2:
            camera.position.set(pacman1.position.x, pacman1.position.y + 30, pacman1.position.z - 60);
            break;

          case 3:
            camera.position.set(pacman1.position.x  - 60, pacman1.position.y + 30, pacman1.position.z);
            break;
        }

        camera.lookAt(pacman1.position);

        if(pacman1.position.x < minX){
          pacman1.position.x = maxX - delta;
          camera.position.x = maxX - delta;
        }else if(pacman1.position.x > maxX){
          pacman1.position.x = maxX - delta;
          camera.position.x = minX + delta;
        }

        // Update the camera controller
        // orbitControls.update();
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
    camera.position.set(0, 30, pacman1.position.z + 60);
    camera.rotation.x = -Math.PI/7;
    // camera.position.set(0, 20, 80);
    scene.add(camera);

    // orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    // orbitControls.target = new THREE.Vector3(0,20,0);

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
    createGhosts();
}

function createBoard(){
  var { paths } = mapgen();

  // console.log(paths);

  var geometry;
  var material;
  var sphere;
  var diff = 120;
  var color;

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
    // check to color the first sphere
    firstSphere = true;
    // color = Math.random() * 0xffffff;

    // Check for first sphere and location in y of tunnel
    for (var x in map[y]) {
      if(x == 0 && (y > 0 && y < map.length -2) && (map[parseInt(y)-1][x] == 1 && map[parseInt(y)+2][x] == 1)){
        firstSphere = false;
        tunnelY = y;
      }

      // check if theres more spheres or the row has ended
      endRow = true;
      for (var i = x; i < map[y].length; i++) {
        if (map[y][i] == 1) {
          endRow = false;
          break;
        }
      }

      // Draw spheres in line of tunnel (ignore the end row)
      if(y == tunnelY)
        endRow = false;

      if (
        (y != 0 && y != map.length) &&
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

}


function onKeyDown(event)
{
    switch(event.keyCode)
    {

      case 38:
          console.log("foward");
          if(rotation == 0){
            pacman1.position.z -= delta ;
            camera.position.z -= delta ;
          }else if(rotation == 1){
            pacman1.position.x -= delta;
            camera.position.x -= delta;
          }else if(rotation == 2){
            pacman1.position.z += delta ;
            camera.position.z += delta ;
          }else if(rotation == 3){
            pacman1.position.x += delta ;
            camera.position.x += delta ;
          }
          break;

        case 40:
            console.log("back");
            switch (rotation) {
              case 0:
                rotation = 2;
                break;

              case 1:
                rotation = 3;
                break;

              case 2:
                rotation = 0;
                break;

              case 3:
                rotation = 1;
                break;

            }
            break;



        case 37:
            console.log("left");
            switch (rotation) {
              case 0:
                rotation = 1;
                break;

              case 1:
                rotation = 2;
                break;

              case 2:
                rotation = 3;
                break;

              case 3:
                rotation = 0;
                break;

            }
            break;

        case 39:
            console.log("right");
            switch (rotation) {
              case 0:
                rotation = 3;
                break;

              case 1:
                rotation = 0;
                break;

              case 2:
                rotation = 1;
                break;

              case 3:
                rotation = 2;
                break;

            }
            break;
    }

}

function drawpacman(){
  pacman1.position.set(4, 0, 20);
  scene.add( pacman1 );
}

function drawSquare(color, x, y){
  var size = 8;

  var geometry = new THREE.CubeGeometry( size, size, size );
  var material = new THREE.MeshBasicMaterial( {color: color} );
  var sphere = new THREE.Mesh( geometry, material );
  sphere.position.set(x, 0, y);
  group.add( sphere );

  // var geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );
  var edges = new THREE.EdgesGeometry( geometry );
  var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
  line.position.set(x, 0, y);
  group.add( line );
}

function drawSphere(i, j){
  var geometry = new THREE.SphereGeometry( 1, 10, 10 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  var sphere = new THREE.Mesh( geometry, material );
  sphere.position.set(i, 0, j);
  scene.add( sphere );
}

function createGhosts(){
     var diff = 120;
    for(var i = 0; i < 4; i++) {
        material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
        geometry = new THREE.CubeGeometry(4, 6, 4);
        ghost = new THREE.Mesh(geometry, material)
        ghost.position.x = arr2Coord(13+i);
        ghost.position.y = 0;
        ghost.position.z = arr2Coord(14);
        ghost.castShadow = true;
        ghost.receiveShadow = true;
        ghost.rand = null;
        ghosts.push(ghost);
        scene.add(ghost);
        //console.log(map[(ghost.position.x*delta-diff)+(delta/2)][(ghost.position.z*delta-diff)+(delta/2)]);
        // console.log((ghost.position.z-diff + (minX * -1))/delta);
    }
}

function moveGhosts(){
  var rand = null;
  for(ghost of ghosts){
    var x = ((ghost.position.x+diff)/delta)-.5;
    var y = ((ghost.position.z+diff)/delta)-.5;
    // if(y == map.length - 2 || x == map[y].length - 2)
    //   continue;
    if (ghost.rand == null) {
      ghost.rand = random(1,4);
    } else if(ghost.rand == 1){
      rand = random(1,3);
      if(rand == 1){
        if(map[y][parseInt(x)+1] == 0 && map[y][parseInt(x)+2] == 0){
          ghost.position.x = arr2Coord(parseInt(x)+1);
          ghost.rand = 3;
        }
      } else if (rand == 2){
        if(map[y][parseInt(x)-1] == 0){
          ghost.position.x = arr2Coord(parseInt(x)-1);
          ghost.rand = 4;
        }
      } else if (rand == 3){
        if(map[parseInt(y)+1][x] == 0 && map[parseInt(y)+2][x] == 0){
          ghost.position.z = arr2Coord(parseInt(y)+1);
        } else {
          ghost.rand = null;
        }
      }
    } else if(ghost.rand == 2){
      rand = random(1,3);
      if(rand == 1){
        if(map[y][parseInt(x)+1] == 0 && map[y][parseInt(x)+2] == 0){
          ghost.position.x = arr2Coord(parseInt(x)+1);
          ghost.rand = 3;
        }
      } else if (rand == 2){
        if(map[y][parseInt(x)-1] == 0){
          ghost.position.x = arr2Coord(parseInt(x)-1);
          ghost.rand = 4;
        }
      } else if (rand == 3){
        if(map[parseInt(y)-1][x] == 0){
          ghost.position.z = arr2Coord(parseInt(y)-1);
        } else {
          ghost.rand = null;
        }
      }
    } else if(ghost.rand == 3){
      rand = random(1,3);
      if(rand == 1){
        if(map[parseInt(y)+1][x] == 0 && map[parseInt(y)+2][x] == 0){
          ghost.position.z = arr2Coord(parseInt(y)+1);
          ghost.rand = 1;
        }
      } else if (rand == 2){
        if(map[parseInt(y)-1][x] == 0){
          ghost.position.z = arr2Coord(parseInt(y)-1);
          ghost.rand = 2;
        }
      } else if (rand == 3){
        if(map[y][parseInt(x)+1] == 0 && map[y][parseInt(x)+2] == 0){
          ghost.position.x = arr2Coord(parseInt(x)+1);
        } else {
          ghost.rand = null;
        }
      }
    } else if(ghost.rand == 4){
      rand = random(1,3);
      if(rand == 1){
        if(map[parseInt(y)+1][x] == 0 && map[parseInt(y)+2][x] == 0){
          ghost.position.z = arr2Coord(parseInt(y)+1);
          ghost.rand = 1;
        }
      } else if (rand == 2){
        if(map[parseInt(y)-1][x] == 0){
          ghost.position.z = arr2Coord(parseInt(y)-1);
          ghost.rand = 2;
        }
      } else if (rand == 3){
        if(map[y][parseInt(x)-1] == 0){
          ghost.position.x = arr2Coord(parseInt(x)-1);
        } else {
          ghost.rand = null;
        }
      }
    }
  }
}

function arr2Coord(n){
  return ((n)*delta-diff)+(delta/2);
}

function random(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
