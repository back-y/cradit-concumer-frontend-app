// import React from 'react';
import { React, useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import { Button, IconButton, Snackbar, Typography, Box } from '@mui/material'

import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { getComments, addComments, getOrderInComment } from 'src/redux/commentSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie'

// import Box from '@mui/material/Box';
// import Alert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

// import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';



// =====================

const theme = createTheme({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const Chat = () => {



    const [open, setOpen] = useState(false);

    const jwt = Cookies.get('jwt')
    const id = Cookies.get('id')
    const name = Cookies.get('name')
    const email = Cookies.get('email')
    const roles = Cookies.get('role')
    const phone = Cookies.get('phone')


    const classes = theme;

    const ord = useSelector(getOrderInComment)
    const order = ord.order

    const [creditId, setCreditId] = useState('')
    const [comment, setComment] = useState({ title: 'Single', body: 'Single comment', commentedBy: 'Warehouse' })

    const [comments, setComments] = useState([
        {
            title: 'title1',
            body: 'Body One',
            commentedBy: 'Chung',
        },
        {
            title: 'title2',
            body: 'Body Two',
            commentedBy: 'Chang'
        }
    ])

    const handleChange = e => {
        setComment({ ...comment, commentedBy: order.userName, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch()

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}credit/`;

    const onSubmit = (e) => {
        e.preventDefault();

        axios.get(baseUrl)
            .then((response) => {
                const credit = response.data.find((cred) => cred.orderId === order._id);

                if (credit) {
                    setCreditId(credit._id);

                    // console.log('########creditId', credit._id);

                    // Update comments using PATCH request
                    axios.patch(`${baseUrl}${credit._id}`, { comments: [comment] })
                        .then((patchResponse) => {
                            console.log('**************patchResponse.status ', patchResponse.status, '************patchResponse.data ', patchResponse.data);

                            if (patchResponse.status === 200) {
                                setOpen(true)
                                setTimeout(() => {
                                    setOpen(false);
                                }, 3000);
                            }

                            // Dispatch the action to update Redux state
                            dispatch(addComments(comment));
                        })
                        .catch((patchError) => {
                            console.log('Patch comment error:', patchError);

                            // Handle patching error if needed
                        });
                } else {
                    console.log('Credit information not found for user ID:', order.userId);
                }
            })
            .catch((fetchError) => {
                console.log('Fetch Credits Error:', fetchError);

                // Handle fetch error if needed
            });
    };


    console.log('from Comment Chat:', comments)
    const chat = comments;
    console.log(chat)


    return (
        <ThemeProvider theme={theme}>
            <>
                <Grid container >
                    <Grid item xs={12}>
                        <Typography variant="h5" className="header-message">Chat</Typography>
                    </Grid>
                </Grid>
                <Grid container component={Paper} className={classes.chatSection}>
                    <Grid item xs={3} className={classes.borderRight500}
                        sx={{
                            py: 2.5, width: '100%',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            marginBottom: '1rem',
                            backgroundColor: '#d7a1225b',
                            boxShadow: '0 1px 20px 1px black',
                            boxShadow: 'none',
                        }}
                    >
                        <List>
                            <ListItem
                                sx={{

                                    py: 2.5,
                                    width: '100%',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    boxShadow: '0 1px 20px 1px black',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: '0 1px 20px 1px black',
                                    }
                                }}
                                button key="RemySharp">
                                <ListItemIcon>
                                    <Avatar alt={name} src="https://material-ui.com/static/images/avatar/1.jpg" />
                                </ListItemIcon>
                                <ListItemText primary={name} ></ListItemText>
                            </ListItem>
                        </List>
                        <List >
                            <ListItem
                                sx={{

                                    // py: 2.5, 
                                    width: '100%',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    boxShadow: '0 1px 20px 1px black',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: '0 1px 20px 1px black',
                                    }
                                }}
                                button key="RemySharp">
                                <ListItemText primary={email} ></ListItemText>
                            </ListItem>
                            <ListItem
                                sx={{

                                    // py: 2.5, 
                                    width: '100%',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    boxShadow: '0 1px 20px 1px black',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: '0 1px 20px 1px black',
                                    }
                                }}
                                button key="RemySharp">
                                <ListItemText primary="User History"></ListItemText>
                            </ListItem>
                        </List>

                    </Grid>

                    <List className={classes.messageArea}>
                        {[comment].map(comment => (

                            <ListItem key={comment.id} container className={classes.messageArea}>
                                <Grid container xs={9}>


                                    <ListItemText
                                        align="right"
                                        primary={`Title: ${comment.title}`}
                                        secondary={
                                            <>
                                                <Grid item xs={12}>
                                                    <Typography component="span" variant="body2" color="textPrimary">
                                                        Body: {comment.body}
                                                    </Typography>
                                                </Grid>
                                                <br />
                                                <Grid item xs={12}>
                                                    By: {comment.commentedBy}
                                                </Grid>
                                            </>
                                        }
                                    />

                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid>

                    <Divider />

                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            autoHideDuration={3000} // Set the duration for auto-hiding the Alert
                            onClose={() => {
                                setOpen(false);
                            }}
                        >
                            You have successfully added a new comment!
                        </Alert>
                    </Collapse>

                    {/* <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Close me!
                        </Alert>
                    </Collapse> */}
                    {/* <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="success">This is a success alert — check it out!</Alert>
                    </Stack> */}
                    <form>
                        <Typography component="span" variant="body2" color="textPrimary">Add Comment </Typography>
                        <Grid onSubmit={e => e.preventDefault()} container style={{ padding: '20px' }}>
                            <Grid item xs={11}>
                                <TextField id="outlined-basic-email" label="Type Title" fullWidth type="text" name="title" onChange={handleChange} >

                                </TextField>
                                <br />
                                <br />
                                <TextField id="outlined-basic-email" label="Type Something" fullWidth type="text" name="body" onChange={handleChange} >

                                </TextField>
                            </Grid>

                            <Grid xs={1} align="right" alignItems={"center"}>
                                <Fab
                                    style={{ backgroundColor: '#d7a022', color: 'black' }}
                                    aria-label="add"
                                    type="submit" onClick={onSubmit}><SendIcon />
                                </Fab>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

            </>
        </ThemeProvider>


    );
}

export default Chat;