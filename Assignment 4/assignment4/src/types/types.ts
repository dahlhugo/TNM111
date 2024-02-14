export type Node = {
    
    name: string,
    value: number,
    colour: string
}

export type Link = {
    source: number,
    target: number,
    value: number
}

export type Episode = {
    nodes: Node[],
    links: Link[]
}

