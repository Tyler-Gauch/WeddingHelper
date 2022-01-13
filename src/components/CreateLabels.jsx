import { Alert, Flex, Grid, TextField, View, SelectField, Button, Table, TableHead, TableCell, TableBody, TableRow, Pagination, Expander, ExpanderItem, IconCheckCircleOutline } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";
import { capitalize, guestFullName } from "../helpers/ModelHelpers";
import ReactToPrint from 'react-to-print';
import './CreateLabels.scss';
import { listGuests, listHouseholds } from "../graphql/queries";
import { paginateQuery } from "../helpers/GraphQLHelper";

const FONTS = [
    {style: 'Arial', family: "sans-serif"},
    {style: 'Verdana', family: "sans-serif"},
    {style: 'Helvetica', family: "sans-serif"},
    {style: 'Tahoma', family: "sans-serif"},
    {style: 'Trebuchet MS', family: "sans-serif"},
    {style: 'Times New Roman', family: "serif"},
    {style: 'Georgia', family: "serif"},
    {style: 'Garamond', family: "serif"},
    {style: 'Courier New', family: "monospace"},
    {style: 'Brush Script MT', family: "cursive"}
];

function Label({household, formality, fontStyle, fontSize, guests}) {
    const {addressLine1, addressLine2, city, state, zipcode} = household;
    const address = [addressLine1, addressLine2].filter(f => f).join(" ");

    guests.sort((l, r) => {
        if (l.prefix === r.prefix) {
            return 0;
        } else if (l.prefix === 'mr' && r.prefix === 'mrs') {
            return -1;
        } else {
            return 1;
        }
    });

    let names = '';
    if (formality === 'formal' && guests.length === 2 && [...new Set(guests.map(g => g.lastName))].length === 1) {
        names = guests.map(g => `${capitalize(g.prefix)}.`).join(" and ");
        names += ` ${guestFullName(guests[0])}`;
    } else {
        const namesList = guests.map(g => {
            let name = guestFullName(g);
            if (formality === "semiformal" || formality === 'formal') {
                name = `${capitalize(g.prefix)}. ${name}`;
            }
    
            return name;
        });
    
        if (guests.length == 1 && guests[0].hasPlusOne) {
            namesList.push("Guest");
        }

        names = namesList.join(" and ")
    }

    const font = FONTS.filter(f => f.style === fontStyle)[0];
    const T = ({children}) => (
        <div
            style={{
                fontSize: `${fontSize}px`,
                ...(font && {fontFamily: `'${font.style}',${font.family}`}),
            }}
        >{children}</div>
    );

    return (
        <View style={{padding: "10px"}}>
            <T>{names}</T>
            <T>{address}</T>
            <T>{city}, {state} {zipcode}</T>
        </View>
    );
} 

