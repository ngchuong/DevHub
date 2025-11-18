import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { apiClient, type Project } from "../../api";
import { mockProjects } from "../../mock-data";

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
  searchQuery: "",
};

// Async thunks
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    try {
      const projects = await apiClient.getProjects();
      return projects;
    } catch {
      // Fallback to mock data if API fails
      console.warn("Projects API not available, using mock data");
      return mockProjects;
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id: string, { rejectWithValue }) => {
    try {
      const project = await apiClient.getProject(id);
      return project;
    } catch (error) {
      // Fallback to mock data if API fails
      const mockProject = mockProjects.find((p) => p.id === id);
      if (mockProject) {
        return mockProject;
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Project not found"
      );
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch project by ID
    builder
      .addCase(fetchProjectById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProject = action.payload;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.currentProject = null;
      });
  },
});

export const { setSearchQuery, clearCurrentProject, clearError } =
  projectsSlice.actions;
export default projectsSlice.reducer;
