import React from 'react'
import { PropTypes } from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    iconButtonEdgeEnd: {
        marginLeft: theme.spacing(3)
    },
    iconButtonEdgeStart: {
        marginLeft: theme.spacing(3)
    }
}))

const CloseButton = ({
    onClose,
    edge
}) => {
    const classes = useStyles()

    return (
        <IconButton
            className={
                edge === 'end'
                    ? classes.iconButtonEdgeEnd
                    : edge === 'start'
                        ? classes.iconButtonEdgeStart
                        : ''
            }
            color="inherit"
            edge={edge}
            onClick={onClose}
            aria-label="close"
        >
            <CloseIcon />
        </IconButton>
    )
}

CloseButton.propTypes = {
    onClose: PropTypes.func.isRequired,
    edge: PropTypes.string
}

CloseButton.defaultProps = {
    edge: 'end'
}

export default CloseButton