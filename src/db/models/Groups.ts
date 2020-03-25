import Dexie from 'dexie'

export interface IGroups {
	id?: number
	name: string
}

export default class Groups extends Dexie {
	groups: Dexie.Table<IGroups, number>

	constructor () {
		super('Groups')

		this.version(1).stores({
			groups: '++id,name'
		})

		this.groups = this.table('groups')
	}

	async init () {
		return await this.open()
	}

	async addGroup (name: string) {
		await this.init()

		this.transaction('rw', this.groups, async () => {
			this.groups.add({ name })
		})
	}

	async delGroup (name: string) {
		let id: number

		const origin_groups = await this.getOriginGroups()

		origin_groups.map((item) => {
			if (item.name === name) {
				id = item.id
			}
		})

		this.transaction('rw', this.groups, async () => {
			this.groups.delete(id)
		})
	}

	async getOriginGroups () {
		await this.init()

		return await this.groups.toArray()
	}

	async getGroups () {
		const groups = []
		const origin_groups = await this.getOriginGroups()

		origin_groups.map((item) => {
			groups.push(item.name)
		})

		return groups
	}
}
