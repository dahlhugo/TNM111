
import './App.css'
import episode1 from './json/starwars-episode-1-interactions-allCharacters.json'
import episode2 from './json/starwars-episode-2-interactions-allCharacters.json'
import {Graph, DefaultNode, DefaultLink} from '@visx/network'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import NetworkGraph from './components/NetworkGraph'
import { ReactSVGElement, useEffect, useRef, useState } from 'react'
import { Episode } from './types/types'

function App() {
  const firstGraphRef = useRef<SVGSVGElement>(null);
  // const secondGraphRef = useRef(null);

  const [firstGraphDimensions, setFirstGraphDimensions] = useState({width: 500, height: 500})
  // const [secondGraphDimensions, setSecondGraphDimensions] = useState({width: 0, height: 0})

  useEffect(() => {
    if(firstGraphRef.current) {
      setFirstGraphDimensions({
        width: firstGraphRef.current.clientWidth,
        height: firstGraphRef.current.clientHeight
      })
    }
  }, []);

  return (
    <>  
      <ChakraProvider>
        <Flex flexDir={'row'} width={'100vw'} height={'100vh'} padding={10}>
          <Flex flex={3} background="red" flexDir={'column'}>
            
            
          </Flex>
          <Flex flex={9} background={"blue"} flexDir={'column'} justifyContent={'space-around'}>
            <NetworkGraph ref={firstGraphRef}  data={episode1} width={firstGraphDimensions.width} height={firstGraphDimensions.height} />
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  )
}

export default App
