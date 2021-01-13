/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { actions } from '../../redux/user'
import { actions as inviteActions } from "../../redux/invite";


const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
})

export default function Home() {
    const classes = useStyles()
    const currentUser = useSelector(state => state.user)
    const inviteState = useSelector(state => state.invite)
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [formError, setFormError] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEmail('');
        setFormError(false);
    };

    useEffect(() => {
        dispatch(actions.getCredits(currentUser.jwt, currentUser.userData.id))
        dispatch(inviteActions.getInvites(currentUser.jwt, currentUser.userData.id))
    }, [])

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const createInvite = () => {
        if (validateEmail(email)) {
            if (email === currentUser.userData.email) {
                return;
            }
            setFormError(false);
            dispatch(inviteActions.createInvite(currentUser.jwt, currentUser.userData.id, email));
            handleClose();
        } else {
            setFormError(true);
        }
    }

    return (
        <Container>
            <h2>Profile</h2>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="la_la_land_silhouette-wide.jpg"
                        title="la la land"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {currentUser.userData.email}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Credits: {currentUser.credits}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Created At: {currentUser.userData.createdAt}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => {}}>
                        Update Profile
                    </Button>
                </CardActions>
            </Card>
            <h2>Invites</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center'}}>
                {inviteState.invites.map(invite => <Card key={invite.id} className={classes.card} style={{ marginRight: 10, marginBottom: 10 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {invite.email}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Accepted: {invite.registered + ''}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Created At: {invite.createdAt}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => {}}>
                            more detail
                        </Button>
                    </CardActions>
                </Card>)}
                <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Invite</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To send invite to your friends, please enter his/her email address here. We will send invite email
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error={formError}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={createInvite} color="primary">
                    Send Invite
                </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}