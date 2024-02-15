import { Dispatch, SetStateAction, forwardRef, useCallback, useEffect, useRef } from 'react';
import { Episode, Link, Node, NodeType } from '../types/types';
import { ForceGraph2D,  } from 'react-force-graph';


type NetworkGraphProps = {
    data: Episode,
    highlightNodes: NodeType | null,
    setHighlightNodes: Dispatch<SetStateAction<NodeType | null>>
}

const NetworkGraph = ({data, highlightNodes, setHighlightNodes}: NetworkGraphProps) => {
    const graphRef = useRef<any>();

    const paintRing = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.value, 0, Math.PI * 2, false);
        ctx.fillStyle = highlightNodes?.name === node.name ?  'red': node.colour;
        ctx.fill();
    }, [highlightNodes]);

    const handleNodeClick = (node: NodeType) => {
        if(node != highlightNodes) {
            setHighlightNodes(node);
        } else{
            setHighlightNodes(null);
        }
    }
    
    const new_nodes: NodeType[] = data.nodes.map((node: Node, i) => {
        const new_node: NodeType = {
            id: i,
            colour: node.colour,
            name: node.name,
            value: node.value
        }
        return new_node;
    });
    console.log(new_nodes)

    const graphData = {
        nodes: new_nodes,
        links: data.links
    }

    useEffect(() => {
        if(graphRef.current){
            graphRef.current.d3Force('charge').strength(-150);
            ForceGraph2D.prototype

        }
    });

    return (
        <ForceGraph2D
            ref={graphRef}
            height={400}
            graphData={graphData}
            nodeRelSize={2} 
            nodeColor={(node: NodeType) => node.colour} 
            nodeVal={(node: NodeType) => node.value} 
            nodeLabel={(node: NodeType) => node.name} 
            linkWidth={(link: Link) => link.value}
            onNodeClick={handleNodeClick}
            nodeCanvasObject={paintRing}
            />
    );
};

export default NetworkGraph;