import { type SchemaTypeDefinition } from 'sanity'

// 1. Career Trajectory Schema
const trajectory = {
  name: 'trajectory',
  title: 'Career Trajectory',
  type: 'document',
  fields: [
    { name: 'year', title: 'Year / Duration', type: 'string', description: 'e.g., 2025 - Present' },
    { name: 'company', title: 'Company Name', type: 'string' },
    { name: 'executiveSummary', title: 'Executive Summary', type: 'text' },
  ],
}

// 2. Arcade Game Schema 
const game = {
  name: 'game',
  title: 'Arcade Games',
  type: 'document',
  fields: [
    { name: 'name', title: 'Game Name', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'hint', title: 'AI Strategy Hint', type: 'string' },
  ],
}

// 3. UPGRADED: Blog Post Schema with Page Builder capabilities
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
    { 
      name: 'coverImage', 
      title: 'Main Banner Image', 
      type: 'image',
      options: { hotspot: true }
    },
    { name: 'excerpt', title: 'Excerpt', type: 'text', description: 'Short summary for cards & AI.' },
    {
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        // Handles standard text paragraph structures, links, lists, and headers
        { type: 'block' },
        
        // Handles mid-article graphics or analytics screenshots
        { 
          type: 'image', 
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }]
        },
        
        // Handles custom quote Callout Boxes
        {
          name: 'callout',
          type: 'object',
          title: 'Highlighted Quote Box',
          fields: [{ name: 'text', type: 'text', title: 'Callout Text' }]
        },

        // Handles professional side-by-side grids (e.g., Old vs New Paradigm)
        {
          name: 'comparison',
          type: 'object',
          title: 'Side-by-Side Comparison Card Grid',
          fields: [
            { name: 'leftTitle', type: 'string', title: 'Left Card Title' },
            { name: 'leftBody', type: 'text', title: 'Left Card Content (Use newlines for bullets)' },
            { name: 'rightTitle', type: 'string', title: 'Right Card Title' },
            { name: 'rightBody', type: 'text', title: 'Right Card Content (Use newlines for bullets)' }
          ]
        }
      ],
    },
  ],
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [trajectory, post, game],
}