export default function CreateLabels(props) {

    const [households, setHouseholds] = useState([]);
    const [labelsPerRow, setLabelsPerRow] = useState(5);
    const [formality, setFormality] = useState("casual");
    const [font, setFont] = useState();
    const [printRef, setPrintRef] = useState();
    const [fontSize, setFontSize] = useState(12);
    const [tablePageSize, setTablePageSize] = useState(10);
    const [tableCurrentPage, setTableCurrentPage] = useState(1);
    const [lastSelectedHousehold, setLastSelectedHousehold] = useState(null);

    useEffect(() => {
        if (props.wedding) {
            loadData();
        } else {
            setHouseholds([]);
        }
    }, [props.wedding]);

    const loadData = async () => {
        const householdData = await paginateQuery({
            query: listHouseholds,
            variables: {
                filter: {
                    weddingID: {eq: props.wedding.id}
                }
            }
        });

        const guestData = await paginateQuery({
            query: listGuests,
            variables: {
                filter: {
                    weddingID: {eq: props.wedding.id}
                }
            }
        });

        const households = householdData.map(household => {
            return {
                household: household,
                printLabel: true,
                selected: false,
                guests: guestData.filter(g => g.householdId == household.id),
            };
        });

        setHouseholds(households);
    };

    const onPageSelect = (pageNumber) => {
        setTableCurrentPage(pageNumber);
    }

    const onNextPage = (e) => {
        setTableCurrentPage(tableCurrentPage + 1);
    }

    const onPreviousPage = (e) => {
        setTableCurrentPage(tableCurrentPage - 1);
    }

    const updateSelectedPrintLabels = (printLabel) => {
        makeHouseholdUpdates(households.filter(h => h.selected), {printLabel: printLabel})
    }

    const selectSingleHousehold = (household) => {
        const householdsToUpdate = households.filter(h => h.selected);
        const updatesToMake = householdsToUpdate.map(h => { return {selected: false}});

        householdsToUpdate.push(household);
        updatesToMake.push({selected: !household.selected});

        if (!household.selected) {
            setLastSelectedHousehold(household);
        } else {
            setLastSelectedHousehold(null);
        }

        makeHouseholdUpdates(householdsToUpdate, updatesToMake);
    }
    
    const selectAllBetween = (a, b) => {
        const indexA = households.findIndex(h => h.household.id === a.household.id);
        const indexB = households.indexOf(b);

        if (indexA < indexB) {
            makeHouseholdUpdates(households.slice(indexA, indexB+1), {selected: true});
        } else {
            makeHouseholdUpdates(households.slice(indexB, indexA+1), {selected: true});
        }
    }

    const makeHouseholdUpdates = (householdsToUpdate, expectedFields) => {
        setHouseholds(households.map((h) => {
            const i = householdsToUpdate.indexOf(h);
            if (i !== -1) {
                if (Array.isArray(expectedFields)) {
                    return {...h, ...expectedFields[i]}
                }

                return {...h, ...expectedFields};
            }
            
            return h;
        }));
    }

    const onClickHousehold = (e, household) => {
        if (e.ctrlKey) {
            makeHouseholdUpdates([household], {selected: !household.selected});
            if (!household.selected) {
                setLastSelectedHousehold(household);
            } else {
                setLastSelectedHousehold(null);
            }
        } else if (e.shiftKey) {
            selectAllBetween(lastSelectedHousehold, household);
            setLastSelectedHousehold(household);
        } else {
            selectSingleHousehold(household);
        }
    }



    return props.wedding ? (
        <>
            <Flex direction="row" justifyContent="center">
                <Flex direction="column" justifyContent="center" alignItems="center">
                    <Flex direction="row" alignItems='flex-end'>
                        <TextField label="Labels Per Row" value={labelsPerRow} onChange={(e) => setLabelsPerRow(e.target.value)} type="number"/>
                        <SelectField label="Formality" onChange={(e) => setFormality(e.target.value)} >
                            <option value="casual">Casual</option>
                            <option value="semiformal">Semi-Formal</option>
                            <option value="formal">Formal</option>
                        </SelectField>
                        <SelectField label="Font" onChange={(e) => setFont(e.target.value)}>
                            <option value={null}>Default</option>
                            {FONTS.map(f => (
                                <option key={f.style} value={f.style}>{f.style}</option>
                            ))}
                        </SelectField>
                        <TextField label="Font Size" value={fontSize} onChange={(e) => setFontSize(e.target.value)} type="number" />
                        {printRef && <ReactToPrint content={() => printRef} trigger={() => <Button>Print</Button>} />}
                    </Flex>
                    <Flex style={{
                        width: '8.5in',
                    }}>
                        <Grid templateColumns={Array.from("c".repeat(labelsPerRow)).map(() => "1fr").join(" ")} ref={response => setPrintRef(response)}>
                            {households.filter(h => h.printLabel).map(({household, guests}) => {
                                return (
                                    <Label key={household.id} household={household} style={{padding: "10px"}} guests={guests} formality={formality} fontStyle={font} fontSize={fontSize}/>
                                );
                            })}           
                        </Grid>
                    </Flex>
                </Flex>
            </Flex>

            <Expander className="DockedGuestTable" type="single" isCollapsible={true} defaultValue="households">
                <ExpanderItem title="Households" value="households">
                    <Flex justifyContent="center" alignItems="stretch">
                        <Flex direction="row" style={{width: '100%'}}>
                            <Flex direction="column" style={{width: '100%'}}>
                                <Table highlightOnHover={true} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell as="th">Select</TableCell>
                                            <TableCell as="th">Address Household</TableCell>
                                            <TableCell as="th">Guests</TableCell>
                                            <TableCell as="th">Print Label</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {households
                                            .slice((tableCurrentPage-1) * tablePageSize, ((tableCurrentPage-1) * tablePageSize) + tablePageSize)
                                            .map((householdConfig) => (
                                            <TableRow key={householdConfig.household.id} onClick={(e) => onClickHousehold(e, householdConfig)} style={{cursor: 'pointer', ...(householdConfig.selected && {backgroundColor: 'whitesmoke'})}}>
                                                <TableCell>{householdConfig.selected && <IconCheckCircleOutline />}</TableCell>
                                                <TableCell>{householdConfig.household.addressLine1}</TableCell>
                                                <TableCell>{householdConfig.guests.map(g => guestFullName(g)).join(", ")}</TableCell>
                                                <TableCell>
                                                    {householdConfig.printLabel ? 'Yes' : 'No'}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Pagination
                                    currentPage={tableCurrentPage}
                                    totalPages={Math.ceil(households.length / tablePageSize)}
                                    siblingCount={1}
                                    onChange={onPageSelect}
                                    onNext={onNextPage}
                                    onPrevious={onPreviousPage}
                                />
                            </Flex>
                            <Flex direction="column">
                                <Button size="small" onClick={() => updateSelectedPrintLabels(true)}>Print</Button>
                                <Button size="small" onClick={() => updateSelectedPrintLabels(false)}>Don't Print</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </ExpanderItem>
            </Expander>
        </>
    ) : (<Alert variation="warning">Please select a wedding!</Alert>);
}