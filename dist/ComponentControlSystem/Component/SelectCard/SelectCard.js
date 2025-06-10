import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class SelectCard extends LitElement {
  static get properties() {
    return {
      rotateX: { type: Number, state: true },
      rotateY: { type: Number, state: true },
      maxRotation: { type: Number }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      
      .card-container {
        transform-style: preserve-3d;
        transition: transform 0.2s ease-out;
        cursor: pointer;
      }
      
      ::slotted(*) {
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.rotateX = 0;
    this.rotateY = 0;
    this.maxRotation = 10; // 默认最大旋转角度为10度
  }

  get transformStyle() {
    return `perspective(1000px) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`;
  }

  handleMouseMove(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    // 计算旋转角度，使用可配置的最大旋转角度
    this.rotateX = -(mouseY / rect.height) * this.maxRotation;
    this.rotateY = (mouseX / rect.width) * this.maxRotation;
  }

  resetTransform() {
    this.rotateX = 0;
    this.rotateY = 0;
  }

  render() {
    return html`
      <div 
        class="card-container"
        style="transform: ${this.transformStyle}"
        @mousemove="${this.handleMouseMove}"
        @mouseleave="${this.resetTransform}"
      >
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('select-card', SelectCard); 