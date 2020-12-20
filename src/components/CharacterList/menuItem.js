import { useSpring, animated } from 'react-spring'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useEffect } from 'react'



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }, 
}));

const MenuItem = ({ name, status, image, id, order,  onCharacherChange }) => {
    const classes = useStyles();
    const itemRef = useRef()
    const props = useSpring({
        to: { opacity: 1, bottom: '0', position: 'relative' },
        from: { opacity: 0, bottom: '-100px', position: 'relative' },
        delay: 180 * (order % 20)
    }) 

    return (
        <animated.div style={props} data-id={id}   >
            <ListItem ref={itemRef} onClick={() => { onCharacherChange(id); }}    >
                <ListItemAvatar>
                    <Avatar alt={name}  src={image} />
                </ListItemAvatar>
                <ListItemText
                    primary={`#${id}   ${name} `}
                    secondary={status}
                />
            </ListItem>
        </animated.div>
    )
}

export default MenuItem;