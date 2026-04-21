/**
 * VYBE - Modern Creator Platform
 * Core Application Logic & Web Components
 */

// Shared Styles Helper
const sharedStyles = `
  :host {
    display: block;
    opacity: 0;
  }
  :host(.visible) {
    animation: fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  * {
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
  }
  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 28px;
    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  .glass::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .glass:hover::before {
    opacity: 1;
  }
  .glass:hover {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(108, 99, 255, 0.1);
  }
`;

// Intersection Observer for reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Helper to attach mouse movement for glow effect
const attachGlowEffect = (element) => {
  const card = element.shadowRoot.querySelector('.glass');
  if (!card) return;
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
};

// VybeHeader Component
class VybeHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(15, 15, 17, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        h1 {
          font-size: 26px;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(45deg, oklch(65% 0.25 280), oklch(75% 0.15 190));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          cursor: pointer;
          letter-spacing: -0.04em;
        }
        nav {
          display: flex;
          gap: 32px;
        }
        nav a {
          color: oklch(80% 0.02 260);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: 0.3s;
          position: relative;
        }
        nav a::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: oklch(75% 0.15 190);
          transition: 0.3s;
        }
        nav a:hover {
          color: white;
        }
        nav a:hover::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          header { padding: 15px 20px; }
          nav { display: none; }
        }
      </style>
      <header>
        <h1>VYBE</h1>
        <nav>
          <a href="#">크리에이터</a>
          <a href="#">의뢰하기</a>
          <a href="#">로그인</a>
        </nav>
      </header>
    `;
  }
}

// VybeSection Component
class VybeSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    this.render(title);
    revealObserver.observe(this);
  }
  render(title) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        :host(.visible) {
          opacity: 1;
          transform: translateY(0);
        }
        section {
          padding: 60px 0;
        }
        h3 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 40px;
          color: white;
          letter-spacing: -0.02em;
        }
        @media (max-width: 768px) {
          section { padding: 40px 0; }
          h3 { font-size: 24px; }
        }
      </style>
      <section>
        ${title ? `<h3>${title}</h3>` : ''}
        <slot></slot>
      </section>
    `;
  }
}

// StyleCard Component
class StyleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const title = this.getAttribute('title') || 'Style';
    const desc = this.getAttribute('description') || 'Description';
    this.render(title, desc);
    attachGlowEffect(this);
  }
  render(title, desc) {
    this.shadowRoot.innerHTML = `
      <style>
        ${sharedStyles}
        :host { opacity: 1; } /* Managed by parent section */
        .card {
          padding: 40px;
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 180px;
        }
        h4 {
          font-size: 24px;
          margin: 0 0 12px 0;
          color: white;
          font-weight: 700;
        }
        p {
          font-size: 16px;
          color: oklch(80% 0.02 260);
          margin: 0;
          opacity: 0.8;
        }
      </style>
      <div class="glass card">
        <h4>${title}</h4>
        <p>${desc}</p>
      </div>
    `;
  }
}

// CreatorCard Component
class CreatorCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const name = this.getAttribute('name') || 'Creator';
    const tag = this.getAttribute('tag') || 'Tagline';
    const img = this.getAttribute('image') || '';
    this.render(name, tag, img);
    attachGlowEffect(this);
  }
  render(name, tag, img) {
    this.shadowRoot.innerHTML = `
      <style>
        ${sharedStyles}
        :host { opacity: 1; }
        .card {
          padding: 24px;
          min-width: 280px;
          cursor: pointer;
        }
        .image-placeholder {
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
          border-radius: 20px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          position: relative;
          overflow: hidden;
        }
        h4 {
          font-size: 22px;
          margin: 0 0 8px 0;
          color: white;
          font-weight: 700;
        }
        p {
          font-size: 14px;
          color: oklch(80% 0.02 260);
          margin: 0;
          font-weight: 500;
        }
      </style>
      <div class="glass card">
        <div class="image-placeholder">
          ${img ? `<img src="${img}" style="width:100%; height:100%; object-fit:cover;">` : '📸'}
        </div>
        <h4>${name}</h4>
        <p>${tag}</p>
      </div>
    `;
  }
}

// VybeButton Component
class VybeButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const text = this.getAttribute('text') || 'Button';
    const variant = this.getAttribute('variant') || 'primary';
    this.render(text, variant);
  }
  render(text, variant) {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 18px 40px;
          border: none;
          border-radius: 100px;
          font-weight: 700;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          background: ${variant === 'primary' ? 'linear-gradient(45deg, oklch(65% 0.25 280), oklch(75% 0.15 190))' : 'rgba(255, 255, 255, 0.05)'};
          color: white;
          box-shadow: ${variant === 'primary' ? '0 0 20px oklch(75% 0.15 190 / 0.4)' : 'none'};
          position: relative;
          overflow: hidden;
        }
        button:hover {
          transform: translateY(-4px);
          box-shadow: ${variant === 'primary' ? '0 15px 30px oklch(75% 0.15 190 / 0.5)' : 'rgba(255, 255, 255, 0.1)'};
          filter: brightness(1.1);
        }
        button:active {
          transform: translateY(0) scale(0.96);
        }
      </style>
      <button>${text}</button>
    `;
  }
}

// Register Components
customElements.define('vybe-header', VybeHeader);
customElements.define('vybe-section', VybeSection);
customElements.define('style-card', StyleCard);
customElements.define('creator-card', CreatorCard);
customElements.define('vybe-button', VybeButton);

console.log('VYBE Platform Initialized');
