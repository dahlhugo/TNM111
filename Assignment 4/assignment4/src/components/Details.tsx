import { Center, Text } from "@chakra-ui/react";
import { Link, Node } from "../types/types";
import { useEffect, useState } from "react";




type NodeDetailsProps = {
    nodeDetails: Node | null;
}

export const NodeDetails = ({nodeDetails} : NodeDetailsProps) => {
    

    if (nodeDetails) {
        return (
            <Center>
                <Text>Node Details: </Text>
                <Text>{`Node name: ${nodeDetails.name}`}</Text>
                <Text>{`Node value: ${nodeDetails.value}`}</Text>
            </Center>
        );
    } else {
        return (
            <Center>
                <Text>Node Details: </Text>
                <Text>Hover a node to see details</Text>
            </Center>
        );
    }

}

export const LinkDetails = (props: Link) => {
    const { source, target, value } = props;
    return (
        <Center>
            <Text>{source}</Text>
        </Center>
    )
}


