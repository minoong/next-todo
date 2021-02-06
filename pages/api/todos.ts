import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(1);
  console.log(1);
  console.log(1);
  console.log(1);
  return res.send('ok');
};
