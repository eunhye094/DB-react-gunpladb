import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../connection'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// NOTE: 따옴표(')가 아닌 backtick(`) 사용
		const query: string = `
			select * from mechanic
				left join gunpla on (mechanic.id = mechanic_id)
				left join image on (gunpla.id = gunpla_id)
		`
		const [ rows, fields ] = await db.execute(query)

		//console.log(rows)
		res.status(200).json(rows)
	} catch (err) {
		return res.status(500).json(err)
	}
}