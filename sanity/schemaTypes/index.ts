import { type SchemaTypeDefinition } from 'sanity'

// 1. Existing Career Trajectory Schema
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

// 2. NEW: Blog Post Schema
const post = {
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (URL path)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      description: 'A short summary of the post for the AI and cards.',
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'text',
      description: 'The full text content of your article.',
    },
  ],
}

// 3. NEW: Arcade Games Schema
const game = {
  name: 'game',
  title: 'Arcade Games',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Game Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'hint',
      title: 'AI Hint',
      type: 'string',
      description: 'The exact cheat or strategy hint the AI will give out.',
    },
    {
      name: 'rules',
      title: 'Rules to Play',
      type: 'text',
    },
  ],
}

// Register all three types so the Sanity Admin Studio builds inputs for them
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [trajectory, post, game],
}