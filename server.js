import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { db } from './db/index.js';
import { santri } from './db/schema.js';
import { eq } from 'drizzle-orm';

const app = new Hono();

// [C] Create
app.post('/api/santri', async (c) => {
  const data = await c.req.json();
  const result = await db.insert(santri).values(data).returning();
  return c.json({ error: false, data: result[0] }, 201);
});

// [R] Read All
app.get('/api/santri', async (c) => {
  const result = await db.query.santri.findMany();
  return c.json({ error: false, data: result });
});

// [R] Read One
app.get('/api/santri/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const result = await db.query.santri.findFirst({
    where: eq(santri.id, id),
  });
  if (!result) return c.json({ error: true, message: 'Not found' }, 404);
  return c.json({ error: false, data: result });
});

// [U] Update
app.put('/api/santri/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const data = await c.req.json();
  const result = await db
    .update(santri)
    .set(data)
    .where(eq(santri.id, id))
    .returning();
  if (result.length === 0)
    return c.json({ error: true, message: 'Not found' }, 404);
  return c.json({ error: false, data: result[0] });
});

// [D] Delete
app.delete('/api/santri/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const result = await db.delete(santri).where(eq(santri.id, id)).returning();
  if (result.length === 0)
    return c.json({ error: true, message: 'Not found' }, 404);
  return c.json({ error: false, message: `Deleted id ${id}` });
});

// Info about API
app.get('/', async (c) => {
  return c.html(
    `<div><h1>Doc API</h1></div><a href="/api/santri">/api/santri</a>`
  );
});

serve({ fetch: app.fetch, port: 3000 });
console.log('✅ API running at http://localhost:3000');
