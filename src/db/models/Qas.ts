import Dexie from 'dexie'

interface IQas {
	id?: number
	question: string
	answer: string
	tags?: Array<string>
}

export default class Qas extends Dexie {
	qas: Dexie.Table<IQas, number>

	constructor (group_name: string) {
		super(group_name)

		this.version(1).stores({
			qas: '++id,question,answer,tags'
		})

		this.qas = this.table('qas')
	}
}
