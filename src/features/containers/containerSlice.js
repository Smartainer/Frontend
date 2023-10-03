import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import fastapi from "../../lib/api";

export const getContainerContent = createAsyncThunk(
  "/containers/content",
  async () => {
    console.log("here");
    const response = await fastapi("get", "/api/container/list");
    console.log("response");
    console.log(response);
    let lastIdx = await fastapi("get", "/api/container/lastIndex");

    console.log(lastIdx);
    return { response, lastIdx };
  }
);

export const containerSlice = createSlice({
  name: "containers",
  initialState: {
    isLoading: false,
    lastIdx: 0,
    containers: [],
  },
  reducers: {
    addNewContainer: (state, action) => {
      let { newContainerObj } = action.payload;
      fastapi("post", "/api/container/create", newContainerObj);
      let now = new Date();
      state.containers.unshift({
        ...newContainerObj,
        id: state.lastIdx + 1,
        create_date: now.toISOString(),
      });
      state.lastIdx += 1;
    },

    deleteContainer: (state, action) => {
      let { index, _id } = action.payload;
      state.containers.splice(index, 1);
      fastapi("delete", "/api/container/delete", { id: _id });
    },
  },

  extraReducers: {
    [getContainerContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getContainerContent.fulfilled]: (state, action) => {
      state.containers = action.payload.response.container_list;
      state.isLoading = false;
      state.lastIdx = action.payload.lastIdx.last_inserted_id;
    },
    [getContainerContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewContainer, deleteContainer } = containerSlice.actions;

export default containerSlice.reducer;
