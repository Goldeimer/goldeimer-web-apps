import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@material-ui/core/Divider'

import { toggleTerm } from 'actions/merchantMapActions'
import TAXONOMIES from 'enum/taxonomies'

import StandardDrawer from 'components/StandardDrawer/StandardDrawer'
import ToggleSwitchList from 'components/ToggleSwitchList/ToggleSwitchList'

const FilterDrawer = (props) => {
    const selectedTerms = useSelector(
        (state) => (state.settings.filter.selectedTerms)
    )

    const dispatch = useDispatch()

    const handleTermChange = (taxonomyId, termId) => {
        dispatch(toggleTerm(taxonomyId, termId))
    }

    return (
        <StandardDrawer {...props}>
            {TAXONOMIES.map(
                ({ taxonomyId, taxonomyName, terms }, index) => (
                    <Fragment key={taxonomyId}>
                        {index === 0 ? <Divider /> : null}
                        <ToggleSwitchList
                            handleItemChange={
                                (termId) => (
                                    handleTermChange(taxonomyId, termId)
                                )
                            }
                            items={terms.map(({ termId, termName }) => ({
                                itemKey: termId,
                                itemLabel: termName
                            }))}
                            selectedItemIds={selectedTerms[taxonomyId]}
                            title={taxonomyName}
                        />
                        <Divider />
                    </Fragment>
                )
            )}
        </StandardDrawer>
    )
}

export default FilterDrawer