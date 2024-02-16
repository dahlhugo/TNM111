
import './App.css'
import episode1 from './json/starwars-episode-1-interactions-allCharacters.json'
import episode2 from './json/starwars-episode-2-interactions-allCharacters.json'
import { Graph, DefaultNode, DefaultLink } from '@visx/network'
import { Box, ChakraProvider, Flex, VStack } from '@chakra-ui/react'
import NetworkGraph from './components/NetworkGraph'
import { ReactSVGElement, useEffect, useRef, useState } from 'react'
import { Episode, Link, NodeType } from './types/types'
import Details from './components/Details'

function App() {
  // const [nodeId, setNodeId] = useState<string | null>(null);
  const nodeRef = useRef("");
  const [details, setDetails] = useState<Node | Link | null>(null);

  var windowW = innerWidth;

  const handleNodeClick = (node: NodeType) => {
    if (nodeRef.current !== node.name) {
      nodeRef.current = node.name;
    } else {
      nodeRef.current = "";
    }
  };

  return (
    <>
      <ChakraProvider>
        <Flex flexDir={'row'} width={windowW} height={innerHeight} padding={10} >
          <Flex flex={3} background="red" flexDir={'column'}>
            <Details details={details}/>
          </Flex>
          <Flex flex={9} flexDir={'column'} justifyContent={'space-around'}>
            <NetworkGraph data={episode1} nodeRef={nodeRef} hoverNode={setDetails} clickNode={handleNodeClick} />
            <NetworkGraph data={episode2} nodeRef={nodeRef} hoverNode={setDetails} clickNode={handleNodeClick} />
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  )
}

export default App
