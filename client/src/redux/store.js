import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import ticketReducer from "./tickets/ticketSlice"
import notesReducer from "./notes/notesSlicse"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tickets: ticketReducer,
        notes: notesReducer
    }
})