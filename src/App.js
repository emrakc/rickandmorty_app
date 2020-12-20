
import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { HttpLink } from 'apollo-link-http'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import CharacterDetail from './components/CaracterDetail/detail'
import CharacterListMenu from './components/CharacterList/list'

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import background from "./img/bg.jpg";
import MenuContextProvider from './Context/MenuContext'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#282c34',
    },
    secondary: {
      main: '#983334'
    }
  },
  overrides: {
    MuiTypography: {
      root: {
        color: '#818181'
      }
    },
    MuiButton: {
      root: {
        borderRadius: "16px",
        fontSize: "1.15rem",
        fontWeight: 700
      },
      containedPrimary: {
        color: 'white'
      },
      containedSecondary: {
        color: '#818181'
      }
    },
    MuiDrawer: {
      paper: {
        overflowX: 'hidden'
      }
    },
    MuiAvatar: {
      root: {
        width: '60px',
        height: '60px',
        borderRadius: '30%'
      }
    },
    MuiListItemText: {
      multiline: {
        marginTop: '7px',
        marginLeft: '17px'
      }
    },

  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    minHeight: '100vh',
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    width: "100%",
    height: "100vh",
    position: "relative",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPositionX: "center",
    backgroundPositionY: "center",

  },
  drawer: { 
    flexShrink: 0,
    whiteSpace: 'nowrap',
    display: "flex",
  },
  content: {
    flexGrow: 1,
    display: "flex",

  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <MenuContextProvider> 
          <div className={classes.root}>
            <nav className={classes.drawer} >
              <CharacterListMenu />
            </nav>
            <div className={classes.content}>
              <Switch>
                <Route exact path="/character/:id" component={CharacterDetail} />
              </Switch>
            </div>
          </div>
        </MenuContextProvider>
      </ApolloProvider>
    </ThemeProvider >

  );
}

export default App;
