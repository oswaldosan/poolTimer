const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const mesas = await prisma.mesasDisponibles.findMany();
  res.json(mesas);
}

export default handler;
