const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const { id } = req.body;

  console.log(id);

  const deleteUser = await prisma.mesasDisponibles.delete({
    where: {
      id: id,
    },
  });

  res.json(deleteUser);
}

export default handler;
