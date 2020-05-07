import React from 'react'
import { render } from 'react-dom'

import MerchantMap from './MerchantMap/MerchantMap'

const container = document.getElementById(
    'react-app-container-merchant-map'
)

/* eslint-disable-next-line no-unused-expressions */
container ? render(<MerchantMap />, container) : false