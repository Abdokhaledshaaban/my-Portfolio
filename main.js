const texts = [
  'Full Stack Developer',
  'Frontend Specialist',
  'Python & Django Developer',
];

let count = 0;
let index = 0;
let currentText = '';
let isDeleting = false;

function type() {
  currentText = texts[count];

  if (isDeleting) {
    index--;
  } else {
    index++;
  }

  document.getElementById('typing').textContent = currentText.slice(0, index);

  let speed = 200;

  // سرعة المسح أسرع
  if (isDeleting) speed = 100;

  // لما يخلص كتابة الجملة
  if (!isDeleting && index === currentText.length) {
    speed = 1000; // يستنى بعد الكتابة
    isDeleting = true;
  }

  // لما يخلص مسح الجملة
  else if (isDeleting && index === 0) {
    isDeleting = false;
    count++;
    if (count === texts.length) count = 0;

    speed = 500; // 👈 يستنى بعد المسح قبل ما يبدأ يكتب
  }

  setTimeout(type, speed);
}

type();

// ===== Skills Progress Animation =====
function animateSkills() {
  const skillsSection = document.getElementById('skills');
  const skillsTop = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (skillsTop < windowHeight - 100) {
    const skillBoxes = document.querySelectorAll('.skill');

    skillBoxes.forEach((skill) => {
      const progressBar = skill.querySelector('.progress');
      const percentText = skill.querySelector('.skill-percent').textContent;

      progressBar.style.opacity = '1';
      progressBar.style.transform = 'translateY(0)';
      progressBar.style.width = percentText;
    });
  }
}
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===== Fade-in on Scroll =====
function scrollFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) el.classList.add('show');
  });
}
window.addEventListener('scroll', scrollFadeIn);
window.addEventListener('load', scrollFadeIn);

// ===== Load Projects From JSON =====
fetch('projects.json')
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById('projects-container');

    data.forEach((project) => {
      const techBadges = project.technologies
        .map((tech) => `<span class="tech">${tech}</span>`)
        .join('');

      const card = `
        <div class="col-md-6 col-lg-4 fade-in">
          <div class="project-card">
            <img src="${project.image}" alt="${project.title}">
            <div class="p-3">
              <h5>${project.title}</h5>
              <p class="text-secondary">${project.description}</p>
              <div class="mb-2">
                ${techBadges}
              </div>
              <a href="${project.live}" target="_blank" class="btn btn-sm btn-primary me-2">Live</a>
              <a href="${project.code}" target="_blank" class="btn btn-sm btn-outline-light">Code</a>
            </div>
          </div>
        </div>
      `;

      container.innerHTML += card;
    });
  })
  .catch((error) => console.log('Error loading projects:', error));

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs
    .sendForm('service_5dpomcd', 'template_jskqrak', this)
    .then(() => {
      alert('Message Sent Successfully!');
      this.reset();
    })
    .catch((error) => {
      console.log(error);
      alert('Failed to send message, try again!');
    });
});
