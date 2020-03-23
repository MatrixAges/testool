import Dexie from 'dexie'

export interface IQas {
	id?: number
	question: string
	answer: string
	tags?: Array<string>
}

export default class Database extends Dexie {
	qas: Dexie.Table<IQas, number>

	constructor (db_name: string) {
		super(db_name)
	}

	public async createTable () {
		this.version(this.verno + 1).stores({
			qas: '++id,question,answer,tags'
		})

		try {
			await this.open()
		} catch (e) {
			return false
		}

		return true
	}
}
