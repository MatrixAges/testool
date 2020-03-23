import Dexie from 'dexie'

export const Service_deleteGroup = async (group: string): Promise<boolean> => {
	try {
		const db = new Dexie(group)

		await db.open()
		await db.delete()
	} catch (_) {
		return false
	}

	return true
}
