import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import { PropTypeColor } from '../../feature'

const useStyles = makeStyles(({ palette, spacing }) => ({
    avatar: ({ color }) => {
        const backgroundColor = color.main || palette.primary.main

        return {
            color: palette.getContrastText(backgroundColor),
            backgroundColor
        }
    },
    cardHeader: {
        '& .MuiCardHeader-avatar': {
            marginRight: spacing(1.5)
        }
    },
    content: {
        padding: spacing(2),
        '&:last-child': {
            paddingBottom: spacing(2)
        }
    },
    secondaryIconComponentWrap: {
        marginRight: spacing(1)
    },
    title: {
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    },
    textSecondary: {
        color: palette.text.secondary
    },
    textTertiary: {
        color: palette.text.disabled
    }
}))

const FeatureMarkerDetailCard = ({
    city,
    color,
    iconComponent: IconComponent,
    placeName,
    primaryTermName,
    postCode,
    secondaryTerms,
    street
}) => {
    const classes = useStyles({ color })

    return (
        <Card elevation={3}>
            <CardHeader
                avatar={(
                    <Avatar
                        aria-label={primaryTermName}
                        className={classes.avatar}
                    >
                        <IconComponent />
                    </Avatar>
                )}
                classes={{ title: classes.title }}
                className={classes.cardHeader}
                subheader={primaryTermName}
                title={placeName}
            />
            <Divider />
            <CardContent className={classes.content}>
                <Typography
                    component="p"
                    variant="body2"
                >
                    {street}
                    <br />
                    <span className={classes.textSecondary}>
                        {`${postCode} ${city}`.trim()}
                    </span>
                </Typography>
                <Box display="flex" mt={1}>
                    {secondaryTerms.map(
                        ({
                            color: secondaryColor,
                            iconComponent: SecondaryIconComponent,
                            termName
                        }) => {
                            if (!termName) {
                                return (
                                    <span
                                        className={
                                            classes.secondaryIconComponentWrap
                                        }
                                        key={secondaryColor.main}
                                    >
                                        <SecondaryIconComponent
                                            color={secondaryColor}
                                        />
                                    </span>
                                )
                            }

                            return (
                                <Tooltip
                                    aria-label={termName}
                                    key={`${termName}:${secondaryColor.main}`}
                                    title={termName}
                                >
                                    <span
                                        className={
                                            classes.secondaryIconComponentWrap
                                        }
                                    >
                                        <SecondaryIconComponent
                                            color={secondaryColor}
                                        />
                                    </span>
                                </Tooltip>
                            )
                        }
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}

FeatureMarkerDetailCard.propTypes = {
    city: PropTypes.string.isRequired,
    color: PropTypeColor.isRequired,
    iconComponent: PropTypes.elementType.isRequired,
    placeName: PropTypes.string.isRequired,
    primaryTermName: PropTypes.string.isRequired,
    postCode: PropTypes.string,
    secondaryTerms: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypeColor,
            iconComponent: PropTypes.elementType,
            termName: PropTypes.string
        })
    ),
    street: PropTypes.string.isRequired
}

FeatureMarkerDetailCard.defaultProps = {
    postCode: '',
    secondaryTerms: []
}

export default memo(FeatureMarkerDetailCard)
