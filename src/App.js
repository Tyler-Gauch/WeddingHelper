import { Amplify, API } from 'aws-amplify';

import { AmplifyProvider, Authenticator, Link, Grid, Card, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

import { Home, Guests, NavBar, CreateLabels, Households } from './components';
import {theme} from './theme';
import { BrowserRouter, Route, Routes, Link as ReactRouterLink } from 'react-router-dom';

import awsExports from './aws-exports';
import { useState } from 'react';
import { getWedding } from './graphql/queries';

Amplify.configure(awsExports);

export default function App() {

  const [wedding, setWedding] = useState();

  const onWeddingChange = async (wantedWeddingId) => {
    const { data: { getWedding: w } } = await API.graphql({query: getWedding, variables: {id: wantedWeddingId}});
    setWedding(w);
  }

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
                <NavBar signOut={signOut} user={user} onWeddingSelect={(w) => onWeddingChange(w)} selectedWedding={wedding}/>
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
                    <Route path="/guests" element={<Guests wedding={wedding}/>} />
                    <Route path="/households" element={<Households wedding={wedding}/>} />
                    <Route path="/labels" element={<CreateLabels wedding={wedding}/>} />
                  </Routes>
                </Card>
            </Grid>
          )}
        </Authenticator>
      </AmplifyProvider>
    </BrowserRouter>
  );
}