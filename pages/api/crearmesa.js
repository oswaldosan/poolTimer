const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const sellData = req.body;

  console.log(sellData);

  const prismaSave = await prisma.mesasDisponibles.create({
    data: sellData,
  });

  res.json(prismaSave);
}

export default handler;
