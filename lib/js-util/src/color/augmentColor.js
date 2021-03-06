import { createMuiTheme } from '@material-ui/core/styles'

const {
    palette: { augmentColor: augmentColorImpl }
} = /*@__PURE__*/ createMuiTheme({})

const augmentColor = (
    color,
    mainShade = 'main',
    lightShade = 'light',
    darkShade = 'dark'
) => augmentColorImpl({ main: color }, mainShade, lightShade, darkShade)

export default augmentColor
