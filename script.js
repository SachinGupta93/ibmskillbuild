  // Enhanced weather effects and animations
  const canvas = document.getElementById('weather-canvas');
  const ctx = canvas.getContext('2d');
  let animationId;
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // State to Cities mapping
  const cityAliases = {
    "Bangalore": "Bengaluru",
    "Mysore": "Mysuru",
    "Mangalore": "Mangaluru",
    "Hubli-Dharwad": "Hubballi",
    "Gurgaon": "Gurugram",
    "Trivandrum": "Thiruvananthapuram",
    "Calcutta": "Kolkata",
    "Bombay": "Mumbai",
    "Baroda": "Vadodara",
    "Allahabad": "Prayagraj"
  };
  const stateCities = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kadapa", "Anantapur", "Kakinada"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tezpur", "Bomdila", "Ziro", "Aalo", "Tezu", "Khonsa", "Seppa"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Diphu", "Goalpara"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh", "Ambikapur", "Mahasamund"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Cuncolim", "Quepem"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari"],
    "Haryana": ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Kullu", "Hamirpur", "Una", "Bilaspur", "Chamba", "Kinnaur"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli-Dharwad", "Mangalore", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga", "Tumkur"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Malappuram", "Kannur", "Kasaragod"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Sangli", "Malegaon"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Ukhrul", "Senapati", "Tamenglong", "Jiribam", "Moreh"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara", "Ampati", "Resubelpara", "Mawkyrwat", "Williamnagar", "Nongstoin"],
    "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Mamit", "Hnahthial", "Khawzawl"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Kiphire", "Longleng", "Peren"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore", "Baripada", "Bhadrak", "Jharsuguda"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Firozpur", "Batala", "Pathankot", "Moga"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar"],
    "Sikkim": ["Gangtok", "Namchi", "Geyzing", "Mangan", "Singtam", "Jorethang", "Rangpo", "Pakyong", "Ravangla", "Yuksom"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Khowai", "Ambassa", "Teliamura", "Sabroom", "Kamalpur"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Aligarh", "Moradabad"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Kotdwar", "Pithoragarh", "Almora"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Bardhaman", "Hugli", "Jalpaiguri", "Kharagpur"]
  };
  
  // Weather codes mapping
  const weatherCodes = {
    0: "Sunny", 1: "Mainly sunny", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing rime fog",
    51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
    56: "Light freezing drizzle", 57: "Dense freezing drizzle",
    61: "Light rain", 63: "Moderate rain", 65: "Heavy rain",
    66: "Light freezing rain", 67: "Heavy freezing rain",
    71: "Light snow", 73: "Moderate snow", 75: "Heavy snow",
    77: "Snow grains", 80: "Light rain showers", 81: "Moderate rain showers",
    82: "Violent rain showers", 85: "Light snow showers", 86: "Heavy snow showers",
    95: "Thunderstorm", 96: "Thunderstorm with light hail", 99: "Thunderstorm with heavy hail"
  };

  const icons = {
    "Sunny": "https://img.icons8.com/color/96/sun.png",
    "Mainly sunny": "https://img.icons8.com/color/96/sun.png",
    "Partly cloudy": "https://img.icons8.com/color/96/partly-cloudy-day.png",
    "Overcast": "https://img.icons8.com/color/96/cloud.png",
    "Fog": "https://img.icons8.com/color/96/fog.png",
    "Depositing rime fog": "https://img.icons8.com/color/96/fog.png",
    "Light drizzle": "https://img.icons8.com/color/96/rain.png",
    "Moderate drizzle": "https://img.icons8.com/color/96/rain.png",
    "Dense drizzle": "https://img.icons8.com/color/96/rain.png",
    "Light freezing drizzle": "https://img.icons8.com/color/96/rain.png",
    "Dense freezing drizzle": "https://img.icons8.com/color/96/rain.png",
    "Light rain": "https://img.icons8.com/color/96/rain.png",
    "Moderate rain": "https://img.icons8.com/color/96/rain.png",
    "Heavy rain": "https://img.icons8.com/color/96/heavy-rain.png",
    "Light freezing rain": "https://img.icons8.com/color/96/rain.png",
    "Heavy freezing rain": "https://img.icons8.com/color/96/heavy-rain.png",
    "Light rain showers": "https://img.icons8.com/color/96/rain.png",
    "Moderate rain showers": "https://img.icons8.com/color/96/rain.png",
    "Violent rain showers": "https://img.icons8.com/color/96/heavy-rain.png",
    "Light snow": "https://img.icons8.com/color/96/snow.png",
    "Moderate snow": "https://img.icons8.com/color/96/snow.png",
    "Heavy snow": "https://img.icons8.com/color/96/snow-storm.png",
    "Snow grains": "https://img.icons8.com/color/96/snow.png",
    "Light snow showers": "https://img.icons8.com/color/96/snow.png",
    "Heavy snow showers": "https://img.icons8.com/color/96/snow-storm.png",
    "Thunderstorm": "https://img.icons8.com/color/96/storm.png",
    "Thunderstorm with light hail": "https://img.icons8.com/color/96/storm.png",
    "Thunderstorm with heavy hail": "https://img.icons8.com/color/96/storm.png"
  };

  // Animation particles
  let particles = [];
  let clouds = [];
  let stars = [];
  let currentWeather = 'clear';
  let isNight = false;
  
  // Initialize particles based on weather
  function initParticles(weather) {
    particles = [];
    const isRain = weather.includes('rain');
    const isDrizzle = weather.includes('drizzle');
    const isSnow = weather.includes('snow');
    const isThunder = weather.includes('thunder');

    let particleCount = 0;
    if (isRain) particleCount = 400;
    else if (isDrizzle) particleCount = 180;
    else if (isSnow) particleCount = 300;
    else if (isThunder) particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
      const speed = isRain ? 12 + Math.random() * 8
                  : isDrizzle ? 7 + Math.random() * 4
                  : isSnow ? 3 + Math.random() * 3
                  : isThunder ? 15 + Math.random() * 10
                  : 5;
      const size = isRain ? 2 + Math.random() * 3
                 : isDrizzle ? 1 + Math.random() * 2
                 : isSnow ? 4 + Math.random() * 6
                 : 2;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed,
        size,
        opacity: 0.5 + Math.random() * 0.5,
        angle: (isRain || isDrizzle) ? Math.PI / 5 : 0,
        windOffset: Math.random() * Math.PI * 2
      });
    }
  }
  
  // Initialize clouds
  function initClouds(weatherCondition = '') {
    clouds = [];
    const width = canvas.width;
    const height = canvas.height;
    
    // Adjust cloud count based on weather condition
    let baseCount = width > 1400 ? 18 : width > 900 ? 14 : width > 600 ? 10 : 8;
    
    if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
      baseCount = Math.floor(baseCount * 0.3); // Very few clouds for sunny weather
    } else if (weatherCondition.includes('partly')) {
      baseCount = Math.floor(baseCount * 0.6); // Some clouds for partly cloudy
    } else if (weatherCondition.includes('overcast')) {
      baseCount = Math.floor(baseCount * 1.5); // More clouds for overcast
    }
    
    for (let i = 0; i < baseCount; i++) {
      const layer = i % 3; // 0: far, 1: mid, 2: near
      const layerSpeed = layer === 0 ? 0.15 : layer === 1 ? 0.35 : 0.65;
      const layerSize = layer === 0 ? 60 : layer === 1 ? 95 : 140;
      const sizeJitter = (Math.random() - 0.5) * (layerSize * 0.6);
      
      // Adjust opacity based on weather
      let baseOpacity = 0.18;
      if (weatherCondition.includes('overcast')) {
        baseOpacity = 0.4; // Denser clouds for overcast
      } else if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
        baseOpacity = 0.1; // Lighter clouds for sunny weather
      }
      
      clouds.push({
        x: Math.random() * (width + 300) - 150,
        y: Math.random() * (height * (layer === 2 ? 0.55 : 0.45)),
        size: Math.max(40, layerSize + sizeJitter),
        opacity: baseOpacity + Math.random() * (layer === 2 ? 0.55 : 0.4),
        speed: layerSpeed + Math.random() * 0.4,
        layer
      });
    }
  }
  
  // Initialize stars
  function initStars() {
    stars = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7,
        size: 0.5 + Math.random() * 2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.015 + Math.random() * 0.025
      });
    }
  }
  
  initClouds('clear');
  initStars();
  
  // Enhanced sun drawing with dynamic rays and glow
  function drawSun() {
    const time = Date.now() * 0.0008;
    const centerX = canvas.width - 200;
    const centerY = 150;
    
    // Multiple glow layers for intense effect
    for (let i = 0; i < 3; i++) {
      const glowSize = 120 + i * 40;
      const glowOpacity = 0.6 - i * 0.15;
      const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
      glowGradient.addColorStop(0, `rgba(255, 220, 100, ${glowOpacity})`);
      glowGradient.addColorStop(0.4, `rgba(255, 200, 50, ${glowOpacity * 0.6})`);
      glowGradient.addColorStop(1, 'rgba(255, 180, 0, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Animated sun rays
    ctx.strokeStyle = 'rgba(255, 220, 100, 0.8)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    for (let i = 0; i < 20; i++) {
      const angle = (i * Math.PI * 2) / 20 + time;
      const rayLength = 40 + Math.sin(time * 3 + i) * 15;
      const startRadius = 50;
      
      ctx.beginPath();
      ctx.moveTo(
        centerX + Math.cos(angle) * startRadius,
        centerY + Math.sin(angle) * startRadius
      );
      ctx.lineTo(
        centerX + Math.cos(angle) * (startRadius + rayLength),
        centerY + Math.sin(angle) * (startRadius + rayLength)
      );
      ctx.stroke();
    }
    
    // Sun core with pulsing effect
    const pulseSize = 45 + Math.sin(time * 2) * 5;
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize);
    sunGradient.addColorStop(0, '#FFFF80');
    sunGradient.addColorStop(0.7, '#FFD700');
    sunGradient.addColorStop(1, '#FF8C00');
    
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Enhanced cloud drawing
  function drawClouds() {
    const time = Date.now() * 0.0003;
    
    clouds.forEach((cloud, index) => {
      ctx.save();
      ctx.globalAlpha = cloud.opacity * (0.85 + Math.sin(time + index) * 0.15);
      
      // Cloud gradient with weather-based coloring
      const gradient = ctx.createRadialGradient(
        cloud.x, cloud.y, 0,
        cloud.x, cloud.y, cloud.size
      );
      
      if (currentWeather.includes('thunder') || currentWeather.includes('storm')) {
        gradient.addColorStop(0, 'rgba(70, 70, 85, 0.95)');
        gradient.addColorStop(0.5, 'rgba(50, 50, 65, 0.75)');
        gradient.addColorStop(1, 'rgba(30, 30, 45, 0.35)');
      } else if (currentWeather.includes('overcast')) {
        // Darker, grayer clouds for overcast conditions
        gradient.addColorStop(0, 'rgba(180, 180, 190, 0.9)');
        gradient.addColorStop(0.5, 'rgba(140, 140, 150, 0.7)');
        gradient.addColorStop(1, 'rgba(100, 100, 120, 0.4)');
      } else if (isNight) {
        gradient.addColorStop(0, 'rgba(210, 210, 255, 0.85)');
        gradient.addColorStop(1, 'rgba(155, 155, 210, 0.35)');
      } else {
        // Bright white fluffy clouds for clear/sunny weather
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        gradient.addColorStop(1, 'rgba(225, 230, 255, 0.45)');
      }
      
      ctx.fillStyle = gradient;
      
      // Draw cloud shape with multiple circles
      const puffCount = cloud.layer === 2 ? 7 : cloud.layer === 1 ? 6 : 5;
      for (let i = 0; i < puffCount; i++) {
        const offsetX = (i - (puffCount / 2)) * cloud.size * 0.25;
        const wobble = cloud.layer === 2 ? 0.12 : 0.08;
        const offsetY = Math.sin(i + time) * cloud.size * wobble;
        const radius = cloud.size * (0.38 + Math.sin(i + time) * 0.14);
        
        ctx.beginPath();
        ctx.arc(cloud.x + offsetX, cloud.y + offsetY, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
      
      // Move cloud
      cloud.x += cloud.speed * (cloud.layer === 2 ? 1.0 : cloud.layer === 1 ? 0.7 : 0.5);
      if (cloud.x > canvas.width + 150) {
        cloud.x = -300;
        cloud.y = Math.random() * (canvas.height * (cloud.layer === 2 ? 0.55 : 0.45));
      }
    });
  }
  
  // Enhanced stars for night
  function drawStars() {
    // Stars should only be visible on clear skies at night
    if (!isNight) return;
    const blocked = ['overcast', 'rain', 'drizzle', 'snow', 'thunder', 'storm', 'fog'];
    for (const b of blocked) {
      if (currentWeather.includes(b)) return;
    }
    
    stars.forEach(star => {
      const twinkle = (Math.sin(star.twinkle) + 1) * 0.5;
      ctx.save();
      ctx.globalAlpha = twinkle * 0.9;
      
      // Star with glow effect
      const starGradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 3
      );
      starGradient.addColorStop(0, '#FFFFFF');
      starGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      starGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = starGradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Bright star center
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
      
      star.twinkle += star.twinkleSpeed;
    });
  }
  
  // Enhanced rain effect with wind
  function drawRain() {
    if (!currentWeather.includes('rain') && !currentWeather.includes('drizzle')) return;
    
    const time = Date.now() * 0.001;
    const isDrizzle = currentWeather.includes('drizzle');
    ctx.strokeStyle = isDrizzle ? 'rgba(173, 216, 230, 0.65)' : 'rgba(173, 216, 230, 0.8)';
    ctx.lineWidth = isDrizzle ? 1.5 : 2;
    ctx.lineCap = 'round';
    
    particles.forEach((drop, index) => {
      ctx.save();
      ctx.globalAlpha = drop.opacity;
      
      // Add wind effect
      const windEffect = Math.sin(time + drop.windOffset) * 3;
      
      ctx.beginPath();
      ctx.moveTo(drop.x + windEffect, drop.y);
      ctx.lineTo(
        drop.x + windEffect - Math.cos(drop.angle) * 20,
        drop.y + Math.sin(drop.angle) * 20
      );
      ctx.stroke();
      
      // Add splashes on ground occasionally
      if (!isDrizzle && drop.y > canvas.height - 50 && Math.random() < 0.1) {
        ctx.beginPath();
        ctx.arc(drop.x, canvas.height - 10, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(173, 216, 230, 0.5)';
        ctx.fill();
      }
      
      ctx.restore();
      
      drop.y += drop.speed;
  drop.x -= Math.cos(drop.angle) * (isDrizzle ? 2 : 3) + windEffect * 0.5;
      
      if (drop.y > canvas.height + 10 || drop.x < -20) {
        drop.y = -20;
        drop.x = Math.random() * (canvas.width + 100);
      }
    });
  }
  
  // Enhanced snow effect
  function drawSnow() {
    if (!currentWeather.includes('snow')) return;
    
    const time = Date.now() * 0.0005;
    
    particles.forEach((flake, index) => {
      ctx.save();
      ctx.globalAlpha = flake.opacity;
      
      // Snowflake with glow
      const gradient = ctx.createRadialGradient(
        flake.x, flake.y, 0,
        flake.x, flake.y, flake.size * 2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Bright snowflake center
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add snowflake pattern
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(flake.x, flake.y);
        ctx.lineTo(
          flake.x + Math.cos(angle) * flake.size,
          flake.y + Math.sin(angle) * flake.size
        );
        ctx.stroke();
      }
      
      ctx.restore();
      
      flake.y += flake.speed;
      flake.x += Math.sin((flake.y + time * 100) * 0.01) * 2;
      
      if (flake.y > canvas.height) {
        flake.y = -20;
        flake.x = Math.random() * canvas.width;
      }
    });
  }
  
  // Enhanced thunder and lightning
  let lightningFlash = 0;
  let nextLightning = Date.now() + Math.random() * 4000 + 2000;
  let lightningBolts = [];
  
  function drawLightning() {
    if (!currentWeather.includes('thunder') && !currentWeather.includes('storm')) return;
    
    const now = Date.now();
    
    if (now > nextLightning && lightningFlash === 0) {
      lightningFlash = 1;
      nextLightning = now + Math.random() * 6000 + 3000;
      
      // Create multiple lightning bolts
      lightningBolts = [];
      const boltCount = 1 + Math.random() * 2;
      for (let i = 0; i < boltCount; i++) {
        const bolt = [];
        const startX = canvas.width * (0.2 + Math.random() * 0.6);
        let x = startX;
        let y = 0;
        
        bolt.push({ x, y });
        
        for (let j = 0; j < 15; j++) {
          x += (Math.random() - 0.5) * 80;
          y += canvas.height / 20;
          bolt.push({ x, y });
          
          // Add branches
          if (Math.random() < 0.4) {
            const branchLength = 3 + Math.random() * 4;
            let branchX = x;
            let branchY = y;
            for (let k = 0; k < branchLength; k++) {
              branchX += (Math.random() - 0.5) * 50;
              branchY += 30;
              bolt.push({ x: branchX, y: branchY, branch: true });
            }
          }
        }
        lightningBolts.push(bolt);
      }
    }
    
    if (lightningFlash > 0) {
      // Flash effect
      ctx.save();
      ctx.globalAlpha = lightningFlash * 0.4;
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      
      // Draw lightning bolts
      lightningBolts.forEach(bolt => {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${lightningFlash})`;
        ctx.lineWidth = 6 + Math.random() * 4;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 20;
        
        ctx.beginPath();
        let isDrawing = false;
        
        bolt.forEach(point => {
          if (point.branch && isDrawing) {
            ctx.stroke();
            ctx.beginPath();
            isDrawing = false;
          }
          
          if (!isDrawing) {
            ctx.moveTo(point.x, point.y);
            isDrawing = true;
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        
        ctx.stroke();
        ctx.restore();
      });
      
      lightningFlash -= 0.08;
      if (lightningFlash < 0) {
        lightningFlash = 0;
        lightningBolts = [];
      }
    }
  }
  
  // Main animation loop
  function animate() {
    // Dynamic background gradient based on weather and time
    let gradient;
    
    if (isNight) {
      if (currentWeather.includes('storm') || currentWeather.includes('thunder')) {
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0a0a15');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
      } else {
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0B1426');
        gradient.addColorStop(0.5, '#1E3A5F');
        gradient.addColorStop(1, '#2D5A87');
      }
    } else {
      if (currentWeather.includes('storm') || currentWeather.includes('thunder')) {
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#2C3E50');
        gradient.addColorStop(0.5, '#34495E');
        gradient.addColorStop(1, '#4A6741');
      } else if (currentWeather.includes('rain') || currentWeather.includes('drizzle')) {
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#3498DB');
        gradient.addColorStop(0.5, '#5DADE2');
        gradient.addColorStop(1, '#85C1E9');
      } else if (currentWeather.includes('snow')) {
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#E8F4FD');
        gradient.addColorStop(0.5, '#B3E5FC');
        gradient.addColorStop(1, '#81D4FA');
      } else if (currentWeather.includes('overcast')) {
        // Grayer, more muted background for overcast
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#95A5A6');
        gradient.addColorStop(0.5, '#7F8C8D');
        gradient.addColorStop(1, '#5D6D7E');
      } else if (currentWeather.includes('sunny') || currentWeather.includes('clear')) {
        // Bright, vibrant background for sunny weather
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.5, '#4682B4');
        gradient.addColorStop(1, '#1E90FF');
      } else {
        // Default partly cloudy background
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
      }
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawStars();
    drawClouds();
    
    if (!isNight && (currentWeather.includes('clear') || currentWeather.includes('sunny') || currentWeather === 'clear' || currentWeather === 'sunny')) {
      drawSun();
    }
    
    drawRain();
    drawSnow();
    drawLightning();
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Weather data management
  let currentCoords = { lat: null, lon: null, name: "" };
  let forecastData = { next7: null, past7: null };
  
  // State change handler for city dropdown
  document.getElementById('state-select').addEventListener('change', function() {
    const selectedState = this.value;
    const citySelect = document.getElementById('city-select');
    
    // Populate cities based on selected state
    citySelect.innerHTML = '<option value="">Select City</option>';
    
    if (selectedState && stateCities[selectedState]) {
      citySelect.disabled = false;
      stateCities[selectedState].forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    } else {
      citySelect.disabled = true;
    }
  });
  
  // Removed free-text city input; no handler needed
  
  // Get coordinates from city/state name
  async function getCoordinates(location, suppressAlert = false) {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=10&language=en&format=json`;
      const response = await fetch(url);
      
      if (!response.ok) throw new Error('Geocoding failed');
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Try to find Indian location first
        const indianResult = data.results.find(r => r.country === 'India' || r.country_code === 'IN');
        const result = indianResult || data.results[0];
        
        return {
          lat: result.latitude,
          lon: result.longitude,
          name: `${result.name}, ${result.admin1 || result.country}`
        };
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      if (!suppressAlert) {
        alert('Location not found. Please try a different search.');
      }
      return null;
    }
  }

  async function getCoordinatesWithFallback(city, state) {
    const canonicalCity = cityAliases[city] || city;
    const queries = [
      `${canonicalCity}, ${state}, India`,
      `${canonicalCity}, India`,
      canonicalCity
    ];
    for (const q of queries) {
      const result = await getCoordinates(q, true);
      if (result) return result;
    }
    // Final try: original city + state in case aliasing changed it wrongly
    return await getCoordinates(`${city}, ${state}, India`);
  }
  
  // Fetch weather data
  async function fetchWeatherData(lat, lon, locationName = "") {
    try {
      document.getElementById('location').textContent = 'Loading...';
      
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weathercode,windspeed_10m,visibility,is_day&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max&timezone=auto&forecast_days=7`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Weather fetch failed');
      
      const data = await response.json();
      const current = data.current;
      const daily = data.daily;
      
      // Update current weather
      const description = weatherCodes[current.weathercode] || "Unknown";
      document.getElementById('temperature').textContent = `${Math.round(current.temperature_2m)}°C`;
      document.getElementById('description').textContent = description;
      document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
      document.getElementById('wind').textContent = `${current.windspeed_10m} km/h`;
      document.getElementById('feels-like').textContent = `${Math.round(current.apparent_temperature)}°C`;
      document.getElementById('visibility').textContent = `${(current.visibility / 1000).toFixed(1)} km`;
      document.getElementById('location').textContent = locationName || `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
      
      // Update animation
      currentWeather = description.toLowerCase();
      isNight = current.is_day === 0;
      initParticles(currentWeather);
      initClouds(currentWeather);
      
      // Store data
      currentCoords = { lat, lon, name: locationName };
      forecastData.next7 = daily;
      
      // Display forecast
      displayForecast(daily, false);
      setActiveControl('next');
      
    } catch (error) {
      console.error('Weather fetch error:', error);
      alert('Unable to load weather data. Please try again.');
    }
  }
  
  // Load past 7 days data
  async function loadPastWeatherData(lat, lon) {
    try {
      const today = new Date();
      const endDate = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const startDate = new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000);
      
      const formatDate = (date) => date.toISOString().split('T')[0];
      
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Archive fetch failed');
      
      const data = await response.json();
      return data.daily;
      
    } catch (error) {
      console.error('Past weather fetch error:', error);
      alert('Unable to load past weather data.');
      return null;
    }
  }
  
  // Display forecast
  function displayForecast(daily, isPast = false) {
    const forecastGrid = document.getElementById('forecast');
    forecastGrid.innerHTML = '';
    
    const days = Math.min(7, daily.time.length);
    
    for (let i = 0; i < days; i++) {
      const date = new Date(daily.time[i]);
      const weatherCode = daily.weathercode[i];
      const description = weatherCodes[weatherCode] || "Unknown";
      const maxTemp = Math.round(daily.temperature_2m_max[i]);
      const minTemp = Math.round(daily.temperature_2m_min[i]);
  const iconUrl = icons[description] || icons["Sunny"] || 'https://img.icons8.com/color/96/cloud.png';
      
      const card = document.createElement('div');
      card.className = 'forecast-card';
      card.innerHTML = `
        <div class="forecast-day">${formatDate(date)}</div>
        <div class="forecast-icon">
          <img src="${iconUrl}" alt="${description}" onerror="this.src='https://img.icons8.com/color/96/cloud.png'">
        </div>
        <div class="forecast-desc">${description}</div>
        <div class="forecast-temp">${minTemp}° / ${maxTemp}°</div>
      `;
      
      card.addEventListener('click', () => {
        document.querySelectorAll('.forecast-card').forEach(c => 
          c.classList.remove('selected'));
        card.classList.add('selected');
        
        document.getElementById('temperature').textContent = `${minTemp}°C / ${maxTemp}°C`;
        document.getElementById('description').textContent = description + (isPast ? ' (past)' : '');
        
        currentWeather = description.toLowerCase();
        initParticles(currentWeather);
      });
      
      forecastGrid.appendChild(card);
    }
  }
  
  // Format date for display
  function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  // Set active control button
  function setActiveControl(type) {
    document.querySelectorAll('.control-btn').forEach(btn => 
      btn.classList.remove('active'));
    document.getElementById(`${type}-btn`).classList.add('active');
  }
  
  // Enhanced search functionality
  async function performSearch() {
    const stateSelect = document.getElementById('state-select').value;
    const citySelect = document.getElementById('city-select').value;
    
    if (!stateSelect || !citySelect) {
      alert('Please select both state and city.');
      return;
    }
    
    const coords = await getCoordinatesWithFallback(citySelect, stateSelect);
    if (coords) {
      await fetchWeatherData(coords.lat, coords.lon, coords.name);
    }
  }
  
  // Get user location
  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(
            position.coords.latitude,
            position.coords.longitude,
            'Your Location'
          );
        },
        () => {
          fetchWeatherData(28.6139, 77.2090, 'New Delhi, India');
        }
      );
    } else {
      fetchWeatherData(28.6139, 77.2090, 'New Delhi, India');
    }
  }
  
  // Event listeners (Enter-to-search removed with free-text input)
  
  document.getElementById('past-btn').addEventListener('click', async () => {
    if (!currentCoords.lat) return;
    
    try {
      if (!forecastData.past7) {
        forecastData.past7 = await loadPastWeatherData(currentCoords.lat, currentCoords.lon);
      }
      
      if (forecastData.past7) {
        displayForecast(forecastData.past7, true);
        setActiveControl('past');
      }
    } catch (error) {
      console.error('Error loading past data:', error);
    }
  });
  
  document.getElementById('next-btn').addEventListener('click', () => {
    if (forecastData.next7) {
      displayForecast(forecastData.next7, false);
      setActiveControl('next');
    }
  });
  
  // Initialize app
  getUserLocation();
  animate();
  
  // Auto-refresh weather data every 10 minutes
  setInterval(() => {
    if (currentCoords.lat && currentCoords.lon) {
      fetchWeatherData(currentCoords.lat, currentCoords.lon, currentCoords.name);
    }
  }, 600000);