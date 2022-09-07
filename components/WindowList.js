import React from 'react'
import { FixedSizeList as List } from 'react-window';

/*
    props:
        items: array of items to render
        height: height of the list in pixels
        width: width of the list in pixels
        itemHeight: height of each item in pixels
        itemGap: gap between each item in pixels
        item: (index) function to render each item
        callback: (index, event) function to call when an item is clicked


    Example:
        <WindowList
            height={800}
            width={600}
            itemHeight={70}
            itemGap={10}
            items={items}
            item={(index) => <div>{items[index]}</div>}
            callback={(index, event) => { console.log(index, event) }}
        />
*/

export default function WindowList(props) {
    const [_props, setProps] = React.useState(null)

    React.useEffect(() => {
        let defaultProps = {
            height: 400,
            width: 300,
            itemHeight: 70,
            itemGap: 10,
            items: Array.from({ length: 100 }).map((_, index) => `Item ${index}`),
            item: (index) => <div>{defaultProps.items[index]}</div>,
            callback: (index) => { console.log(index) },
        }
        setProps({...defaultProps, ...props})
    }, [])

    React.useEffect(() => {
        if (props.items) setProps({..._props, ...props})
    }, [props.items])

    const handleRowClick = (index, event) => {
        _props.callback(index, event)
    }

    const defaultStyle = {
        backgroundColor: "#f7f6f2",
        borderRadius: '5px',
        border: '1px solid #eee',
        transition: 'all .2s ease',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const Row = ({ index, style }) => ( 
        <div 
        style={{...style, 
            ...defaultStyle,
            ...{
                height: _props.itemHeight,
                width: _props.width - 25,
            }
        }} 
        onClick={(event) => handleRowClick(index, event)}>
            {_props.item(index)}
        </div>
    )
    
    const RList = () => (
        <List
        width={_props.width}
        height={_props.height}
        itemCount={_props.items.length}
        itemSize={_props.itemHeight + _props.itemGap}
        style={{
            overflowX: "hidden",
        }}
        >{Row}</List>
    )


 

    return (
        <div>
            {_props && <RList />}
        </div>
    )
}
