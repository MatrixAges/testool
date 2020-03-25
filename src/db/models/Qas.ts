import Dexie from 'dexie'

export interface IQas {
	id?: number
	question: string
	answer: string
	tags?: Array<string>
	rates?: Array<IRates>
}

export interface IRates {
	rate: number
	create_at: number
}

export interface IRate {
	id: number
	rate: number
}

export default class Qas extends Dexie {
	qas: Dexie.Table<IQas, number>

	constructor (group_name: string) {
		super(group_name)

		this.version(1).stores({
			qas: '++id,question,answer,tags,rates'
		})

		this.qas = this.table('qas')
	}

	async init () {
		return await this.open()
	}

	async addQa ({ question, answer, tags }: IQas) {
		await this.init()

		this.transaction('rw', this.qas, async () => {
			await this.qas.add({ question, answer, tags, rates: [] })
		})
	}

	async rate ({ id, rate }: IRate) {
		await this.init()

		this.transaction('rw', this.qas, async () => {
			await this.qas
				.where('id')
				.equals(id)
				.modify((item) =>
					item.rates.push({ rate, create_at: new Date().valueOf() })
				)
		})
	}

	async getQas () {
		await this.init()

		return await this.qas.toArray()
	}
}
