import { Table, TableCell, TableRow, TableHead, TableBody, Heading, Grid, View, Button, Flex, TextField, Alert, IconDelete, Text } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { CSVUploadModal, Modal } from ".";
import { Household } from '../models';

function validateHousehold(household) {
    return household.addressLine1
        && household.city 
        && household.state
        && household.zipcode
        && household.zipcode.length === 5;
}

function AddHouseholdModal({show, onClose, onSave}) {

    const [addressLine1, setAddressLine1] = useState(null);
    const [addressLine2, setAddressLine2] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zipcode, setZipcode] = useState(null);
    const [error, setError] = useState();

    const saveHousehold = async () => {

        const household = new Household({
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            zipcode: zipcode,
        });
        
        if (!validateHousehold(household)) {
            setError("Missing address, city, state, zipcode, or zipcode is not valid");
            return;
        }

        try {
            await onSave(household);
            reset();
        } catch (err) {
            console.log(err);
            setError(err);
        }

    }

    const reset = () => {
        setAddressLine1(null);
        setAddressLine2(null);
        setCity(null);
        setState(null);
        setZipcode(null);
        setError(null);
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Add a new household"
        >
            {error && <Alert variation="error">{error}</Alert>}
            <TextField label="Address Line 1" onChange={(e) => setAddressLine1(e.target.value)}/>
            <TextField label="Address Line 2" onChange={(e) => setAddressLine2(e.target.value)}/>
            <TextField label="City" onChange={(e) => setCity(e.target.value)}/>
            <TextField label="State" onChange={(e) => setState(e.target.value)}/>
            <TextField label="Zipcode" onChange={(e) => setZipcode(e.target.value)}/>
            <Button onClick={saveHousehold}>Add</Button>
        </Modal>
    );
}

export default function Households(props) {

    const [households, setHouseholds] = useState([]);
    const [showAddHousehold, setShowAddHousehold] = useState(false);
    const [showCsvUpload, setShowCsvUpload] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await DataStore.query(Household);
        setHouseholds(data);
    };

    const uploadHouseholds = async (csvData) => {
        if (window.confirm("Save households?")) {

            for (let i = 0; i < csvData.length; i++) {
                const newHousehold = new Household(csvData[i]);
                await DataStore.save(newHousehold);
            }

            setShowCsvUpload(false);
        }
    }

    const saveNewHousehold = async (household) => {
        setShowAddHousehold(false);
        await DataStore.save(household);
        await loadData();
    }

    const deleteHousehold = async (household) => {
        if (household.guests) {
            alert("The house still has guests, can't delete");
            return;
        }
        await DataStore.delete(household);
        await loadData();
    }

    return (
        <>
            <Grid templateColumns={"1fr 1fr"} templateRows={"1fr"}>
                <View columnStart="1" columnEnd="2">
                    <Heading level={3}>Households</Heading>
                </View>
                <Flex direction="row" justifyContent="right" columnStart="2" columnEnd="-1">
                    <Button onClick={() => setShowAddHousehold(true)}>Add Household</Button>
                    <Button onClick={() => setShowCsvUpload(true)}>Upload</Button>
                </Flex>
            </Grid>
            <AddHouseholdModal
                show={showAddHousehold}
                onClose={() => setShowAddHousehold(false)}
                onSave={saveNewHousehold}/>
            <CSVUploadModal
                show={showCsvUpload}
                onClose={() => setShowCsvUpload(false)}
                onSave={uploadHouseholds}
                validateRow={r => {
                    if (!validateHousehold(r)) {
                        return "Missing address, city, state, zipcode, or zipcode is not valid";
                    }

                    return null;
                }}/>
            <Table
                highlightOnHover={true}
            >
                <TableHead>
                <TableRow>
                    <TableCell as="th">Id</TableCell>
                    <TableCell as="th">Address</TableCell>
                    <TableCell as="th">City</TableCell>
                    <TableCell as="th">State</TableCell>
                    <TableCell as="th">Zipcode</TableCell>
                    <TableCell as="th"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {households.map(household => (
                        <TableRow key={household.id}>
                            <TableCell><Text isTruncated={true}>{household.id}</Text></TableCell>
                            <TableCell>{[household.addressLine1, household.addressLine2].filter(f => f).join(" ")}</TableCell>
                            <TableCell>{household.city}</TableCell>
                            <TableCell>{household.state}</TableCell>
                            <TableCell>{household.zipcode}</TableCell>
                            <TableCell>
                                <IconDelete onClick={() => deleteHousehold(household)} style={{cursor: "pointer"}}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}