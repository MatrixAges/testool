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

export interface IQuery {
	query?: string
	times?: number
	rate?: number
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

	async addQa ({ question, answer, tags }: IQas): Promise<void> {
		await this.init()

		this.transaction('rw', this.qas, async () => {
			await this.qas.add({ question, answer, tags, rates: [] })
		})
	}

	async delQa (id: number): Promise<void> {
		await this.init()

		this.transaction('rw', this.qas, async () => {
			await this.qas.delete(id)
		})
	}

	async putQa (id: number, { question, answer, tags }: IQas): Promise<void> {
		await this.init()

		this.transaction('rw', this.qas, async () => {
			await this.qas.update(id, { question, answer, tags })
		})
	}

	async query ({ query, times, rate }: IQuery): Promise<Array<IQas>> {
		await this.init()

		if (query) {
			return await this.qas
				.filter((item) => new RegExp(query).test(item.question))
				.toArray()
		} else {
			if (times && !rate) {
				return await this.qas.filter((item) => item.rates.length < times).toArray()
			}

			if (!times && rate) {
				return await this.qas
					.filter((item) => {
						const total: number = item.rates.reduce(
							(total: number, curr: IRates) => total + curr.rate,
							0
						)

						return total / item.rates.length <= rate
					})
					.toArray()
			}

			if (times && rate) {
				return await this.qas
					.filter((item) => item.rates.length < times)
					.filter((item) => {
						const total: number = item.rates.reduce(
							(total: number, curr: IRates) => total + curr.rate,
							0
						)

						return total / item.rates.length <= rate
					})
					.toArray()
			}
		}
	}

	async rate ({ id, rate }: IRate): Promise<void> {
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

	async clearRateLog (id: number): Promise<void> {
		await this.init()

		this.transaction('rw', this.qas, async () => {
			await this.qas.update(id, { rates: [] })
		})
	}

	async getQas (page?: number, page_size?: number): Promise<Array<IQas>> {
		await this.init()

		const _page = page ? page - 1 : 0
		const _page_size = page_size ? page_size : 10
		const _offset = _page * _page_size

		return await this.qas.orderBy('id').offset(_offset).limit(_page_size).toArray()
	}

	async getTotal (): Promise<number> {
		await this.init()

		const array = await this.qas.toArray()

		return array.length
	}

	async getAverageRate (): Promise<number> {
		await this.init()

		const array = await this.qas.toArray()
		const length_array = array.length

		let total_all: number = 0

		if (!length_array) return 0

		array.map((item) => {
			const length_rates = item.rates.length

			const total_rates: number = item.rates.reduce(
				(total: number, curr: IRates) => total + curr.rate,
				0
			)

			if (length_rates) {
				total_all = total_all + total_rates / length_rates
			}
		})

		return parseFloat((total_all / length_array).toFixed(2))
	}
}
