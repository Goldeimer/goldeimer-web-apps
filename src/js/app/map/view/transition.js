import { easeCubic, easePoly } from 'd3-ease'
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl'

import { addPrepare, withShortId } from '@lib/redux'
import { isInRange, sanitizeWithinRange } from '@lib/util/number'

const ZOOM_LIMIT = {
    min: 4,
    max: 18
}

const isValidLatitude = (latitude) => isInRange(latitude, -90, 90)
const isValidLongitude = (longitude) => isInRange(longitude, -180, 180)

const areValidCoordinates = ({ latitude, longitude }) => (
    isValidLatitude(latitude) && isValidLongitude(longitude)
)

const isValidZoom = (zoom) => isInRange(zoom, ZOOM_LIMIT.min, ZOOM_LIMIT.max)

const sanitizeZoom = (zoom) => sanitizeWithinRange(
    zoom,
    ZOOM_LIMIT.min,
    ZOOM_LIMIT.max
)

const easePolyOneHalf = easePoly.exponent(1.5)

const makeTransition = (
    transitionDuration,
    transitionEasing,
    transitionInterpolator
) => ({
    transitionDuration,
    transitionEasing,
    transitionInterpolator
})

const makeFlyToTransition = () => makeTransition(
    'auto',
    easeCubic,
    new FlyToInterpolator({
        curve: 1.414,
        speed: 0.8
    })
)

const makeLinearTransition = (delta = 1) => makeTransition(
    500 + 100 * (sanitizeWithinRange(Math.abs(delta), 1, 20) - 1),
    easePolyOneHalf,
    new LinearInterpolator()
)

const makeZoomTransition = (delta = 1) => makeTransition(
    500 + 100 * (sanitizeWithinRange(Math.abs(delta), 1, 20) - 1),
    easePolyOneHalf,
    new LinearInterpolator()
)

const transition = {
    initialState: { id: null },
    reducers: {
        flyTo: (state, { payload: { id, latitude, longitude, zoom } }) => {
            if (!areValidCoordinates({ latitude, longitude })) {
                return state
            }

            return {
                id,
                latitude,
                longitude,
                zoom: sanitizeZoom(zoom),
                ...makeFlyToTransition()
            }
        },
        jump: (state, { payload: { id, latitude, longitude } }) => {
            if (!areValidCoordinates({ latitude, longitude })) {
                return state
            }

            return {
                id,
                latitude,
                longitude,
                transitionDuration: 0
            }
        },
        linearTransitionTo: (
            state,
            { payload: { id, latitude, longitude, zoom } }
        ) => {
            if (!areValidCoordinates({ latitude, longitude })) {
                return state
            }

            return {
                id,
                latitude,
                longitude,
                zoom: sanitizeZoom(zoom),
                ...makeLinearTransition()
            }
        },
        zoomTo: (state, { payload: { id, zoom, delta = 1 } }) => {
            if (!isValidZoom(zoom)) {
                return state
            }

            return {
                id,
                zoom,
                ...makeZoomTransition(delta)
            }
        }
    }
}

transition.reducers = Object.fromEntries(
    Object.entries(transition.reducers).map(
        ([name, reducer]) => [name, addPrepare(reducer, withShortId)]
    )
)

export {
    transition as default,
    sanitizeZoom,
    ZOOM_LIMIT
}