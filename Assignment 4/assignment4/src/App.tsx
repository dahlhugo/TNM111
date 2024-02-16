
import './App.css'
import episode1 from './json/starwars-episode-1-interactions-allCharacters.json'
import episode2 from './json/starwars-episode-2-interactions-allCharacters.json'
import { Graph, DefaultNode, DefaultLink } from '@visx/network'
import { Box, ChakraProvider, Flex, VStack } from '@chakra-ui/react'
import NetworkGraph from './components/NetworkGraph'
import { ReactSVGElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Episode, Link, Node } from './types/types'
import  { NodeDetails } from './components/Details'

function App() {
  // const [nodeId, setNodeId] = useState<string | null>(null);
  const nodeRef = useRef("");
  const [nodeDetails, setNodeDetails] = useState<Node | null>(null);
  const [linkDetails, setLinkDetails] = useState<Link | null>(null);
  //const memoEpisode = useMemo(() => episode1, [])
  


  var windowW = innerWidth;

  const handleNodeClick = useCallback((node: Node) => {
    if (nodeRef.current !== node.name) {
      nodeRef.current = node.name;
    } else {
      nodeRef.current = "";
    }
  }, []);

  const handleNodeHover = useCallback((node: any | null) => {
    if(node)
      setNodeDetails(node);
    
    setNodeDetails(node || null);
  }, [])
  // const handleLinkHover = (link: any | null) => {
  //   if(link)
  //     setLinkDetails(link);
    
  //   setLinkDetails(link || null);
  // }

  return (
    <>
      <ChakraProvider>
        <Flex flexDir={'row'} width={windowW} height={innerHeight} padding={10} >
          <Flex flex={3} background="red" flexDir={'column'}>
            {nodeDetails?
              <NodeDetails nodeDetails={nodeDetails}/> :
              <NodeDetails nodeDetails={null}/>
            }
          </Flex>
          <Flex flex={9} flexDir={'column'} justifyContent={'space-around'}>
            <NetworkGraph data={episode1} nodeRef={nodeRef} hoverNode={handleNodeHover} clickNode={handleNodeClick} />
            {/* <NetworkGraph data={episode2} nodeRef={nodeRef} hoverNode={handleNodeHover} clickNode={handleNodeClick} /> */}
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  )
}

export default App
