import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './compass.scss'

interface touches {
  clientX : number
  clientY : number
}

export default class compass extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    positions: [],
    countDown: 0,
    chooseIndex: null
  }

  touchEvent = (e) => {
    if (this.state.countDown > 0) {
      let positions : Array<any> = []
      for (let i = 0; i < 10; i++) {
        e.touches[i] ? positions.push(e.touches[i]) : null
      }
      this.setState({
        positions: positions
      })
    }
  }

  startEvent = () => {
    this.setState({
      chooseIndex: null,
      positions: []
    })
    let countDown = 11
    let Interval = setInterval(() => {
      if (countDown) {
        countDown--
        this.setState({
          countDown: countDown
        })
      } else {
        clearInterval(Interval)
        this.chooseEvent()
      }
    }, 1000)
  }

  chooseEvent = () => {
    let index = 0
    let Interval = setInterval(() => {
      if (index === 20) {
        clearInterval(Interval)
      } else {
        index++
        this.setState({
          chooseIndex: Math.round(Math.random() * this.state.positions.length)
        })
      }
    }, 100)
  }

  render () {
    const { positions, countDown, chooseIndex } = this.state
    // const Colors = ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffff00', '#99ff00', '#00ff00', '#00ffff', '#0000ff', '#6600ff']
    return (
      <View className='compass' onTouchStart={this.touchEvent} onTouchMove={this.touchEvent} onTouchEnd={this.touchEvent}>
        <Text className={['times', countDown ? null : 'none'].join(' ')}>{countDown}</Text>
        <View className={['startBtn', countDown ? 'none' : null].join(' ')} onClick={this.startEvent}>开始</View>
        <View className='playExp'>
          <Text className='text'>点击开始按钮屏幕开始倒计时，倒计时结束前请所有参与者将手指放在屏幕上，倒计时结束后停止手指检测，系统开始自动选人。</Text>
          <Text className='text'>受设备屏幕多点触控限制，最大支持10指，具体请参考您的手机配置说明。</Text>
        </View>
        {
          positions.map((item:touches, index) => {
            return (
              <View key={item.toString()} className={`${chooseIndex === index ? 'choosed' : null} touchPoint`} style={{left: item.clientX + 'px', top: item.clientY + 'px'}}></View>
            )
          })
        }
      </View>
    )
  }
}
