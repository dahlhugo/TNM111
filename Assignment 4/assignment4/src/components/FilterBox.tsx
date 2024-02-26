import {Flex, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text} from "@chakra-ui/react"
import {useState} from "react";

type FilterBoxProps = {
    linkRange: number[],
    onChangeLinkRange: (val: number[]) => void,
    title: string,
}

const FilterBox = ({linkRange, onChangeLinkRange, title}: FilterBoxProps) => {
    const [rangeValue, setRangeValue] = useState(linkRange);

    const handleRangeChange = (values: number[]) => {
        setRangeValue(values);
        onChangeLinkRange(values);
    };

    return (
        <Flex flexDir={'column'} m={1} p={2} border={2} borderStyle={'solid'} borderRadius={5}>
            <Text>{title}</Text>
            <Text fontSize={10} m={2}>Edge Weight Range:</Text>
            <RangeSlider
                defaultValue={rangeValue}
                min={linkRange[0]}
                max={linkRange[1]}
                onChange={handleRangeChange}
            >
                <RangeSliderTrack>
                    <RangeSliderFilledTrack/>
                </RangeSliderTrack>
                <RangeSliderThumb index={0}>
                    <Text fontSize={"xx-small"}>{rangeValue[0]}</Text>
                </RangeSliderThumb>
                <RangeSliderThumb index={1}>
                    <Text fontSize={"xx-small"}>{rangeValue[1]}</Text>
                </RangeSliderThumb>
            </RangeSlider>
        </Flex>
    )
}

export default FilterBox;