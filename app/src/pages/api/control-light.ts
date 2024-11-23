import type { NextApiRequest, NextApiResponse } from 'next';

type Response = {
  status: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method === 'GET') {
    const result = await fetch('http://18.212.189.40:8080/control-light', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.ok) {
      const data = await result.json();
      res.status(200).json(data);
    } else {
      res.status(500).json({ status: 500 });
    }
  }

  res.status(400).json({ status: 400 });
};

export default handler;