import React from 'react'
import { TextField } from '@material-ui/core';

/*
    props:
        items: array of strings to search through
        name: name of the search box
        fullWidth: boolean to set the width of the search box
        placeholder: placeholder text for the search box
        callback: (value) function to call when the search box is changed

    Example:
        <SearchBox
            placeholder="Sök"
            name="search"
            fullWidth={true}
            variant="outlined"
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
            name: "search",
            fullWidth: true,
            variant: "outlined",
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

 

    return (
        <div>
            {_props && 
                <TextField
                    type="text"
                    variant={_props.variant}
                    label={_props.placeholder}
                    name={_props.name}
                    value={search}
                    onChange={e => handleSearch(e)}
                    fullWidth={_props.fullWidth}
                    autoComplete="off"
                />
            }
        </div>
    )
}
