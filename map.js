/* ==========================================================================
   CYBER-ATTACK SIMULATION MAP ENGINE - map.js
   ========================================================================== */

(function () {
  const canvas = document.getElementById("attackMapCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const parent = canvas.parentElement;

  // ── DATA STRUCTURES ──

  // Relative polygons mapping continent outlines on a 0.0 - 1.0 scale
  const CONTINENT_POLYGONS = [
    // North America
    [
      [0.08, 0.16], [0.22, 0.16], [0.35, 0.22], [0.38, 0.26], [0.32, 0.40],
      [0.28, 0.46], [0.22, 0.48], [0.15, 0.36], [0.08, 0.28], [0.06, 0.22]
    ],
    // Greenland
    [
      [0.32, 0.08], [0.38, 0.08], [0.41, 0.14], [0.36, 0.16], [0.32, 0.13]
    ],
    // South America
    [
      [0.26, 0.48], [0.32, 0.48], [0.38, 0.58], [0.40, 0.64], [0.36, 0.82],
      [0.32, 0.86], [0.29, 0.84], [0.28, 0.70], [0.25, 0.58], [0.24, 0.52]
    ],
    // Europe
    [
      [0.44, 0.18], [0.55, 0.18], [0.59, 0.24], [0.58, 0.32], [0.54, 0.38],
      [0.46, 0.38], [0.43, 0.32], [0.42, 0.24]
    ],
    // Africa
    [
      [0.43, 0.42], [0.50, 0.40], [0.59, 0.46], [0.59, 0.54], [0.55, 0.76],
      [0.50, 0.80], [0.47, 0.78], [0.46, 0.62], [0.41, 0.52], [0.41, 0.46]
    ],
    // Asia / Russia
    [
      [0.55, 0.14], [0.86, 0.10], [0.93, 0.18], [0.91, 0.36], [0.84, 0.46],
      [0.78, 0.52], [0.72, 0.52], [0.65, 0.44], [0.58, 0.36], [0.55, 0.24]
    ],
    // Southeast Asia Islands / Indonesia
    [
      [0.76, 0.56], [0.84, 0.58], [0.86, 0.64], [0.80, 0.66], [0.74, 0.62]
    ],
    // Australia
    [
      [0.80, 0.70], [0.88, 0.70], [0.90, 0.78], [0.86, 0.82], [0.80, 0.80], [0.78, 0.74]
    ]
  ];

  // Neon-highlighted attack source/target nodes
  const MAP_NODES = [
    { name: "Silicon Valley", x: 0.14, y: 0.34 },
    { name: "New York", x: 0.28, y: 0.36 },
    { name: "São Paulo", x: 0.34, y: 0.68 },
    { name: "London", x: 0.45, y: 0.28 },
    { name: "Frankfurt", x: 0.50, y: 0.30 },
    { name: "Moscow", x: 0.61, y: 0.24 },
    { name: "Cape Town", x: 0.52, y: 0.76 },
    { name: "Dubai", x: 0.59, y: 0.44 },
    { name: "Bangalore", x: 0.70, y: 0.52 },
    { name: "Singapore", x: 0.78, y: 0.60 },
    { name: "Beijing", x: 0.79, y: 0.34 },
    { name: "Tokyo", x: 0.86, y: 0.36 },
    { name: "Sydney", x: 0.87, y: 0.76 }
  ];

  const COLOR_PALETTE = [
    "#00f0ff", // Cyan
    "#ff3366", // Red
    "#ff6c00", // Orange
    "#a100ff", // Purple
    "#39ff14"  // Neon Green
  ];

  // ── APP ANIMATION STATE ──
  let width = 0;
  let height = 0;
  let dpr = 1;

  let dottedWorldPoints = []; // Precomputed active map grid dots
  let activeAttacks = [];     // Active laser flight trajectories
  let activeExplosions = [];  // Impact shockwaves
  let activeSparks = [];      // Spark dynamic particles
  let totalAttacksTracked = 0;

  // ── UTILITIES: POINT IN POLYGON ──
  function isPointInPolygon(x, y, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];

      const intersect = ((yi > y) !== (yj > y)) &&
        (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);

      if (intersect) inside = !inside;
    }
    return inside;
  }

  // Precompute map dots to keep render loop fast and lightweight (60fps optimized)
  function precomputeMapDots() {
    dottedWorldPoints = [];
    // Adjust grid spacing based on canvas width (approx. 8px grid)
    const spacing = 8;
    const cols = Math.floor(width / spacing);
    const rows = Math.floor(height / spacing);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const rx = (c * spacing) / width;
        const ry = (r * spacing) / height;

        // Check if coordinate point lies inside any defined continent polygon
        let isInContinent = false;
        for (let i = 0; i < CONTINENT_POLYGONS.length; i++) {
          if (isPointInPolygon(rx, ry, CONTINENT_POLYGONS[i])) {
            isInContinent = true;
            break;
          }
        }

        if (isInContinent) {
          dottedWorldPoints.push({ x: rx, y: ry });
        }
      }
    }
  }

  // ── RESIZE HANDLER ──
  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1;
    width = parent.clientWidth;
    height = parent.clientHeight || 300;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(dpr, dpr);

    // Precalculate background grid after dimension updates
    precomputeMapDots();
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas(); // Initial call

  // ── CLASS REPRESENTATIONS ──

  class AttackTrajectory {
    constructor(source, target) {
      this.source = source;
      this.target = target;
      this.t = 0; // Flight progress (0.0 to 1.0)
      this.speed = 0.008 + Math.random() * 0.009; // Speed factor
      this.color = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
      this.arcHeight = 0.15 + Math.random() * 0.2; // parabolic height multiplier
      this.trail = [];
      this.maxTrail = 18;
    }

    update() {
      this.t += this.speed;

      // Source and Target absolute coordinates
      const x1 = this.source.x * width;
      const y1 = this.source.y * height;
      const x2 = this.target.x * width;
      const y2 = this.target.y * height;

      // Middle control point pull for Bezier flight arc
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      
      const cx = mx;
      const cy = my - distance * this.arcHeight;

      // Standard Quadratic Bezier equation
      const oneMinusT = 1 - this.t;
      const px = oneMinusT * oneMinusT * x1 + 2 * oneMinusT * this.t * cx + this.t * this.t * x2;
      const py = oneMinusT * oneMinusT * y1 + 2 * oneMinusT * this.t * cy + this.t * this.t * y2;

      this.trail.push({ x: px, y: py });
      if (this.trail.length > this.maxTrail) {
        this.trail.shift();
      }

      // Reached destination trigger impact shockwave
      if (this.t >= 1) {
        this.triggerImpact();
        return false; // Marks for deletion
      }
      return true;
    }

    draw() {
      if (this.trail.length < 2) return;

      // Draw Laser Arc Trail
      ctx.lineWidth = 1.8;
      for (let i = 1; i < this.trail.length; i++) {
        const p1 = this.trail[i - 1];
        const p2 = this.trail[i];
        const opacity = i / this.trail.length;

        ctx.strokeStyle = this.color;
        ctx.globalAlpha = opacity * 0.7;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw Glowing Missile Projectile Head
      const head = this.trail[this.trail.length - 1];
      ctx.globalAlpha = 1;
      
      // Outer glow styling
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Reset Shadow
      ctx.shadowBlur = 0;
    }

    triggerImpact() {
      const tx = this.target.x * width;
      const ty = this.target.y * height;

      // Spawns 2 concentric rings
      activeExplosions.push(new ImpactExplosion(tx, ty, this.color));

      // Spawns 12-18 burst sparks
      const sparkCount = 12 + Math.floor(Math.random() * 8);
      for (let i = 0; i < sparkCount; i++) {
        activeSparks.push(new SparkParticle(tx, ty, this.color));
      }

      // Increment dashboard attack event counter
      totalAttacksTracked++;
      const counterEl = document.getElementById("map-events-count");
      if (counterEl) {
        counterEl.innerText = `ATTACKS DETECTED: ${totalAttacksTracked}`;
      }
    }
  }

  class ImpactExplosion {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = 2;
      this.maxRadius = 24 + Math.random() * 12;
      this.opacity = 1.0;
      this.speed = 1.2 + Math.random() * 1.5;
    }

    update() {
      this.radius += this.speed;
      this.opacity = 1 - (this.radius / this.maxRadius);
      return this.opacity > 0;
    }

    draw() {
      ctx.globalAlpha = this.opacity * 0.8;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.5;
      
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.shadowBlur = 0;
    }
  }

  class SparkParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 3.0;
      
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 1.0;
      this.decay = 0.02 + Math.random() * 0.03;
      this.size = 1 + Math.random() * 1.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Apply slight air friction deceleration
      this.vx *= 0.98;
      this.vy *= 0.98;
      
      this.life -= this.decay;
      return this.life > 0;
    }

    draw() {
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ── TRIGGER AN ATTACK EVENT ──
  function spawnRandomAttack() {
    if (MAP_NODES.length < 2) return;

    // Pick 2 separate nodes
    const sourceIdx = Math.floor(Math.random() * MAP_NODES.length);
    let targetIdx = Math.floor(Math.random() * MAP_NODES.length);

    while (targetIdx === sourceIdx) {
      targetIdx = Math.floor(Math.random() * MAP_NODES.length);
    }

    const source = MAP_NODES[sourceIdx];
    const target = MAP_NODES[targetIdx];

    activeAttacks.push(new AttackTrajectory(source, target));
  }

  // Expose endpoint globally to integrate with app.js campaign generator
  window.triggerMapAttack = function () {
    const burstCount = 2 + Math.floor(Math.random() * 3); // 2 to 4 attacks in parallel
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        spawnRandomAttack();
      }, i * 350); // Slight stagger offset looks more realistic
    }
  };

  // ── INIT ATTACK EVENT TRIGGER ──
  // Spawn an initial baseline attack 2 seconds after initialization
  setTimeout(() => {
    window.triggerMapAttack();
  }, 2000);

  // ── RENDER CORE ANIMATION LOOP ──
  function drawMapFrame() {
    // Clear canvas
    ctx.fillStyle = "#02040a";
    ctx.fillRect(0, 0, width, height);

    // 1. Draw Subtle Faint Background Grid Lines
    ctx.strokeStyle = "rgba(0, 240, 255, 0.03)";
    ctx.lineWidth = 1;
    
    // Draw vertical grid bands
    const gridSpacing = 40;
    for (let x = 0; x < width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    // Draw horizontal grid bands
    for (let y = 0; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Draw Precomputed Dotted World Continent Map
    ctx.fillStyle = "rgba(0, 240, 255, 0.07)";
    for (let i = 0; i < dottedWorldPoints.length; i++) {
      const pt = dottedWorldPoints[i];
      const px = pt.x * width;
      const py = pt.y * height;
      
      // Draw grid points
      ctx.fillRect(px, py, 1.5, 1.5);
    }

    // 3. Draw Geographic Nodes & Pulsing Targets
    const timeTick = Date.now() / 1000;
    MAP_NODES.forEach((node) => {
      const nx = node.x * width;
      const ny = node.y * height;

      // Base Pulsing Concentric Expanding Waves
      const pulseSpeed = 1.5;
      const pulseWave = (timeTick * pulseSpeed) % 1.0;
      
      ctx.strokeStyle = "rgba(57, 255, 20, " + (1 - pulseWave) * 0.4 + ")";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(nx, ny, 3 + pulseWave * 16, 0, Math.PI * 2);
      ctx.stroke();

      // Node Static Core Dot
      ctx.fillStyle = "#39ff14";
      ctx.shadowColor = "#39ff14";
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(nx, ny, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset

      // Draw Node Labels (faint, small fonts)
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.font = "8px 'Share Tech Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(node.name.toUpperCase(), nx, ny - 8);
    });

    // 4. Update and Render Projectile Arcs
    activeAttacks = activeAttacks.filter((attack) => {
      const isAlive = attack.update();
      attack.draw();
      return isAlive;
    });

    // 5. Update and Render Explosions
    activeExplosions = activeExplosions.filter((explosion) => {
      const isAlive = explosion.update();
      explosion.draw();
      return isAlive;
    });

    // 6. Update and Render Spark Particles
    activeSparks = activeSparks.filter((spark) => {
      const isAlive = spark.update();
      spark.draw();
      return isAlive;
    });

    // Request next frame
    requestAnimationFrame(drawMapFrame);
  }

  // Start Animation Render Loop
  requestAnimationFrame(drawMapFrame);
})();
