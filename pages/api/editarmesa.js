const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const { id, nombre, precioHora } = req.body;
  const newData = {
    nombre: nombre,
    precioHora: precioHora,
  };

  const finalId = parseInt(id);

  const updateUser = await prisma.mesasDisponibles.update({
    where: {
      id: finalId,
    },
    data: newData,
  });
  res.json(updateUser);
}

export default handler;
