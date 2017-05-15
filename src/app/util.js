// 这里会放公共方法
export default {
  getRandom: (min, max) => Math.floor(Math.random() * (max - min) + min),
  UUID: () => `uid${new Date().getTime()}${Math.floor(Math.random() * 10000)}`,
  creatConstomC3Animate: (val, name) => {
    const style = document.createElement('style');
    style.id = name;
    style.innerHTML = val;
    document.getElementsByTagName('body')[0].appendChild(style);
  },
  drawGoToCenterCss(from, to) {
    const name = this.UUID();
    const animate = `
      .${name}{
        animation: ${name} 3s;
      }

      @keyframes ${name} {
          0% {
              left: ${from.x};
              top:${from.y};

          }
          100% {
              left: ${to.x}px;
              top:${to.y}px;
          }
      }
    `;
    this.creatConstomC3Animate(animate, name);
    return name;
  },
  getPos: (dom) => {
    const pos = dom.getBoundingClientRect();
    pos.center = {
      x: pos.width / 2,
      y: pos.height / 2,
    };
    return pos;
  },
  getHeartX: (r, t) =>  // 由弧度得到 X 坐标
   550 + r * (16 * Math.pow(Math.sin(t), 3)) * 6,

  getHeartY: (r, t) =>  // 由弧度得到 Y 坐标
   240 - r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 4.5,


};
