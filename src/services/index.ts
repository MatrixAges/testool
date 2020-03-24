import Groups from '@/db/models/Groups'

export const Service_addGroup = async (group: string): Promise<boolean> => {
	const groups = new Groups()

	try {
		await groups.addGroups(group)
	} catch (_) {
		return false
	}

	return true
}
