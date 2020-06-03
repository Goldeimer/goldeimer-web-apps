import combineSlices from '@lib/redux/combineSlices'

import { map } from '@map'
import { settings } from '@settings'

const {
    actions: APP,
    reducer: ROOT_REDUCER
} = combineSlices({
    map,
    settings
})

export {
    APP as default,
    ROOT_REDUCER
}
