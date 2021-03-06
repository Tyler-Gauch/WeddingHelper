import { Table, TableCell, TableRow, TableHead, TableBody, Heading, Grid, View, Button, Flex, TextField, Alert, IconDelete, SelectField, CheckboxField } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { CSVUploadModal, Modal } from ".";
import { createGuest, deleteGuest as deleteGuestMutation } from "../graphql/mutations";
import { listGuests } from "../graphql/queries";
import { paginateQuery } from "../helpers/GraphQLHelper";
import { guestFullName, capitalize } from "../helpers/ModelHelpers";
import { Guest } from '../models';

function validateGuest(guest) {
    return guest.firstName && guest.lastName && guest.prefix;
}

function AddGuestModal({show, onClose, onSave, wedding}) {

    const [prefix, setPrefix] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [suffix, setSuffix] = useState();
    const [hasPlusOne, setHasPlusOne] = useState(false);
    const [withBride, setWithBride] = useState(true);
    const [error, setError] = useState();

    const saveGuest = async () => {

        const guest = new Guest({
            prefix: prefix.toLowerCase(),
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            suffix: suffix,
            hasPlusOne: hasPlusOne,
            weddingID: wedding.id,
            withBride: withBride,
        });

        if (!validateGuest(guest)) {
            setError("Missing first name, last name, or prefix.");
        }        

        try {
            await onSave(guest);
            reset();
        } catch (err) {
            console.log(err);
            setError(err);
        }

    }

    const reset = () => {
        setPrefix(null);
        setFirstName(null);
        setLastName(null);
        setSuffix(null);
        setHasPlusOne(false);
        setError(null);
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Add a new guest"
        >
            {error && <Alert variation="error">{error}</Alert>}
            <SelectField label="Prefix" onChange={(e) => setPrefix(e.target.value)}>
                <option></option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="ms">Ms.</option>
                <option value="mx">Mx.</option>
            </SelectField>
            <TextField label="First Name" onChange={(e) => setFirstName(e.target.value)}/>
            <TextField label="Last Name" onChange={(e) => setLastName(e.target.value)}/>
            <TextField label="Suffix" onChange={(e) => setSuffix(e.target.value)}/>
            <CheckboxField label="Has plus one" onChange={(e) => setHasPlusOne(e.target.checked)}/>
            <SelectField label="Affiliation" onChange={(e) => setWithBride(e.target.value === 'bride')}>
                <option value='bride'>Bride</option>
                <option value='groom'>Groom</option>
            </SelectField>
            <Button onClick={saveGuest}>Add</Button>
        </Modal>
    );
}

export default function Guests(props) {

    const [guests, setGuests] = useState([]);
    const [showAddGuest, setShowAddGuest] = useState(false);
    const [showCsvUpload, setShowCsvUpload] = useState(false);

    useEffect(() => {
        if (props.wedding) {
            loadData();
        } else {
            setGuests([]);
        }
    }, [props.wedding]);

    const loadData = async () => {
        const loadedGuests = await paginateQuery({
            query: listGuests,
            variables: {
                filter: {
                    weddingID: {eq: props.wedding.id}
                },
            }});
        
        setGuests(loadedGuests);
    };

    const saveNewGuest = async (guest) => {
        const currentGuest = guestFullName(guest);
        if (guests.filter(g => guestFullName(g) === currentGuest).length > 0) {
            throw `${currentGuest} is already in the list!`;
        }

        setShowAddGuest(false);
        await API.graphql({query: createGuest, variables: {input: guest}})
        await loadData();
    }

    const deleteGuest = async ({id, _version}) => {
        await API.graphql({query: deleteGuestMutation, variables: {input: {id: id, _version: _version}}});
        await loadData();
    }

    const uploadGuests = async (csvData) => {
        for (let i = 0; i < csvData.length; i++) {
            const newGuest = new Guest({
                ...csvData[i],
                withBride: csvData[i].withBride ? true : false,
                hasPlusOne: csvData[i].hasPlusOne ? true : false,
                weddingID: props.wedding.id
            });
            await API.graphql({query: createGuest, variables: {input: newGuest}});
        }

        setShowCsvUpload(false);
        await loadData();
    }

    const totalBrideGuests = guests.reduce((c, g) => g.withBride ? c+1+(g.hasPlusOne?1:0) : c, 0);
    const totalGroomGuests = guests.reduce((c, g) => !g.withBride ? c+1+(g.hasPlusOne?1:0) : c, 0);

    return props.wedding ? (
            <>
                <Grid templateColumns={"1fr 1fr"} templateRows={"1fr"}>
                    <View columnStart="1" columnEnd="2">
                        <Heading level={3}>Guest List</Heading>
                    </View>
                    <Flex direction="row" justifyContent="right" columnStart="2" columnEnd="-1">
                        <Button onClick={() => setShowAddGuest(true)}>Add Guest</Button>
                        <Button onClick={() => setShowCsvUpload(true)}>Upload</Button>
                    </Flex>

                </Grid>
                <AddGuestModal
                    show={showAddGuest}
                    onClose={() => setShowAddGuest(false)}
                    onSave={saveNewGuest}
                    wedding={props.wedding}/>
                <CSVUploadModal
                    show={showCsvUpload}
                    onClose={() => setShowCsvUpload(false)}
                    onSave={uploadGuests}
                    validateRow={r => {
                        if (!validateGuest(r)) {
                            return "Missing first name, last name, or prefix";
                        }

                        return null;
                    }}/>
                <Table
                    highlightOnHover={true}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell as="th">Prefix</TableCell>
                            <TableCell as="th">Name</TableCell>
                            <TableCell as="th">Plus one</TableCell>
                            <TableCell as="th">Affliation B: {totalBrideGuests} G: {totalGroomGuests}
                            </TableCell>
                            <TableCell as="th"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guests.map(guest => (
                            <TableRow key={guest.id}>
                                <TableCell>{capitalize(guest.prefix)}.</TableCell>
                                <TableCell>{guestFullName(guest)}</TableCell>
                                <TableCell>{guest.hasPlusOne ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{guest.withBride ? 'Bride' : 'Groom'}</TableCell>
                                <TableCell>
                                    <IconDelete onClick={() => deleteGuest(guest)} style={{cursor: "pointer"}}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        ) : (<Alert variation="warning">Please select a wedding!</Alert>);
}