import { type SchemaTypeDefinition } from 'sanity'

// 1. We define the blueprint for a "Trajectory" (Job) entry
const trajectory = {
  name: 'trajectory',
  title: 'Career Trajectory',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year / Duration',
      type: 'string',
      description: 'e.g., 2025 - Present',
    },
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
    },
    {
      name: 'executiveSummary',
      title: 'Executive Summary',
      type: 'text',
      description: 'A brief description of your role and impact.',
    },
  ],
}

// 2. We export it so the Admin Panel can see it
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [trajectory],
}