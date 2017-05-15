import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import './PageHome.less';
import util from '../../app/util';

const keyWords = [
  '哈哈', '呵呵', '我们', '晴天', '杭州', '大学', '郑州', '运动会',
];
class PageHome extends Component {

  componentDidMount() {
    // this.drawHeart();
    setTimeout(() => { this.goToCenterStart(); }, 1000);
    // for (let i = 0; i < 100; i++) {
    //   console.log(util.getRandom(1, 100));
    // }
  }


  goToCenterStart = () => {
    const pos = util.getPos(document.getElementById('container'));
    console.log(pos);
    // 四个开始区域
    const deviation = 100;
    const startArr = [
      // 右
      {
        x: {
          min: pos.left - deviation,
          max: pos.left,
        },
        y: {
          min: 0,
          max: pos.bottom,
        },
      },
      // 上
      {
        x: {
          min: pos.left,
          max: pos.right + deviation,
        },
        y: {
          min: pos.top - deviation,
          max: pos.top,
        },
      },
      // 左
      {
        x: {
          min: pos.right,
          max: pos.right + deviation,
        },
        y: {
          min: pos.top,
          max: pos.bottom + deviation,
        },
      },
      // 下
      {
        x: {
          min: pos.left - deviation,
          max: pos.right,
        },
        y: {
          min: pos.bottom,
          max: pos.bottom + deviation,
        },
      },
    ];
    this.i = 0;
    this.num = 300;
    this.goToCenterStartIntervalId = setInterval(() => { this.gotoCenter(pos, startArr); }, 1);
  }

  gotoCenter = (pos, startArr) => {
    const div = document.createElement('div');
    const start = startArr[util.getRandom(0, 4)];

    const style = div.style;
    style.position = 'absolute';
    style.left = `${util.getRandom(start.x.min, start.x.max) - pos.left}px`;
    style.top = `${util.getRandom(start.y.min, start.y.max) - pos.top}px`;
    div.innerHTML = keyWords[Math.floor(Math.random() * keyWords.length)];

    const from = {
      x: style.left,
      y: style.top,
    };

    const to = {
      x: pos.center.x,
      y: pos.center.y,
    };
    div.data = to;

    div.addEventListener('webkitAnimationEnd', () => { // 动画结束时事件
      style.left = `${to.x}px`;
      style.top = `${to.y}px`;
    }, false);
    const clsname = util.drawGoToCenterCss(from, to);

    div.className = clsname;
    setTimeout(() => {
      document.getElementById('container').appendChild(div);
    }, 100);

    this.i++;
    if (this.i >= this.num) {
      clearInterval(this.goToCenterStartIntervalId);
    }
  }


  // 开始画心
  drawHeart = () => {
    this.arr = [];
    this.r = 4;
    this.i = 0;
    this.num = 180;
    this.time = 10;
    this.radian = Math.PI;// 弧度设为初始弧度
    this.startRadian = Math.PI;
    this.radianDecrement = Math.PI / this.num * 2;
    this.intervalId = setInterval(() => { this.printHeart(); }, 1);
  }

  // 画心的每一帧
  printHeart = () => {
    this.radian = this.radianDecrement * this.i;
    const x = util.getHeartX(this.r, this.radian);
    const y = util.getHeartY(this.r, this.radian);

    const div = document.createElement('div');

    const style = div.style;

    style.position = 'absolute';
    style.top = `${y}px`;
    style.left = `${x}px`;
    // style.width = '1px';
    // style.height = '1px';
    // style.background = 'red';
    style.fontSize = `${Math.random() * 20 + 12}px`;
    style.transform = `rotate(${Math.random() * 120}deg)`;
    style.opacity = Math.random() + 0.2;

    div.innerHTML = keyWords[Math.floor(Math.random() * keyWords.length)];
    // div.innerHTML = this.i;
    // 下面这个算法是消除两个尖端重复太多
    const deviation = 10;
    if (this.i < deviation || this.i > this.num - deviation) {
      this.i += 3;
    } else if (this.i > (this.num / 2 - deviation) && this.i < (this.num / 2 + deviation)) {
      this.i += 4;
    } else {
      this.i ++;
    }

    // this.i += 1;

    document.getElementById('container').appendChild(div);

    if (this.i >= this.num) {
      clearInterval(this.intervalId);
    }
  }


  render() {
    return (
      <div className="page-home" id="test">
        <div id="container" className="container" />
      </div>
    );
  }
}

ReactDOM.render(<PageHome />, document.getElementById('App'));

