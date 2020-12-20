
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from "react-router-dom";
import { useMenuContext } from '../../Context/MenuContext';
import MenuItem from './item';

export const GET_CHRC_QUERY = gql`
query AllCharacters($page: Int){
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
     results {
         id
         status
         name
        image
     }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    drawer: {
        display: 'flex',
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: 340,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: '105px',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));

const CharacterListMenu = () => {
    const { data, error, loading, fetchMore } = useQuery(
        GET_CHRC_QUERY
    )
    const { selectedCharacterId } = useMenuContext();
    const [drawerStatus, setDrawerStatus] = useState(true);
    const classes = useStyles();
    const history = useHistory();
    const characters = data?.characters.results || [];
    const menuItemContainerRef = React.createRef(null);
 
    useEffect(() => {
        if (selectedCharacterId)
            handleCharacterChange(selectedCharacterId)
    }, [selectedCharacterId])

    const onUpdate = (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const info = fetchMoreResult.characters.info;
        const results = [
            ...prev.characters.results,
            ...fetchMoreResult.characters.results,
        ];
        return Object.assign({}, prev, {
            characters: {
                __typename: "Characters",
                results,
                info,
            },
        });
    };

    const handleCharacterChange = (id) => {
        let nextId = null;
        let prevId = null;
        let findIndex = characters.findIndex(c => c.id == id);
        if (findIndex > 0)
            prevId = characters[findIndex - 1].id;
        if (findIndex < characters.length)
            nextId = characters[findIndex + 1].id;

        history.push(`/character/${id}`, {
            id,
            nextId,
            prevId
        });

        const scrollDom = menuItemContainerRef.current.scrollComponent;
        const childrens = Array.from(scrollDom.children);
        let selectedNode = childrens.find(c => c.attributes['data-id'].value == id);
        let oldSelectedNode = childrens.find(c => c.className == 'selected-menu-item');
        if (selectedNode) {
            selectedNode.classList.add('selected-menu-item');
            if (oldSelectedNode) oldSelectedNode.classList.remove('selected-menu-item');
            let scrTopPosition = scrollDom.offsetParent.scrollTop;
            let scrBottomPosition = scrollDom.offsetParent.scrollTop + scrollDom.offsetParent.offsetHeight
            if (scrTopPosition > selectedNode.offsetTop || scrBottomPosition < selectedNode.offsetTop) {
                selectedNode.scrollIntoView(true)
            }
        }
    }

    const getNewCharacters = async () => {
        if (data) {
            return await fetchMore({
                variables: {
                    page: data.characters.info.next,
                },
                updateQuery: onUpdate,
            });
        }
    };
    if (loading) return (<p>Loading...</p>)
    return (
        <>
            <Drawer
                onMouseEnter={() => { setDrawerStatus(true) }}
                onMouseLeave={() => { setDrawerStatus(false) }}
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawerStatus,
                    [classes.drawerClose]: !drawerStatus,
                })}
                open={drawerStatus}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: drawerStatus,
                        [classes.drawerClose]: !drawerStatus,
                    }),
                }}
            >
                <InfiniteScroll 
                    pageStart={0}
                    ref={menuItemContainerRef}
                    style={{ position: 'relative' }}
                    loadMore={getNewCharacters}
                    hasMore={data?.characters.info.next}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                >

                    {error && <p >!--Error--!</p>}
                    {
                        characters
                            ? characters.map((char, i) => (
                                <MenuItem
                                    key={char.id}
                                    order={i}
                                    onCharacherChange={handleCharacterChange}
                                    {...char}
                                />
                            ))
                            : null
                    }
                </InfiniteScroll>
            </Drawer>
        </>
    );
};


export default CharacterListMenu;