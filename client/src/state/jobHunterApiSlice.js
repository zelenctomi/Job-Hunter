import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const jobHunterApi = createApi({
  reducerPath: 'jobHunterApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3030/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    /* Users */
    register: builder.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    authenticate: builder.mutation({
      query: (body) => ({
        url: 'authentication',
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.query({
      query: (id) => `users/${id}`,
    }),
    /* Experiences */
    getExperiences: builder.query({
      query: () => 'experiences',
    }),
    addExperience: builder.mutation({
      query: (body) => ({
        url: 'experiences',
        method: 'POST',
        body,
      }),
    }),
    modifyExperience: builder.mutation({
      query: ({ id, body }) => ({
        url: `experiences/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: 'DELETE',
      }),
    }),
    deleteExperiences: builder.mutation({
      query: () => ({
        url: 'experiences',
        method: 'DELETE',
      }),
    }),
    /* Jobs */
    getJobs: builder.query({
      query: () => 'jobs',
    }),
    // {{base_url}}/jobs?userId=1&salaryFrom[$gt]=350000&company[$like]=%miff%
    getFilteredJobs: builder.query({
      query: (params) => `jobs?${new URLSearchParams(params)}`,
    }),
    getJob: builder.query({
      query: (id) => `jobs/${id}`,
    }),
    createJob: builder.mutation({
      query: (body) => ({
        url: 'jobs',
        method: 'POST',
        body,
      }),
    }),
    editJob: builder.mutation({
      query: ({id, job}) => ({
        url: `jobs/${id}`,
        method: 'PATCH',
        body: job,
      }),
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `jobs/${id}`,
        method: 'DELETE',
      }),
    }),
    deleteJobs: builder.mutation({
      query: () => ({
        url: 'jobs',
        method: 'DELETE',
      }),
    }),
    /* Applicants */
    applyForJob: builder.mutation({
      query: (body) => ({
        url: 'applicants',
        method: 'POST',
        body,
      }),
    }),
    getApplicants: builder.query({
      query: jobId => `applicants?jobId=${jobId}`,
    }),
    removeApplication: builder.mutation({
      query: (jobID) => ({
        url: `applicants?jobid=${jobID}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { 
  useRegisterMutation, 
  useAuthenticateMutation, 
  useGetUserQuery, 
  useGetExperiencesQuery, 
  useAddExperienceMutation, 
  useModifyExperienceMutation, 
  useDeleteExperienceMutation, 
  useDeleteExperiencesMutation, 
  useGetJobsQuery, 
  useGetFilteredJobsQuery, 
  useGetJobQuery, 
  useCreateJobMutation, 
  useEditJobMutation, 
  useDeleteJobMutation, 
  useDeleteJobsMutation, 
  useApplyForJobMutation, 
  useGetApplicantsQuery, 
  useRemoveApplicationMutation 
} = jobHunterApi