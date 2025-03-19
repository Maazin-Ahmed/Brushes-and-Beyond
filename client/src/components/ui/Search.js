"use client"

import { useState } from "react"
import { Search as SearchIcon, X } from "react-feather"

const Search = ({ placeholder = "Search...", onSearch, initialValue = "", className = "", debounceTime = 300 }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const [timer, setTimer] = useState(null)

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    // Clear previous timer
    if (timer) {
      clearTimeout(timer)
    }

    // Set new timer for debounce
    const newTimer = setTimeout(() => {
      onSearch(value)
    }, debounceTime)

    setTimer(newTimer)
  }

  const handleClear = () => {
    setSearchTerm("")
    onSearch("")
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />

      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}

export default Search

