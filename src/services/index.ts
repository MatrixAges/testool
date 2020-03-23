import Dexie from 'dexie'
import DB from '@/db'

export const Service_addGroup = async (name: string): Promise<boolean> => {
	return await new DB(name).createTable()
}

export const Service_getAllGroups = async (): Promise<Array<string>> => {
      if (await Dexie.exists('__dbnames')) {
		const db = new Dexie('__dbnames')

		await db.open()
		await db.table('dbnames').toArray()

		return await Dexie.getDatabaseNames()
	} else {
		return []
	}
}
