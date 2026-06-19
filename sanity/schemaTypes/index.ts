import { type SchemaTypeDefinition } from 'sanity'

// 1. Career Trajectory Schema with Custom Sidebar Preview
const trajectory = {
  name: 'trajectory',
  title: 'Career Trajectory',
  type: 'document',
  fields: [
    { name: 'year', title: 'Year / Duration', type: 'string', description: 'e.g., 2025 - Present' },
    { name: 'company', title: 'Company Name', type: 'string' },
    { name: 'executiveSummary', title: 'Executive Summary', type: 'text' },
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'year'
    }
  }
}

// 2. Arcade Game Schema - FIXED: Restored 'title' field mapping
const game = {
  name: 'game',
  title: 'Arcade Games',
  type: 'document',
  fields: [
    { name: 'title', title: 'Game Name', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'hint', title: 'AI Strategy Hint', type: 'string' },
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}

// 3. Blog Post Schema
const post = {
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    { name: 'title', title: 'Article Title', type: 'string' },
    { 
      name: 'slug', 
      title: 'Slug (URL path)', 
      type: 'slug', 
      options: { source: 'title', maxLength: 96 } 
    },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'body', title: 'Body Content', type: 'text' },
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [trajectory, post, game],
}