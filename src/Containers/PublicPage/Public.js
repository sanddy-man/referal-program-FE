import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'



const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
})

export default function Public() {
    const classes = useStyles()
    const counter = useSelector(state => state.counter)

    return (
        <Typography variant="body2" color="textSecondary" component="p">
            Login to use Demo App!
        </Typography>
    )
}