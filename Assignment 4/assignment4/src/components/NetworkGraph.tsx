import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Link, Node, NodeType} from '../types/types';
import {ForceGraph2D,} from 'react-force-graph';
import {Box} from '@chakra-ui/react';


type NetworkGraphProps = {
    data: {nodes: NodeType[], links: Link[]},
    highlightedNode: string,
    clickNode: (node: NodeType) => void,
    hoverNode: (node: Node | null) => void,
    hoverLink: (link: Link | null) => void,
    linkInterval: number[],
}

const NetworkGraph = ({ data, highlightedNode, hoverNode, clickNode, hoverLink, linkInterval }: NetworkGraphProps) => {
    const graphRef = useRef<any>();


    const paintRing = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.value, 0, Math.PI * 2);
        ctx.lineWidth = highlightedNode === node.name ? 3 : 1;
        ctx.strokeStyle = highlightedNode === node.name ? 'red' : "black";
        ctx.fillStyle = node.colour;
        ctx.fill();
        ctx.stroke();

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = `${node.value / 4}px Comic Sans MS`;
        ctx.fillStyle = "black"
        ctx.fillText(node.name, node.x, node.y)
    }, [highlightedNode]);

    

    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const filteredLinks = data.links.filter((link) => link.value >= linkInterval[0] && link.value <= linkInterval[1]);
        console.log(filteredLinks)
        // Extract node IDs from the filtered links
        const connectedNodeIds = new Set(filteredLinks.flatMap(({source, target}: {source: any, target: any})   => {
            if(typeof source === "number") return [source, target]
            return [source.id, target.id]
        }

        ));
        // Filter nodes to only include those connected to the filtered links
        const filteredNodes = data.nodes.filter((node) => connectedNodeIds.has(Number(node.id)));

        setFilteredData({...data, nodes: filteredNodes, links: filteredLinks});
    }, [data, linkInterval]);

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force('charge').strength(-200);
        }
    });

    useEffect(() => {}, [highlightedNode]);

    return (
        <Box border={2} borderRadius={5} borderStyle={'solid'}>
            <ForceGraph2D
                ref={graphRef}
                width={2 * (innerWidth / 3)}
                height={400}
                graphData={filteredData}
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