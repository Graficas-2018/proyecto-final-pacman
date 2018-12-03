function pacmanAnimations(){
    // position animation
    // if(pacman1.xLeftAnimation.running || pacman1.xRightAnimation.running || pacman1.zFowardAnimation.running || pacman1.zBackAnimation.running)
    //   return;

    pacman1.xLeftAnimation = new KF.KeyFrameAnimator;
    pacman1.xLeftAnimation.init({
        interps:
            [
              {
                keys:[.2, .4, .6, .8, 1],
                values:[
                  { x: pacman1.position.x + 0},
                  { x: pacman1.position.x + 2},
                  { x: pacman1.position.x + 4},
                  { x: pacman1.position.x + 6},
                  { x: pacman1.position.x + 8}
                ],
                target:pacman1.position
              },
            ],
        loop: false,
        duration:500,
        // easing:TWEEN.Easing.Bounce.InOut,
    });

    pacman1.zFowardAnimation = new KF.KeyFrameAnimator;
    pacman1.zFowardAnimation.init({
        interps:
            [
              {
                keys:[.2, .4, .6, .8, 1],
                values:[
                  { z: pacman1.position.z - 0},
                  { z: pacman1.position.z - 2},
                  { z: pacman1.position.z - 4},
                  { z: pacman1.position.z - 6},
                  { z: pacman1.position.z - 8}
                ],
                target:pacman1.position
              },
            ],
        loop: false,
        duration:500,
        // easing:TWEEN.Easing.Bounce.InOut,
    });

    pacman1.xRightAnimation = new KF.KeyFrameAnimator;
    pacman1.xRightAnimation.init({
        interps:
            [
              {
                keys:[.2, .4, .6, .8, 1],
                values:[
                  { x: pacman1.position.x - 0},
                  { x: pacman1.position.x - 2},
                  { x: pacman1.position.x - 4},
                  { x: pacman1.position.x - 6},
                  { x: pacman1.position.x - 8}
                ],
                target:pacman1.position
              },
            ],
        loop: false,
        duration:500,
        // easing:TWEEN.Easing.Bounce.InOut,
    });

    pacman1.zBackAnimation = new KF.KeyFrameAnimator;
    pacman1.zBackAnimation.init({
        interps:
            [
              {
                keys:[.2, .4, .6, .8, 1],
                values:[
                  { z: pacman1.position.z + 0},
                  { z: pacman1.position.z + 2},
                  { z: pacman1.position.z + 4},
                  { z: pacman1.position.z + 6},
                  { z: pacman1.position.z + 8}
                ],
                target:pacman1.position
              },
            ],
        loop: false,
        duration:500,
        // easing:TWEEN.Easing.Bounce.InOut,
    });


}

function cameraAnimations(){
    // position animation
    // if(pacman1.xLeftAnimation.running || pacman1.xRightAnimation.running || pacman1.zFowardAnimation.running || pacman1.zBackAnimation.running)
    //   return;

    var angle, x, z;
    if(rotation == 0){
      angle = 0;
      x = -60;
      z = 0;
    }
    else if(rotation == 1){
      angle = 270;
      x = 0;
      z = 60;
    }
    else if(rotation == 2){
      angle = 180;
      x = 60;
      z = 0;
    }
    else if(rotation == 3){
      angle = 90;
      x = 0;
      z = -60;
    }


    camera.xLeftAnimation = new KF.KeyFrameAnimator;
    camera.xLeftAnimation.init({
        interps:
            [
              {
                keys:[.2, .4, .6, .8, 1],
                values:[
                  { x: camera.position.x + 0},
                  { x: camera.position.x + 2},
                  { x: camera.position.x + 4},
                  { x: camera.position.x + 6},
                  { x: camera.position.x + 8}
                ],
                target:camera.position
              },
            ],
        loop: false,
        duration:500,
        // easing:TWEEN.Easing.Bounce.InOut,
    });

    camera.zFowardAnimation = new KF.KeyFrameAnimator;
    camera.zFowardAnimation.init({
        interps:
            [
              {
                keys:[.2, .4, .6, .8, 1],
                values:[
                  { z: camera.position.z - 0},
                  { z: camera.position.z - 2},
                  { z: camera.position.z - 4},
                  { z: camera.position.z - 6},
                  { z: camera.position.z - 8}
                ],
                target:camera.position
              },
            ],
        loop: false,
        duration:500,
        // easing:TWEEN.Easing.Bounce.InOut,
    });

    camera.xRightAnimation = new KF.KeyFrameAnimator;
    camera.xRightAnimation.init({
        interps:
            [
              {
                keys:[.2, .4, .6, .8, 1],
                values:[
                  { x: camera.position.x - 0},
                  { x: camera.position.x - 2},
                  { x: camera.position.x - 4},
                  { x: camera.position.x - 6},
                  { x: camera.position.x - 8}
                ],
                target:camera.position
              },
            ],
        loop: false,
        duration:500,
        // easing:TWEEN.Easing.Bounce.InOut,
    });

    camera.zBackAnimation = new KF.KeyFrameAnimator;
    camera.zBackAnimation.init({
        interps:
            [
              {
                keys:[.2, .4, .6, .8, 1],
                values:[
                  { z: camera.position.z + 0},
                  { z: camera.position.z + 2},
                  { z: camera.position.z + 4},
                  { z: camera.position.z + 6},
                  { z: camera.position.z + 8}
                ],
                target:camera.position
              },
            ],
        loop: false,
        duration:500,
        // easing:TWEEN.Easing.Bounce.InOut,
    });

    camera.rightTurn = new KF.KeyFrameAnimator;
    camera.rightTurn.init({
        interps:
            [
              {
                keys:[.2, .4, .6, .8, 1],
                values:[
                  { x: -(pacman1.position.x + 60) * Math.sin((angle + 18 * (Math.PI / 180))),
                    z: (pacman1.position.z + 60) * Math.cos((angle + 18 * (Math.PI / 180)))},

                  { x: -(pacman1.position.x + 60) * Math.sin((angle + 36 * (Math.PI / 180))),
                    z: (pacman1.position.z + 60) * Math.cos((angle + 36 * (Math.PI / 180)))},

                  { x: -(pacman1.position.x + 60) * Math.sin((angle + 54 * (Math.PI / 180))),
                    z: (pacman1.position.z + 60) * Math.cos((angle + 54 * (Math.PI / 180)))},

                  { x: -(pacman1.position.x + 60) * Math.sin((angle + 72 * (Math.PI / 180))),
                    z: (pacman1.position.z + 60) * Math.cos((angle + 72 * (Math.PI / 180)))},

                  { x: pacman1.position.x + x,
                    z: pacman1.position.z + z}
                  // { x: camera.position.x + Math.PI/8,  z: camera.position.x + Math.PI/z},
                  // { x: camera.position.x + Math.PI/6,  z: camera.position.x + Math.PI/z},
                  // { x: camera.position.x + Math.PI/4,  z: camera.position.x + Math.PI/z},
                  // { x: camera.position.x + Math.PI/2,  z: camera.position.x + Math.PI/z}
                ],
                target:camera.position
              },
            ],
        loop: false,
        duration:1000,
        // easing:TWEEN.Easing.Bounce.InOut,
    });
}

