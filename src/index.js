import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'

import store from './store/store'
import App from './components/app'

import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ConfigProvider
    theme={{
      components: {
        Pagination: {
          itemActiveBg: '#1890ff',
          colorPrimary: '#fff',
          colorPrimaryHover: '#91caff',
          alignSelf: 'center',
        },
      },
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
)
