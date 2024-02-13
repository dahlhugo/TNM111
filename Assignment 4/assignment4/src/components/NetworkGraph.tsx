import {Graph, DefaultLink, DefaultNode} from '@visx/network'
import { Episode, NodePosition } from '../types/types';
import { forwardRef } from 'react';

const NetworkGraph = forwardRef((data: Episode, ref) => {
    
    const getNodePosition: NodePosition = () => {

    }

    return (
        <svg>
            <Graph ref={ref} graph={episode1} nodeComponent={DefaultNode} linkComponent={DefaultLink} />
        </svg>
    );
});

export default NetworkGraph;