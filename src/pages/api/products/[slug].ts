import db from 'utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ProductModel } from 'models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug;
  console.log('slug in api', slug);
  try {
    await db.connect();
    const product = await ProductModel.findOne({ slug }).lean();
    await db.disconnect();
    res.status(200).json({ status: 'success', code: 200, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// case 'GET':
//       try {
//         const pets = await Pet.find({}) /* find all the data in our database */
//         res.status(200).json({ success: true, data: pets })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     case 'POST':
//       try {
//         const pet = await Pet.create(
//           req.body
//         ) /* create a new model in the database */
//         res.status(201).json({ success: true, data: pet })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     default:
//       res.status(400).json({ success: false })
//       break
//   }
