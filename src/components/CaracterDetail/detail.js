

import React, { useState, useEffect, useRef } from 'react'
import { gql, useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EpisodesGrid from './episodeList/episodeList'
import { useLocation, useHistory } from "react-router-dom";
import { useMenuActionContext } from '../../Context/MenuContext';
import spinner from '../../img/spinner.gif';

const GET_SINGLE_CHAR_QUERY = gql` 
query ($id:ID!=1){
    character(id: $id) { 
       id  
      name 
      status 
      species
      type 
       gender 
      origin {
         name  
      } 
       location   {
         name 
           
      } 
       image 
      episode  {
        id
      }   
    }
}  
`;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        display: 'flex',
        flexDirection: 'row'
    },
    spinner: {
        width: '100%',
        height: '100vh',
        backdropFilter: "blur(4px)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'rgb(231,231,231,0.3)',
        background: 'radial-gradient(circle, rgb(247, 247, 247, 0.2) 0%, rgb(117, 117, 117, 0.5) 100%);',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

const CharcterDetail = ({ match }) => {
    const { id } = match.params;
    const { state } = useLocation();
    if (!state || !id) {
        history.push(`/`);
    }
    const classes = useStyles();
    const history = useHistory();

    const { setSelectedCharacterId } = useMenuActionContext();
    const { data, error, loading } = useQuery(
        GET_SINGLE_CHAR_QUERY,
        {
            variables: { id: parseInt(id || 1) }
        }
    )

    if (error) return (<p>error :(</p>)
    if (loading) return (<div className={classes.spinner}>   <img src={spinner} />   </div>)



    const { character } = data;
    let episodes = [];
    if (character && character.episode) {
        let reverseData = [...character.episode].reverse();
        let lastFiveData = reverseData.length < 5
            ? reverseData
            : reverseData.slice(0, 5)
        episodes = lastFiveData.map(item => parseInt(item.id))
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardMedia
                            style={{ maxWidth: '300px' }}
                            component="img"
                            height="340"
                            image={character.image}
                        />
                        <CardContent style={{ width: '100%' }}>
                            <Grid xs={12} style={{ display: "flex", justifyContent: "space-between" }} spacing={1}  >
                                <Grid xs={8} >
                                    {state.prevId &&
                                        <Button
                                            color="primary"
                                            onClick={() => { setSelectedCharacterId(state.prevId) }}
                                        >
                                            PREV CHARACTER
                                </Button>
                                    }
                                    {state.nextId &&
                                        <Button
                                            variant='outlined'
                                            color="secondary"
                                            onClick={() => { setSelectedCharacterId(state.nextId) }}
                                        >
                                            NEXT CHARACTER
                                 </Button>
                                    }
                                </Grid>
                                <Grid xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        variant='text'
                                        color="secondary"
                                        onClick={() => { history.push(`/`); }}
                                    >
                                        CLOSE
                                 </Button>
                                </Grid>
                            </Grid>
                            <Grid spacing={1} style={{ display: "flex", flex: 1 }} alignContent='flex-start'>
                                <Typography gutterBottom variant="h4"  >      #{character.id}       </Typography>

                            </Grid>
                            <Typography gutterBottom variant="h3"  >  {character.name}    </Typography>
                            <Typography variant="body" component="p">{`species : ${character.species}`}  </Typography>
                            <Typography variant="body" component="p">{`gender :  ${character.gender}`}   </Typography>
                            <Typography variant="body" component="p">{`status : ${character.status}`}   </Typography>
                            <Typography variant="body" component="p">{`type : ${character.type}`}   </Typography>
                            <Typography variant="body" component="p">{`location :  ${character.location.name}`}   </Typography>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} >
                    <EpisodesGrid list={episodes} />
                </Grid>

            </Grid>
        </div>


    );
}


export default CharcterDetail;