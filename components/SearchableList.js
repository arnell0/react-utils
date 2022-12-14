import React from 'react'
import SearchBoxMUI from './SearchBoxMUI'
import WindowList from './WindowList'

/*
    props:
        items: array of items to render
        item: (index, list) function to render each item
        callback: (index, event) function to call when an item is clicked

    Example:
        <SearchableList
            items={items}
            item={(index, _items) => <div>{_items[index]}</div>}
            callback={(value) => { console.log("You choose item with index: " + value) }}
        />
*/

export default function SearchableList(props) {
    const [_props, setProps] = React.useState(null)

    React.useEffect(() => {
        let defaultProps = {
            height: 600,
            width: 700,
            itemHeight: 70,
            itemGap: 10,
            callback: (value, event) => { console.log(value, event) },
        }
        setProps({...defaultProps, ...props})
    }, [props])

    const [searchResults, setSearchResults] = React.useState(null);

    return (
        <>
            {_props && 
            <div style={{
                height: "50vh",
                width: "100%",  
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}>
                    <SearchBoxMUI
                        placeholder="Sök"
                        items={_props.items}
                        callback={(value) => { setSearchResults(value) }}
                    />
                    <br />
                    <WindowList
                        height={_props.height}
                        width={_props.width}
                        itemHeight={_props.itemHeight}
                        itemGap={_props.itemGap}
                        items={searchResults ? searchResults : _props.items}
                        item={_props.item}
                        callback={(index, event) => { _props.callback(index, event) }}
                    />
            </div>
            }
            { !_props && <div>Loading...</div>}
        </>
    )
}
