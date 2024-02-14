import { Episode, Link, Node, NodePosition } from '../types/types';
import { ForwardedRef, LegacyRef, RefObject, forwardRef, useEffect, useState } from 'react';
import *  as d3 from 'd3'

type NetworkGraphProps = {
    width: number,
    height: number,
    data: Episode
}

type NodeType = Node & {
    id: number ,
    x: number ,
    y: number ,
}


const NetworkGraph = forwardRef<SVGSVGElement, NetworkGraphProps>((props: NetworkGraphProps, ref) => {
    const {width, height, data} = props;
    const [renderNodes, setRenderNodes] = useState<NodeType[]>([]);

    useEffect(() => {
        if (ref && typeof ref !== 'function' && ref.current ) {
            const svg = d3.select(ref.current);
            const simulation = d3.forceSimulation(data.nodes as NodeType[])
                .force('charge', d3.forceManyBody().distanceMin(1000))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force('link', d3.forceLink().links(data.links));
    
            // Update node and link positions on each tick
        //     simulation.on("tick", () => {
        //     // Update node positions
        //     svg.selectAll(".node")
        //       .attr("cx", (d) => d.x)
        //       .attr("cy", (d) => d.y );
      
        //     // Update link positions
        //     svg.selectAll(".link")
        //       .attr("x1", (d) => d.source.x)
        //       .attr("y1", (d) => d.source.y)
        //       .attr("x2", (d) => d.target.x)
        //       .attr("y2", (d) => d.target.y);
        //   });
          console.log(simulation.nodes())
          setRenderNodes(simulation.nodes())
        }
        
        
    }, [])
    const Node: React.FC<NodeType> = (nodeData) => {
        return <circle cx={nodeData.x} cy={nodeData.y} r={nodeData.value} color={nodeData.colour}/>
    };
    
    // const Link: React.FC<Link> = (props) => {
    //     return ( 
    //         <line
    //             x1={renderNodes[props.source].x}
    //             y1={renderNodes[props.source].y}
    //             x2={renderNodes[props.target].x}
    //             y2={renderNodes[props.target].y}
    //             stroke="#999"
    //             strokeOpacity="0.6"
    //             strokeWidth={props.value}
    //         />
    //     );
    // };

    

    
    return (
        <svg ref={ref} width={width} height={height} viewBox={"0 0 " + width + " " + height}>
            <g>
                {renderNodes.map((node: NodeType) => (
                    <Node key={node.id} colour={node.colour} id={node.id} name={node.name} value={node.value} x={node.x} y={node.x}  />
                ))}
            </g>
            <g>
                {/* {data.links.map((link) => (
                    <Link key={link.source + '-' + link.target} source={link.source} target={link.target} value={link.value} />
                ))} */}
            </g>
        </svg>
    );
});

export default NetworkGraph;