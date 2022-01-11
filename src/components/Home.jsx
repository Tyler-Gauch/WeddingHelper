import { Button } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import React from "react";

export default function Home(props) {

    return (
        <>
            <div>Just a simple wedding helper site! View and edit guests on the guests page.</div>
            <Button onClick={() => DataStore.clear()}>Clear all local data</Button>
        </>
    );
}