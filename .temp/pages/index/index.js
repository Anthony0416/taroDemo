import Nerv from "nervjs";
import { Component } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import './index.scss';
export default class Index extends Component {
  constructor() {
    super(...arguments);
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */

    this.state = {
      positions: []
    };
  }
  componentWillMount() {}
  render() {
    const { positions } = this.state;
    const Colors = ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffff00', '#99ff00', '#00ff00', '#00ffff', '#0000ff', '#6600ff'];
    return <View className="index" onTouchStart={this.touchEvent} onTouchMove={this.touchEvent}>
        {positions.map((item, index) => {
        return <View className="touchPoint" style={{ background: Colors[index], left: item.clientX, top: item.clientY }}></View>;
      })}
      </View>;
  }
  config = {
    navigationBarTitleText: '首页'
  };
  touchEvent = e => {
    let positions = [];
    for (let i = 0; i < 10; i++) {
      e.touches[i] ? positions.push(e.touches[i]) : '';
    }
    this.setState({
      positions: positions
    });
    console.log(positions);
  };

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
  }

  componentDidShow() {
    super.componentDidShow && super.componentDidShow();
  }

  componentDidHide() {
    super.componentDidHide && super.componentDidHide();
  }

}