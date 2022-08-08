import React from "react"

import { Button } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import { Delete as DangStset } from "@mui/icons-material"

import "./App.css"

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <p />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="contained">
            <IconButton aria-label="delete">
              <DangStset />
            </IconButton>
          </Button>
        </a>
      </header>
    </div>
  )
}

export default App
