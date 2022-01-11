import { Amplify } from 'aws-amplify';

import { AmplifyProvider, Authenticator, Link, Grid, Card, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

import { Home, Guests, NavBar, CreateLabels, Households } from './components';
import {theme} from './theme';
import { BrowserRouter, Route, Routes, Link as ReactRouterLink } from 'react-router-dom';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function App() {
  return (
    <BrowserRouter>
      <AmplifyProvider theme={theme}>
        <Authenticator>
          {({ signOut, user }) => (
              <Grid
                columnGap="0.5rem"
                rowGap="0.5rem"
                templateColumns="1fr 1fr 1fr 1fr 1fr 1fr"
                templateRows="10fr"
              >
                <NavBar signOut={signOut}/>
                <View
                    columnStart="1"
                    columnEnd="2"
                    rowStart="2"
                    rowEnd="-1"
                >
                  <Card variation='elevated' width="100%" className='navlink'>
                    <Link as={ReactRouterLink} to="/">Home</Link>
                  </Card>
                  <Card variation='elevated' width="100%" className='navlink'>
                    <Link as={ReactRouterLink} to="/guests">Guests</Link>
                  </Card>
                  <Card variation='elevated' width="100%" className='navlink'>
                    <Link as={ReactRouterLink} to="/households">Households</Link>
                  </Card>
                  <Card variation='elevated' width="100%" className='navlink'>
                    <Link as={ReactRouterLink} to="/labels">Labels</Link>
                  </Card>
                </View>
                <Card
                    variation="elevated"
                    columnStart="2"
                    columnEnd="-1"
                    rowStart="2"
                    rowEnd="-1"
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/guests" element={<Guests />} />
                    <Route path="/households" element={<Households />} />
                    <Route path="/labels" element={<CreateLabels />} />
                  </Routes>
                </Card>
            </Grid>
          )}
        </Authenticator>
      </AmplifyProvider>
    </BrowserRouter>
  );
}