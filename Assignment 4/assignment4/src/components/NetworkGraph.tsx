import { forwardRef } from 'react';
import { Episode, Node } from '../types/types';

type NetworkGraphProps = {
    width: number,
    height: number,
    data: Episode
}

type NodeType = Node & {
    id: number,
    x: number,
    y: number,
}


const NetworkGraph = forwardRef<SVGSVGElement, NetworkGraphProps>((props: NetworkGraphProps, ref) => {
    const { width, height, data } = props;
   




    return (
        <></>
    );
});

export default NetworkGraph;