// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const mesas = [
  {
    title: "Mesa 1",
    price: 12,
  },
  {
    title: "Mesa 2",
    price: 12,
  },
  {
    title: "Mesa 3",
    price: 12,
  },
  {
    title: "Mesa 4",
    price: 12,
  },
  {
    title: "Mesa 5",
    price: 12,
  },
  {
    title: "Mesa 6",
    price: 12,
  },
  {
    title: "Mesa 7",
    price: 14,
  },
  {
    title: "Mesa 8",
    price: 14,
  },
];

export default (req, res) => {
  res.status(200).send(mesas);
};
