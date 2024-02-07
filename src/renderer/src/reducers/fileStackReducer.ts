import { createReducer } from '@reduxjs/toolkit'

const initialState = { API_KEY: 'Ay5ORH3bSTVqC5GHTfmTmz' } as { API_KEY: string }

const FileStackReducer = createReducer(initialState, () => {})

export default FileStackReducer
