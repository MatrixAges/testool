import Groups from '@/db/models/Groups'

export const Service_addTableGroups = async (): Promise<boolean> => {
	const groups = new Groups()

	try {
		await groups.init()
	} catch (_) {
		return false
	}

	return true
}

export const Service_getAllGroups = async (): Promise<Array<string>> => {
	const groups = new Groups()

	return await groups.getGroups()
}

export const Service_deleteGroup = async (group: string): Promise<boolean> => {
	const groups = new Groups()

	try {
		await groups.delGroup(group)
	} catch (_) {
		return false
	}

	return true
}
