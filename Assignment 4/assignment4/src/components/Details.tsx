import { Center, Text } from "@chakra-ui/react";
import { Link, Node } from "../types/types";

type DetailsProps = {
    details: Node | Link | null
}


const NodeDetails = (details: Node) => {
    return (
    <Center>
        <Text></Text>
    </Center>
    );
}



const LinkDetails = (details: Link) => {
    return (
        <Center>
            <Text>fadslkj</Text>
        </Center>
    )
}

const Details = ({details} : DetailsProps) => {

    const isNode = (details: Node | Link) => {
        return (details as Node).name in details
    }
    if(details != null) {
        return (
            <Center>
                {
                    isNode(details) ? (details: Node) => <NodeDetails details={details}></NodeDetails> 
                    : (details: Link) => { return <LinkDetails details={details}/>}
                }
            </Center>
        );

    } else {
        return <></>;
    }
}

export default Details;