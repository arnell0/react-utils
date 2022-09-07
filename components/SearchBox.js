import React from 'react'

/*
    props:
        items: array of strings to search through
        placeholder: placeholder text for the search box
        callback: (value) function to call when the search box is changed

    Example:
        <SearchBox
            placeholder="Sök"
            items={items}
            callback={(value) => { setSearchResults(value) }}
        />
*/

export default function SearchBox(props) {
    const [_props, setProps] = React.useState(null)
    const [search, setSearch] = React.useState("")

    React.useEffect(() => {
        let defaultProps = {
            placeholder: "Sök",
            items: [],
            callback: (value) => { console.log(value) },
        }
        setProps({...defaultProps, ...props})
    }, [props])


    const handleSearch = (event) => {
        setSearch(event.target.value)
        let searchResults = _props.items.filter(item => item.toLowerCase().includes(event.target.value.toLowerCase()))
        _props.callback(searchResults)
    }

    let inputStyle = {
        width: "300px",
        padding: "8px",
        border: "2px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
        transition: "border 0.2s ease-in-out",
    }

    return (
        <div>
            {_props && 
                <input type="text" 
                    placeholder={_props.placeholder} 
                    value={search}
                    onChange={handleSearch} 
                    style={inputStyle}
                />
            }
        </div>
    )
}
