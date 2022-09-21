import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// GET /api/fetchPosters
handler.get(async (res) => {
  const allposters = await db.collection("posters").find({}).toArray();
  res.status(200).json(allposters);
});

export default handler;