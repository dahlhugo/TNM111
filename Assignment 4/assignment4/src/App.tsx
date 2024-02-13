
import './App.css'
import episode1 from './json/starwars-episode-1-interactions-allCharacters.json'
import episode2 from './json/starwars-episode-2-interactions-allCharacters.json'
import {Graph, DefaultNode, DefaultLink} from '@visx/network'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import NetworkGraph from './components/NetworkGraph'
import { useRef, useState } from 'react'

function App() {
  const firstGraphRef = useRef(null);
  const secondGraphRef = useRef(null);

  const [firstGraphDimensions, setFirstGraphDimensions] = useState({width: 0, height: 0})
  const [secondGraphDimensions, setSecondGraphDimensions] = useState({width: 0, height: 0})

  return (
    <>  
      <ChakraProvider>
        <Flex flexDir={'row'} width={'100vw'} height={'100vh'} padding={10}>
          <Flex flex={3} background="red" flexDir={'column'}>
            <NetworkGraph ref={firstGraphRef}/>
            
          </Flex>
          <Flex flex={9} background={"blue"} flexDir={'column'}>
            
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  )
}

export default App
