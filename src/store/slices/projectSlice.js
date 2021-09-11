import {createSlice} from "@reduxjs/toolkit";

const projectBase = {
    logs: [],
    stepsToExecute: [],
    executingStep: null
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        current: "dogoxo",
        all: {
            dogoxo: {...projectBase},
            kittyFur: {...projectBase},
            petsly: {...projectBase},
        },
    },
    reducers: {
        setCurrentProject: (state, {payload}) => {
            state.current = payload;
        },
        addLog: (state, {payload}) => {
            state.all[state.current].logs.push(payload);
        },
        clear: (state) => {
            state.all[state.current].logs = [];
        },
        addStep: (state, {payload}) => {
            state.all[state.current].stepsToExecute.push(payload);
        },
        removeStep: (state, {payload}) => {
            const steps = state.all[state.current].stepsToExecute;
            steps.splice(steps.indexOf(payload), 1);
        },
        stepStarted: (state, {payload}) => {
            state.all[state.current].executingStep = payload;
        },
        allStepsFinished: (state) => {
            state.all[state.current].executingStep = null;
        }
    }
});

export const {setCurrentProject, addStep, removeStep, addLog, clear, stepStarted, allStepsFinished} = projectsSlice.actions;
export default projectsSlice.reducer;