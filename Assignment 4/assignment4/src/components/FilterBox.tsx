import { Center, Checkbox, Flex, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from "@chakra-ui/react"
import { useState } from "react";

type FilterBoxProps = {
    nodeRange: number[],
    onChangeInterval: (val: number[]) => void, 
}

const FilterBox = ({nodeRange, onChangeInterval}: FilterBoxProps) => {
    const [disableNodeSlider, setDisableNodeSlider] = useState(true);

    return (
        <Flex flexDir={'column'} m={1} p={2} border={2} borderStyle={'solid'} borderRadius={5}>
            <Text>Filtering:</Text>
            <Checkbox border={"black"} onChange={() => {setDisableNodeSlider(!disableNodeSlider)}}><Text fontSize={13}>Filter nodes</Text></Checkbox>
            <Text fontSize={10} m={2}>Value Range:</Text>
            <RangeSlider 
                isDisabled={disableNodeSlider}
                defaultValue={nodeRange}
                min={nodeRange[0]}
                max={nodeRange[1]}
                onChange={onChangeInterval}
            > 
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>
        </Flex>
    )
}

export default FilterBox;