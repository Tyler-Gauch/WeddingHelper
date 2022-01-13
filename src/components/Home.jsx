import { Text, Button, Loader, Table, TableBody, TableCell, TableHead, TableRow, TextField, Heading, Flex } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { updateGuest, updateHousehold, updateWedding } from "../graphql/mutations";
import { listGuests, listHouseholds, listWeddings } from "../graphql/queries";
import { paginateQuery } from "../helpers/GraphQLHelper";

export default function Home(props) {

    const [weddings, setWeddings] = useState(null);
    const [guests, setGuests] = useState();
    const [households, setHouseholds] = useState();
    const [newAuthorizedUser, setNewAuthorizedUser] = useState();
    const [loading, setLoading] = useState();
    const [selectedWedding, setSelectedWedding] = useState();

    useEffect(() => {
        if (!weddings) {
            loadData();
        }
    });

    const loadData = async () => {
        const allWeddings = await paginateQuery({
            query: listWeddings,
            variables: {}
        });

        const allGuests = await paginateQuery({
            query: listGuests,
            variables: {}
        });

        const allHouseholds = await paginateQuery({
            query: listHouseholds,
            variables: {}
        });

        setWeddings(allWeddings);
        setGuests(allGuests);
        setHouseholds(allHouseholds);
    }

    const addAuthorizedUser = async () => {
        if (!newAuthorizedUser) {
            return;
        } else if (!window.confirm("Are you sure you want to give " + newAuthorizedUser + " access to this wedding?")) {
            return;
        }

        setLoading(true);

        console.log("Loading data...");
        const wedding = {
            ...selectedWedding,
            authorizedUsers: [...selectedWedding.authorizedUsers, newAuthorizedUser]
        }

        const householdsToUpdate = households
            .filter(h => h.weddingID === wedding.id)
            .filter(h => h.authorizedUsers.indexOf(newAuthorizedUser) === -1)
            .map(h => {
                return {
                    ...h,
                    authorizedUsers: [...h.authorizedUsers, newAuthorizedUser]
                }
            });
        console.log("Loaded " + householdsToUpdate.length + " households");

        const guestsToUpdate = guests
            .filter(g => g.weddingID == wedding.id)
            .filter(g => g.authorizedUsers.indexOf(newAuthorizedUser) === -1)
            .map(g => {
                return {
                    ...g,
                    authorizedUsers: [...g.authorizedUsers, newAuthorizedUser]
                }
            });

        console.log("Loaded " + guestsToUpdate.length + " guests");
    
        if (selectedWedding.authorizedUsers.indexOf(newAuthorizedUser) === -1) {
            console.log("Updating wedding " + wedding.id);
            await API.graphql({query: updateWedding, variables: {input: {
                id: wedding.id,
                name: wedding.name,
                authorizedUsers: wedding.authorizedUsers,
                _version: wedding._version
            }}});
        }

        for (const g of guestsToUpdate) {
            console.log("Updating guest " + g.id);
            await API.graphql({query: updateGuest, variables: {input: {
                id: g.id,
                prefix: g.prefix,
                firstName: g.firstName,
                lastName: g.lastName,
                suffix: g.suffix,
                householdId: g.householdId,
                hasPlusOne: g.hasPlusOne,
                withBride: g.withBride,
                weddingID: g.weddingID,
                authorizedUsers: g.authorizedUsers,
                _version: g._version,
            }}});
        }

        for (const h of householdsToUpdate) {
            console.log("Updating household " + h.id);
            await API.graphql({query: updateHousehold, variables: {input: {
                id: h.id,
                addressLine1: h.addressLine1,
                addressLine2: h.addressLine2,
                city: h.city,
                state: h.state,
                zipcode: h.zipcode,
                weddingID: h.weddingID,
                authorizedUsers: h.authorizedUsers,
                _version: h._version,
            }}});
        }
        setLoading(false);
    }

    return (
        <>
            <Heading level={4}>Your Weddings</Heading>
            {loading && <><Loader /> <Text>Saving don't refresh page</Text></> } 
            {!loading && selectedWedding && <Flex direction="row" alignItems="center" justifyContent="right">
                <TextField placeholder="New authorized user id" value={newAuthorizedUser} onChange={(e) => setNewAuthorizedUser(e.target.value)} />
                <Button onClick={addAuthorizedUser}>Add</Button>
            </Flex>}
            <Table highlightOnHover={true}>
                <TableHead>
                    <TableRow>
                        <TableCell as="th">Name</TableCell>
                        <TableCell as="th"># Guests</TableCell>
                        <TableCell as="th"># Households</TableCell>
                        <TableCell as="th">Authorized User Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weddings && weddings
                        .map((w) => (
                        <TableRow key={w.id} onClick={() => setSelectedWedding(w)} style={{cursor: 'pointer', ...(selectedWedding === w && {backgroundColor: 'whitesmoke'})}}>
                            <TableCell>{w.name}</TableCell>
                            <TableCell>{guests && guests.filter(g => g.weddingID == w.id).length}</TableCell>
                            <TableCell>{households && households.filter(h => h.weddingID == w.id).length}</TableCell>
                            <TableCell>{w.authorizedUsers.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}