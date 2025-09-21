// === Dark mode toggle ===
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

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    toggleButton.style.backgroundColor = '#fff';
    icon.style.color = '#000';
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    toggleButton.style.backgroundColor = '#444';
    icon.style.color = '#fff';
  }
});

// === Resume / Projects Tab Logic ===
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
        <h3>LAKAYA</h3>
        <p>Aim to foster collaboration that empowers local fishing communities while
         enabling investors to make impactful, environmentally-conscious decisions.</p>
      </div>
      <div class="project-card">
        <h3>e-BOTO</h3>
        <p>e-BOTO is a web-based digital voting platform designed to transition traditional 
        paper-based elections into a more modern, efficient, and secure process. </p>
      </div>
      <div class="project-card">
        <h3>Tapsitlog</h3>
        <p>TapSitLog is a QR code-based restaurant ordering system designed to enhance 
        the dining experience and improve operational efficiency. </p>
      </div>
      <div class="project-card">
        <h3>APOTHECARE</h3>
        <p>A digitalized POS system that runs through a website platform. Apothecare is a 
        pharmacy with a solid database of medicines that involves a point-of-sale system that ensures fast product transactions. </p>
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

// === Popup behavior for project cards ===
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

// === Top nav text highlight logic ===
const aboutLink = document.querySelector('a[href="#about"]');
const projectsLink = document.querySelector('a[href="#projects"]');
const contactLink = document.querySelector('a[href="#contact"]');

function highlightTempText(element) {
  if (!element) return;
  element.classList.add('temp-text-highlight');
  setTimeout(() => element.classList.remove('temp-text-highlight'), 1500);
}

// About Me click
aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  resumeBtn.click();
  highlightTempText(resumeBtn);
});

// Projects click
projectsLink.addEventListener('click', (e) => {
  e.preventDefault();
  projectsBtn.click();
  highlightTempText(projectsBtn);
});

// Contact click
contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.social-links a').forEach(link => highlightTempText(link));
});
