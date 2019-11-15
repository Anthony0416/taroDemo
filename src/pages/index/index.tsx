import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import './index.scss'

interface list {
  icon : string
  name : string
  path : string
}

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '迷你小工具'
  }

  state = {
    lists: [
      {
        icon: 'icon-zhinanzhen',
        name: '指南针',
        path: '/pages/compass/compass',
      },
      {
        icon: 'icon-duoren',
        name: '幸运儿',
        path: '/pages/party/party',
      },
      {
        icon: 'icon-shijian',
        name: '国际时间',
        path: '/pages/party/party',
      },
      {
        icon: 'icon-saoma',
        name: '二维码识别',
        path: '/pages/party/party',
      },
      {
        icon: 'icon-bofangqi-danmugundongkai',
        name: '弹幕发送',
        path: '/pages/party/party',
      }
    ]
  }

  render () {
    const { lists } = this.state
    return (
      <View className='index'>
        {
          lists.map((item:list, index) => {
            return (
              <Navigator key={index} url={item.path}>
                <Text className={`iconfont ${item.icon}`}></Text>
                <Text className='name'>{item.name}</Text>
              </Navigator>
            )
          })
        }
      </View>
    )
  }
}
