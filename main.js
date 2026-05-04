/**
 * VYBE - High Performance Creator Platform
 * Cal AI Inspired Redesign
 */

// Shared Styles Helper
const sharedStyles = `
  * {
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
  }
  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 32px;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }
  .glass:hover {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    transform: translateY(-8px);
  }
`;

// Intersection Observer for reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

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
          padding: 20px 48px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .logo {
          font-size: 24px;
          font-weight: 800;
          color: white;
          text-decoration: none;
          letter-spacing: -0.05em;
        }
        nav {
          display: flex;
          gap: 32px;
        }
        nav a {
          color: #A1A1AA;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: 0.3s;
        }
        nav a:hover {
          color: white;
        }
        .cta {
          background: white;
          color: black;
          padding: 10px 20px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          transition: 0.3s;
        }
        .cta:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(255,255,255,0.2);
        }
        @media (max-width: 768px) {
          header { padding: 15px 24px; }
          nav { display: none; }
        }
      </style>
      <header>
        <a href="/" class="logo">VYBE</a>
        <nav>
          <a href="#">크리에이터</a>
          <a href="#">성공사례</a>
          <a href="#">문의하기</a>
        </nav>
        <a href="#" class="cta">시작하기</a>
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
    const subtitle = this.getAttribute('subtitle') || '';
    this.render(title, subtitle);
    this.classList.add('reveal');
    revealObserver.observe(this);
  }
  render(title, subtitle) {
    this.shadowRoot.innerHTML = `
      <style>
        section {
          padding: 100px 0;
        }
        .header {
          text-align: center;
          margin-bottom: 64px;
        }
        h2 {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          margin-bottom: 16px;
          letter-spacing: -0.04em;
          color: white;
        }
        p {
          font-size: 18px;
          color: #A1A1AA;
          max-width: 600px;
          margin: 0 auto;
        }
      </style>
      <section>
        <div class="header">
          ${title ? `<h2>${title}</h2>` : ''}
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        <slot></slot>
      </section>
    `;
  }
}

// StyleCard Component (Bento Grid)
class StyleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const title = this.getAttribute('title') || 'Style';
    const desc = this.getAttribute('description') || 'Description';
    const span = this.getAttribute('span') || '3';
    this.style.gridColumn = `span ${span}`;
    this.render(title, desc);
  }
  render(title, desc) {
    this.shadowRoot.innerHTML = `
      <style>
        ${sharedStyles}
        .card {
          padding: 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 200px;
        }
        h4 {
          font-size: 24px;
          margin: 0 0 12px 0;
          color: white;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        p {
          font-size: 15px;
          color: #A1A1AA;
          margin: 0;
          line-height: 1.5;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          background: oklch(85% 0.2 145 / 0.1);
          color: oklch(85% 0.2 145);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 16px;
          align-self: flex-start;
        }
      </style>
      <div class="glass card">
        <div>
          <div class="badge">TRENDING</div>
          <h4>${title}</h4>
          <p>${desc}</p>
        </div>
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
    this.render(name, tag);
  }
  render(name, tag) {
    this.shadowRoot.innerHTML = `
      <style>
        ${sharedStyles}
        .card {
          padding: 24px;
          min-width: 280px;
          flex: 0 0 auto;
        }
        .img-placeholder {
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(135deg, #111, #000);
          border-radius: 20px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
        }
        h4 {
          font-size: 20px;
          color: white;
          margin-bottom: 4px;
        }
        p {
          color: #A1A1AA;
          font-size: 14px;
        }
      </style>
      <div class="glass card">
        <div class="img-placeholder">📸</div>
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
    this.render(text);
  }
  render(text) {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 18px 40px;
          border: none;
          border-radius: 100px;
          font-weight: 800;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background: oklch(85% 0.2 145);
          color: black;
          letter-spacing: -0.02em;
        }
        button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px oklch(85% 0.2 145 / 0.4);
        }
        button:active {
          transform: scale(0.95);
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

console.log('VYBE - High Performance Initialized');