function onKeyDown(event){
  if(pacman1.zFowardAnimation.running)
    return;
  if(pacman1.zBackAnimation.running)
    return;
  if(pacman1.xLeftAnimation.running)
    return;
  if(pacman1.xRightAnimation.running)
    return;
  // console.log(pacman1.xLeftAnimation.running);
  var pass = true;
  var pos;
  if(debug)
    switch(event.keyCode){
    case 38:
        console.log("foward");
        pacman1.position.z -= delta ;
        break;

    case 40:
        console.log("back");
        pacman1.position.z += delta ;
        break;

    case 37:
        console.log("left");
        pacman1.position.x -= delta ;
        break;

    case 39:
        console.log("right");
        pacman1.position.x += delta ;
        break;
  }
  else
    switch(event.keyCode){
      case 38:
          if(rotation == 0){
            // pacman1.position.z -= delta ;
            // if(!pacman1.zFowardAnimation.running)
            for (var i in walls) {
              pos = new THREE.Vector3(walls[i].position.x,walls[i].position.y,walls[i].position.z+8);
              if(pacmanBBox.containsPoint(pos))
                pass = false;
            }

            if(pass){
              pacman1.zFowardAnimation.start();
              pacman1.zFowardAnimation.running = true;
              // camera.zFowardAnimation.start();
              // camera.position.z -= delta ;
            }

          }else if(rotation == 1){
            // pacman1.position.x -= delta;
            // if(!pacman1.xRightAnimation.running)
            for (var i in walls) {
              pos = new THREE.Vector3(walls[i].position.x+8,walls[i].position.y,walls[i].position.z);
              if(pacmanBBox.containsPoint(pos))
                pass = false;
            }

            if(pass){
              pacman1.xRightAnimation.start();
              pacman1.xRightAnimation.running = true;
              // camera.xRightAnimation.start();
              // camera.position.x -= delta;
            }
          }else if(rotation == 2){
            // pacman1.position.z += delta ;
            // if(!pacman1.zBackAnimation.running)
            for (var i in walls) {
              pos = new THREE.Vector3(walls[i].position.x,walls[i].position.y,walls[i].position.z-8);
              if(pacmanBBox.containsPoint(pos))
                pass = false;
            }

            if(pass){
              pacman1.zBackAnimation.start();
              pacman1.zBackAnimation.running = true;
              // camera.zBackAnimation.start();
              // camera.position.z += delta ;
            }
          }else if(rotation == 3){
            for (var i in walls) {
              pos = new THREE.Vector3(walls[i].position.x-8,walls[i].position.y,walls[i].position.z);
              if(pacmanBBox.containsPoint(pos))
                pass = false;
            }
            // if(!pacman1.xLeftAnimation.running)
            if(pass){
              pacman1.xLeftAnimation.start();
              pacman1.xLeftAnimation.running = true;

              // camera.xLeftAnimation.start();
              // camera.position.x += delta ;
            }
          }
          break;

        case 40:
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
            camera.rightTurn.start();

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
