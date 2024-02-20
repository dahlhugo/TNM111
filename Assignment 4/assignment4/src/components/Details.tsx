import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { Link, Node } from "../types/types";
import { useEffect, useState } from "react";




type NodeDetailsProps = {
    nodeDetails: Node | null;
}

export const NodeDetails = ({ nodeDetails }: NodeDetailsProps) => {


    if (nodeDetails) {
        return (
            <Center display={"flex"} flexDir={"column"} m={1} p={2} borderColor={"black"} border={2} borderRadius={5} borderStyle={"solid"}>
                <Text>Node Details: </Text>
                <Flex flexDir={"row"} gap={4}>
                    <Text>{`Name: ${nodeDetails.name}`}</Text>
                    <Text>{`Value: ${nodeDetails.value}`}</Text>
                </Flex>
            </Center>
        );
    } else {
        return (
            <Center display={"flex"} flexDir={"column"} m={1} p={2} borderColor={"black"} border={2} borderRadius={5} borderStyle={"solid"}>
                <Text>Node Details: </Text>
                <Text>Hover a node to see details</Text>
            </Center>
        );
    }

}

type LinkDetailsProps = {
    linkDetails: any | null,
}

export const LinkDetails = ({ linkDetails }: LinkDetailsProps) => {
    if (linkDetails) {
        const { source, target, value } = linkDetails;
        return (
            <Center display={"flex"} flexDir={"column"} m={1} p={2} borderColor={"black"} border={2} borderRadius={5} borderStyle={"solid"}>
                <Text>Link Details: </Text>
                <Flex flexDir={"row"} alignItems={"space-around"}>
                    <Text>{`Source: ${source.name}`}</Text>
                    <Text>{`Target: ${target.name}`}</Text>
                    <Text>{`Value: ${value}`}</Text>
                </Flex>
            </Center>
        )
    }
    else {
        return (
            <Center display={"flex"} flexDirection={'column'} m={1} p={2} borderColor={"black"} border={2} borderRadius={5} borderStyle={"solid"}>
                <Text>Link Details: </Text>
                <Text>Hover a link to see details</Text>
            </Center>
        )
    }
}


