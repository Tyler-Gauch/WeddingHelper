/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Flex,
  Text,
  useTheme,
  View,
  Grid,
  SelectField,
  TextField,
  Alert
} from "@aws-amplify/ui-react";
import { API, DataStore } from "aws-amplify";
import { Wedding } from "../models";
import { Modal } from ".";
import {listWeddings} from '../graphql/queries';
import {createWedding} from '../graphql/mutations';
import {v4 as uuid } from 'uuid';

function AddWeddingModal({show, onClose, onSave}) {
  
  const [name, setName] = useState();
  const [error, setError] = useState();

  const saveWedding = async () => {

      if (!name) {
          setError("Add a friendly name to your wedding!");
      }        

      const wedding = new Wedding({
          name: name
      });

      try {
          await API.graphql({query: createWedding, variables: {input: wedding}});
          onSave(wedding.id);
          reset();
      } catch (err) {
          console.log(err);
          setError(err);
      }

  }

  const reset = () => {
      setName(null);
  }

  return (
      <Modal
          show={show}
          onClose={onClose}
          title="Create wedding"
      >
          {error && <Alert variation="error">{error}</Alert>}
          <TextField label="Friendly Name" onChange={(e) => setName(e.target.value)}/>
          <Button onClick={saveWedding}>Create</Button>
      </Modal>
  );
}

export default function NavBar({signOut, user, onWeddingSelect, selectedWedding}) {
  var {tokens} = useTheme();

  const [weddings, setWeddings] = useState();
  const [showCreateWeddingModal, setShowCreateWeddingModal] = useState(false);

  useEffect(() => {
    if (!weddings) {
      loadData();
    }
  }, [weddings, setWeddings]);

  const loadData = async () => {
    const {data: {listWeddings: {items: weddings}}} = await API.graphql({query: listWeddings});
    setWeddings(weddings.filter(w => !w._deleted));
  }

  return (
    <Card variation="elevated" columnStart="1" columnEnd="-1">
      <Grid templateColumns="1fr 1fr" templateRows="1fr">
        <View
            columnStart="1"
            columnEnd="3"
        >
          <Flex
            gap="40px"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            basis={1}
          >
            <Text
              variation="primary"
              fontSize="2rem"
            >Our Wedding</Text>
          </Flex>
        </View>
        <View
            variation="elevated"
            columnStart="3"
            columnEnd="-1"
        >
          <Flex
            gap="32px"
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            basis={1}
          >
            <SelectField onChange={(e) => e.target.value ? onWeddingSelect(e.target.value) : null} value={selectedWedding ? selectedWedding.id : ''}>
              <option key="null">Select a wedding</option>
              {weddings && weddings.map(w => {
                return (
                  <option key={w.id} value={w.id}>{w.name}</option>
                );
              })}
            </SelectField>
            <Button onClick={() => setShowCreateWeddingModal(true)}>New Wedding</Button>
            <Button onClick={signOut}><Text variation="secondary">Sign out</Text></Button>
          </Flex>
        </View>
      </Grid>
      <AddWeddingModal onSave={w => {
        setShowCreateWeddingModal(false);
        onWeddingSelect(w);
      }} show={showCreateWeddingModal} onClose={() => setShowCreateWeddingModal(false)}/>
    </Card>
  );
}
