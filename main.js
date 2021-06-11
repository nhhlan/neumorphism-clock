/*  clock */
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

/*  rate slider */
const container = document.querySelector('.slider__box');
const btn = document.querySelector('.slider__btn');
const color = document.querySelector('.slider__color');
const tooltip = document.querySelector('.slider__tooltip');

clock = () => {
  let today = new Date();
  let h = (today.getHours() % 12) + today.getMinutes() / 59;
  let m = today.getMinutes();
  let s = today.getSeconds();

  h *= 30; // 12 * 30 = 360deg
  m *= 6;
  s *= 6; // 60 * 6 = 360deg

  rotation(hours, h);
  rotation(minutes, m);
  rotation(seconds, s);

  // call every second
  setTimeout(clock, 500);
}

rotation = (target, val) => {
  target.style.transform =  `rotate(${val}deg)`;
}

window.onload = clock();

dragElement = (target, btn) => {
  target.addEventListener('mousedown', (e) => {
      onMouseMove(e);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
  });

  onMouseMove = (e) => {
      e.preventDefault();
      let targetRect = target.getBoundingClientRect();
      let x = e.pageX - targetRect.left + 10;
      if (x > targetRect.width) { x = targetRect.width};
      if (x < 0){ x = 0};
      btn.x = x - 10;
      btn.style.left = btn.x + 'px';

      // get the position of the button inside the container (%)
      let percentPosition = (btn.x + 10) / targetRect.width * 100;
      
      // color width = position of button (%)
      color.style.width = percentPosition + "%";

      // move the tooltip when button moves, and show the tooltip
      tooltip.style.left = btn.x - 5 + 'px';
      tooltip.style.opacity = 1;

      // show the percentage in the tooltip
      tooltip.textContent = Math.round(percentPosition) + '%';
  };

  onMouseUp  = (e) => {
      window.removeEventListener('mousemove', onMouseMove);
      tooltip.style.opacity = 0;

      btn.addEventListener('mouseover', function() {
        tooltip.style.opacity = 1;
      });
      
      btn.addEventListener('mouseout', function() {
        tooltip.style.opacity = 0;
      });
  };
};

dragElement(container, btn);


/* dark mode */
const darkModeToggle = document.querySelector('input#dark');
function enableDarkmode() {
  document.body.classList.toggle('dark');
};

// local storage
let darkMode = localStorage.getItem('darkmode');
if(darkMode === 'on') {
    enableDarkmode();
}

darkModeToggle.addEventListener('click', (e) => {
  darkMode = localStorage.getItem('darkmode');
  if(darkMode === 'on') {
      enableDarkmode();
      darkMode = localStorage.setItem('darkmode', null);
  } else {
      enableDarkmode();
      darkMode = localStorage.setItem('darkmode', 'on');
  }
});
