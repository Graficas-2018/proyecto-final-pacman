var scene = null,
camera = null,
root = null,
group = null,
map = null,
delta = 8,
material = null,
geometry = null,
ghost = null,
ghosts = [],
spheres = [],
walls = [],
pacmanBBox = null,
ghostsBBox = [];

var minX = null,
minY = null,
maxX = null,
maxY = null,
diff = 120;

var rotation = 0;

var currentTime = Date.now();

var debug = false;

var score = 0,
lives = 4;
