
import './App.css'
import episode1 from './json/starwars-episode-1-interactions-allCharacters.json'
import episode2 from './json/starwars-episode-2-interactions-allCharacters.json'
import {Graph, DefaultNode, DefaultLink} from '@visx/network'
import { Box, ChakraProvider, Flex, VStack } from '@chakra-ui/react'
import NetworkGraph from './components/NetworkGraph'
import { ReactSVGElement, useEffect, useRef, useState } from 'react'
import { Episode, NodeType } from './types/types'

function App() {
  const [highlightNodes, setHighlightNodes] = useState<NodeType | null>(null);

  

  return (
    <>  
      <ChakraProvider>
        <Flex flexDir={'row'} width={'100vw'} height={'100vh'} padding={10}>
          <Flex  flex={3} background="red" flexDir={'column'}>
             menu
          </Flex>
          <Flex  flex={9} flexDir={'column'} justifyContent={'space-around'}>
                <NetworkGraph data={episode1} highlightNodes={highlightNodes} setHighlightNodes={setHighlightNodes}/>
                <NetworkGraph data={episode2} highlightNodes={highlightNodes} setHighlightNodes={setHighlightNodes} />
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  )
}

export default App
