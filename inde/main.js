const themes = [
  {
    bg: 'linear-gradient(135deg, #3fd885 0%, #3fd8b5 100%)',
    shadow: '#3fd885'
  },
  {
    bg: 'linear-gradient(135deg, #4f8cff 0%, #6fd6ff 100%)',
    shadow: '#4f8cff'
  },
  {
    bg: 'linear-gradient(135deg, #ffb6b9 0%, #fcdff0 100%)',
    shadow: '#ffb6b9'
  },
  {
    bg: 'linear-gradient(135deg, #b39ddb 0%, #f8bbd0 100%)',
    shadow: '#b39ddb'
  },
  {
    bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    shadow: '#fcb69f'
  },
  {
    bg: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    shadow: '#a1c4fd'
  },
  {
    bg: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    shadow: '#fbc2eb'
  },
  {
    bg: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    shadow: '#c3cfe2'
  },
  {
    bg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    shadow: '#ffd200'
  },
  {
    bg: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
    shadow: '#43cea2'
  }
];
const sentences = [
  '做一个温暖的人，把温暖传递给别人。',
  '愿你被世界温柔以待。',
  '保持微笑，阳光总在风雨后。',
  '你很棒，别怀疑自己。',
  '生活明朗，万物可爱。',
  '心怀善意，定能途遇天使。',
  '每一天都是新的开始。',
  '相信美好，总会遇见美好。',
  '温柔以待，静候花开。',
  '你值得拥有一切美好。'
];
let themeIndex = 0;
const savedThemeIndex = localStorage.getItem('themeIndex');
if (savedThemeIndex !== null && !isNaN(Number(savedThemeIndex))) {
  themeIndex = Number(savedThemeIndex) % themes.length;
}
let sentenceIndex = 0;

function setTheme() {
  document.body.style.background = themes[themeIndex].bg;
}

function addBtnEvents() {
  document.getElementById('themeBtn').onclick = () => {
    themeIndex = (themeIndex + 1) % themes.length;
    setTheme();
    localStorage.setItem('themeIndex', themeIndex);
  };
  document.getElementById('sentenceBtn').onclick = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * sentences.length);
    } while (newIndex === sentenceIndex);
    sentenceIndex = newIndex;
    // 只替换文字内容，不做其他DOM操作
    const cardText = document.querySelector('.card-text');
    cardText.textContent = sentences[sentenceIndex];
  };
}

function render() {
  document.getElementById('app').innerHTML = `
    <div class="main-flex">
      <div class="main-content dropin" style="--delay:0.1s">
        <h1 class="title">让心情变好的小站</h1>
        <div class="smile-box">
          <div class="smile-face">😊</div>
        </div>
        <div class="card">
          <div class="card-text">${sentences[sentenceIndex]}</div>
          <div class="card-btns">
            <button class="btn yellow" id="sentenceBtn">换一句</button>
            <button class="btn white" id="themeBtn">换主题</button>
          </div>
        </div>
        <div class="author-tag">我是艾阳 🦄</div>
      </div>
      <div class="side-func dropin" style="--delay:0.2s">
        <div class="grid">
          <div class="grid-item"><span class="icon">☀️</span></div>
          <div class="grid-item"><span class="icon">☁️</span></div>
          <div class="grid-item"><span class="icon">💖</span></div>
          <div class="grid-item"><span class="icon">😊</span></div>
          <div class="grid-item"><span class="icon">🎵</span></div>
          <div class="grid-item"><span class="icon">⭐</span></div>
          <div class="grid-item"><span class="icon">🌈</span></div>
          <div class="grid-item"><span class="icon">🪶</span></div>
          <div class="grid-item"><span class="icon">🍀</span></div>
          <div class="grid-item"><span class="icon">🧸</span></div>
          <div class="grid-item"><span class="icon">🦄</span></div>
          <div class="grid-item"><span class="icon">🍓</span></div>
          <div class="grid-item"><span class="icon">🐱</span></div>
          <div class="grid-item"><span class="icon">🐻</span></div>
          <div class="grid-item"><span class="icon">🦋</span></div>
          <div class="grid-item"><span class="icon">🌸</span></div>
        </div>
        <div class="contact-cards">
          <div class="contact-card" data-copy="demo-wechat">
            <span class="contact-icon">💚</span>
            <span class="contact-title">微信</span>
            <span class="contact-info">demo-wechat</span>
          </div>
          <div class="contact-card" data-copy="1234567890">
            <span class="contact-icon">💙</span>
            <span class="contact-title">QQ</span>
            <span class="contact-info">1234567890</span>
          </div>
          <div class="contact-card" data-copy="demo@example.com">
            <span class="contact-icon">✉️</span>
            <span class="contact-title">邮箱</span>
            <span class="contact-info">demo@example.com</span>
          </div>
        </div>
        <div id="copy-tip" class="copy-tip" style="display:none;">已复制！</div>
      </div>
    </div>
  `;
  setTheme();
  addBtnEvents();

  // 联系方式复制功能
  document.querySelectorAll('.contact-card').forEach(card => {
    card.onclick = function() {
      const text = card.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        const tip = document.getElementById('copy-tip');
        // 使用绝对定位浮层提示，避免影响布局
        tip.style.display = 'block';
        tip.style.position = 'fixed';
        tip.style.left = '50%';
        tip.style.top = '20%';
        tip.style.transform = 'translate(-50%, 0)';
        tip.style.background = '#3fd885';
        tip.style.color = '#fff';
        tip.style.padding = '10px 28px';
        tip.style.borderRadius = '18px';
        tip.style.fontWeight = 'bold';
        tip.style.fontSize = '1.1rem';
        tip.style.boxShadow = '0 2px 8px #3fd88544';
        tip.style.zIndex = '9999';
        setTimeout(() => {
          tip.style.display = 'none';
          tip.removeAttribute('style');
        }, 1200);
      });
    };
  });
}

render();

document.addEventListener('keydown', function(e) {
  if (e.key === 'f' || e.key === 'F') {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}); 