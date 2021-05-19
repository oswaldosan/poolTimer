const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const deletedVenta = await prisma.ventaMesas.deleteMany({});

  res.json(deletedVenta);
}

export default handler;
