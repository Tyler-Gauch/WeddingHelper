import { View, Card, IconClose, Heading, Grid, Flex, Divider } from "@aws-amplify/ui-react";
import React from "react";
import './Modal.scss';

export default function Modal({show, onClose, children, title}) {

    return (
        <>
        {show &&
            <>
                <View className="Modal-Overlay">
                    <View className="Modal">
                        <Card variation="elevated" className="Modal-Content">
                            <Grid templateColumns={"1fr 1fr"} templateRows={"1fr"}>
                                <View columnStart="1" columnEnd="2"><Heading level={4}>{title ?? 'Modal'}</Heading></View>
                                <Flex alignItems="center" justifyContent="right" columnStart="2" columnEnd="-1">
                                    <IconClose onClick={onClose} style={{cursor: "pointer"}}/>
                                </Flex>
                            </Grid>
                            <Divider/>
                            {children}
                        </Card>
                    </View>
                </View>
            </>
        }
        </>
    );
}