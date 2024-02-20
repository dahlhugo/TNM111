import { Dispatch, SetStateAction, forwardRef, useCallback, useEffect, useRef, MutableRefObject, memo } from 'react';
import { Episode, Link, Node, NodeType } from '../types/types';
import { ForceGraph2D, } from 'react-force-graph';
import { Box } from '@chakra-ui/react';


type NetworkGraphProps = {
    data: {nodes: NodeType[], links: Link[]},
    nodeRef: MutableRefObject<string>,
    clickNode: (node: NodeType) => void,
    hoverNode: (node: Node | null) => void,
    hoverLink: (link: Link | null) => void,
}

const NetworkGraph = ({ data, nodeRef, hoverNode, clickNode, hoverLink }: NetworkGraphProps) => {
    const graphRef = useRef<any>();


    const paintRing = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.value, 0, Math.PI * 2);
        ctx.lineWidth = nodeRef.current === node.name ? 3 : 1;
        ctx.strokeStyle = nodeRef.current === node.name ? 'red' : "black";
        ctx.fillStyle = node.colour;
        ctx.fill();
        ctx.stroke();

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = `${node.value / 4}px Comic Sans MS`;
        ctx.fillStyle = "black"
        ctx.fillText(node.name, node.x, node.y)
    }, [nodeRef]);

    



    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force('charge').strength(-200);
        }
    });



    return (
        <Box border={2} borderRadius={5} borderStyle={'solid'}>
            <ForceGraph2D
                ref={graphRef}
                width={2 * (innerWidth / 3)}
                height={400}
                graphData={data}
                nodeRelSize={2}
                nodeColor={(node: NodeType) => node.colour}
                nodeVal={(node: NodeType) => node.value}
                linkWidth={(link: Link) => link.value}
                onNodeClick={clickNode}
                onNodeHover={hoverNode}
                nodeCanvasObject={paintRing}
                onLinkHover={hoverLink}
                
            />
        </Box>
    );
};

export default memo(NetworkGraph);