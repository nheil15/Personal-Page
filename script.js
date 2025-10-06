const toggleButton = document.createElement('button');
toggleButton.style.position = 'fixed';
toggleButton.style.top = '20px';
toggleButton.style.right = '20px';
toggleButton.style.width = '42px';
toggleButton.style.height = '42px';
toggleButton.style.backgroundColor = '#444';
toggleButton.style.color = '#fff';
toggleButton.style.border = 'none';
toggleButton.style.borderRadius = '50%';
toggleButton.style.cursor = 'pointer';
toggleButton.style.display = 'flex';
toggleButton.style.alignItems = 'center';
toggleButton.style.justifyContent = 'center';
toggleButton.style.zIndex = '1000';
toggleButton.style.fontSize = '18px';

const icon = document.createElement('i');
icon.classList.add('fas', 'fa-moon');
toggleButton.appendChild(icon);

document.body.appendChild(toggleButton);

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    toggleButton.style.backgroundColor = '#fff';
    icon.style.color = '#000';
    canvas.style.background = '#000'; 
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    toggleButton.style.backgroundColor = '#555';
    icon.style.color = '#fff';
    canvas.style.background = '#fff'; 
  }
});

const resumeBtn = document.getElementById('resumeBtn');
const projectsBtn = document.getElementById('projectsBtn');
const introContent = document.getElementById('intro-content');
const introHeader = document.getElementById('intro-header');
const originalContent = introContent.innerHTML;

projectsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  introHeader.style.display = 'none';
  introContent.innerHTML = `
    <div class="projects-container">
      <div class="project-card">
        <h3><a href="https://nheil15.github.io/LAKAYA/" target="_blank">LAKAYA</a></h3>
        <p>Aim to foster collaboration that empowers local fishing communities while enabling investors 
        to make impactful, environmentally-conscious decisions.</p>
      </div>
      <div class="project-card">
        <h3><a href="https://nheil15.github.io/e-BOTO/" target="_blank">e-BOTO</a></h3>
        <p>e-BOTO is a web-based digital voting platform designed to transition traditional paper-based 
        elections into a more modern, efficient, and secure process.</p>
      </div>
      <div class="project-card">
        <h3><a href="https://nheil15.github.io/TapSitLog/" target="_blank">Tapsitlog</a></h3>
        <p>TapSitLog is a QR code-based restaurant ordering system designed to enhance the dining experience 
        and improve operational efficiency.</p>
      </div>
      <div class="project-card">
        <h3><a href="https://nheil15.github.io/OOP-Final-/" target="_blank">APOTHECARE</a></h3>
        <p>A digitalized POS system that runs through a website platform. Apothecare is a pharmacy with a 
        solid database of medicines that involves a point-of-sale system that ensures fast product transactions.</p>
      </div>
    </div>
  `;
  projectsBtn.classList.add('active');
  resumeBtn.classList.remove('active');
});

resumeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  introHeader.style.display = 'block';
  introContent.innerHTML = originalContent;
  resumeBtn.classList.add('active');
  projectsBtn.classList.remove('active');
});

document.addEventListener('click', function (e) {
  const clickedCard = e.target.closest('.project-card');
  if (!clickedCard) return;

  const title = clickedCard.querySelector('h3').textContent;
  const description = clickedCard.querySelector('p').textContent;
  const container = clickedCard.closest('.projects-container');

  const oldPopup = container.querySelector('.popup-card');
  if (oldPopup) oldPopup.remove();

  container.classList.add('hide-others');

  const popup = document.createElement('div');
  popup.className = 'popup-card';
  popup.innerHTML = `
    <span class="close">&times;</span>
    <h3>${title}</h3>
    <p>${description}</p>
  `;
  container.appendChild(popup);

  popup.querySelector('.close').addEventListener('click', () => {
    popup.remove();
    container.classList.remove('hide-others');
  });
});

const aboutLink = document.querySelector('a[href="#about"]');
const projectsLink = document.querySelector('a[href="#projects"]');
const contactLink = document.querySelector('a[href="#contact"]');

function highlightTempText(element) {
  if (!element) return;
  element.classList.add('temp-text-highlight');
  setTimeout(() => element.classList.remove('temp-text-highlight'), 1500);
}

aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  resumeBtn.click();
  highlightTempText(resumeBtn);
});

projectsLink.addEventListener('click', (e) => {
  e.preventDefault();
  projectsBtn.click();
  highlightTempText(projectsBtn);
});

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.social-links a').forEach(link => highlightTempText(link));
  document.querySelectorAll('footer a').forEach(link => highlightTempText(link));
});

let particles = [];
const particleCount = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.7) * 0.9;
    this.speedY = (Math.random() - 0.7) * 0.9;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = document.body.classList.contains('dark-mode') 
        ? 'rgba(255, 255, 255, 0.7)' 
        : 'rgba(0, 0, 0, 0.7)';      
    ctx.fill();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
}

for(let i = 0; i < particleCount; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 100){
        ctx.strokeStyle = document.body.classList.contains('dark-mode')
            ? `rgba(255,255,255,${1 - dist/100})` 
            : `rgba(0,0,0,${1 - dist/100})`;      
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  particles.forEach(p=>{p.update(); p.draw();});
  requestAnimationFrame(animate);
}
animate();
