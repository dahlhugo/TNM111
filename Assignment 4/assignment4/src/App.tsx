import './App.css'
import episode1 from './json/starwars-episode-1-interactions-allCharacters.json'
import episode2 from './json/starwars-episode-2-interactions-allCharacters.json'
import allEpisodes from './json/starwars-full-interactions-allCharacters.json'
import {ChakraProvider, Flex} from '@chakra-ui/react'
import NetworkGraph from './components/NetworkGraph'
import {useCallback, useState} from 'react'
import {Link, Node, NodeType} from './types/types'
import {LinkDetails, NodeDetails} from './components/Details'
import FilterBox from './components/FilterBox'


function App() {
  // const [nodeId, setNodeId] = useState<string | null>(null);
  const [highlightedNode, setHighlightedNode] = useState<string>("");
  const [nodeDetails, setNodeDetails] = useState<Node | null>(null);
  const [linkDetails, setLinkDetails] = useState<{link: Link, nodes: any} | null>(null);
  //const memoEpisode = useMemo(() => episode1, [])


  const maxLinkRange = Math.max(...allEpisodes.links.map(link => link.value));
  const minLinkRange = Math.min(...allEpisodes.links.map(link => link.value));
  const [linkInterval1, setLinkInterval1] = useState<number[]>([minLinkRange, maxLinkRange]);
  const [linkInterval2, setLinkInterval2] = useState<number[]>([minLinkRange, maxLinkRange]);

  const formattedNodes1: NodeType[] = episode1.nodes.map((node: Node, i) => {
    const new_node: NodeType = {
      id: i,
      colour: node.colour,
      name: node.name,
      value: node.value
    }
    return new_node;
  });
  const formattedNodes2: NodeType[] = episode2.nodes.map((node: Node, i) => {
    const new_node: NodeType = {
      id: i,
      colour: node.colour,
      name: node.name,
      value: node.value
    }
    return new_node;
  });
  const data1 = {nodes: formattedNodes1, links: episode1.links}
  const data2 = {nodes: formattedNodes2, links: episode2.links}

  const [graphData1, setGraphData1] = useState(data1);
  const [graphData2, setGraphData2] = useState(data2);

  var windowW = innerWidth;

  

  const handleNodeClick = useCallback((node: any) => {
    if (highlightedNode !== node.name) {
      setHighlightedNode(node.name)
    } else if(highlightedNode === highlightedNode){
      setHighlightedNode("")
    }
  }, [highlightedNode]);

  const handleNodeHover = useCallback((node: any | null) => {
    if(node)
      setNodeDetails(node);
    
    setNodeDetails(node || null);
  }, [])
  const handleLinkHover = useCallback((link: any | null) => {
    if(link)
      setLinkDetails(link);
    
    setLinkDetails(link || null);
  }, []);

  const handleLinkRange1 = useCallback((val: number[]) => {
    setLinkInterval1(val);
  },[]);

  const handleLinkRange2 = useCallback((val: number[]) => {
    setLinkInterval2(val);
  },[]);

  return (
    <>
      <ChakraProvider>
        <Flex flexDir={'row'} width={windowW} height={innerHeight} padding={10} gap={5}>
          <Flex flex={3} background="#d9ceb2" flexDir={'column'} borderRadius={5} border={2} borderStyle={'solid'}>
            {
            nodeDetails?
              <NodeDetails nodeDetails={nodeDetails}/> :
              <NodeDetails nodeDetails={null}/>
            }
            {
            linkDetails?
              <LinkDetails linkDetails={linkDetails} /> : 
              <LinkDetails linkDetails={null} />
            }
            <FilterBox title="Filter First Graph" linkRange={[minLinkRange, maxLinkRange]} onChangeLinkRange={handleLinkRange1}/>
            <FilterBox title="Filter Second Graph" linkRange={[minLinkRange, maxLinkRange]} onChangeLinkRange={handleLinkRange2}/>
          </Flex>
          <Flex flex={9} flexDir={'column'} justifyContent={'space-around'}>
            <NetworkGraph data={graphData1} highlightedNode={highlightedNode} hoverLink={handleLinkHover} hoverNode={handleNodeHover} clickNode={handleNodeClick} linkInterval={linkInterval1}/>
            <NetworkGraph data={graphData2} highlightedNode={highlightedNode} hoverNode={handleNodeHover} clickNode={handleNodeClick} hoverLink={handleLinkHover} linkInterval={linkInterval2}/>
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  )
}

export default App
