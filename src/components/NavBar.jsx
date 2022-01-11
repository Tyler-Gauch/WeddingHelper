/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import {
  Button,
  Card,
  Flex,
  SearchField,
  Text,
  useTheme,
  View,
  Grid
} from "@aws-amplify/ui-react";
export default function NavBar({signOut}) {
  var {tokens} = useTheme();
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
            <SearchField
              display="flex"
              shrink="0"
              size="default"
              labelHidden="true"
              variation="default"
            ></SearchField>
            <Button onClick={signOut}><Text variation="secondary">Sign out</Text></Button>
          </Flex>
        </View>
      </Grid>
    </Card>
  );
}
