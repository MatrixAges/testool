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

	async delQa (id: number) {
		await this.init()

		this.transaction('rw', this.qas, async () => {
			await this.qas.delete(id)
		})
	}

	async putQa (id: number, { question, answer, tags }: IQas) {
		await this.init()

		this.transaction('rw', this.qas, async () => {
			await this.qas.update(id, { question, answer, tags })
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

	async getQas (page?: number, page_size?: number) {
		await this.init()

		const _page = page ? page - 1 : 0
		const _page_size = page_size ? page_size : 10
		const _offset = _page * _page_size

		return await this.qas.orderBy('id').offset(_offset).limit(_page_size).toArray()
	}

	async getTotal () {
		await this.init()

		const array = await this.qas.toArray()

		return array.length
	}
}
