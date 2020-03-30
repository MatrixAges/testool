import Groups from '@/db/models/Groups'
import Qas from '@/db/models/Qas'

export interface IGetAnalysisData {
	name: string
	total: number
	average_rate: number
}

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

export const Service_getAnalysisData = async (): Promise<Array<IGetAnalysisData>> => {
	const groups = new Groups()
	const groups_array = await groups.getGroups()
	const analysis_data = []

	for (let i of groups_array) {
		const qa = new Qas(i)
		const total = await qa.getTotal()
		const average_rate = await qa.getAverageRate()

		analysis_data.push({
			name: i,
			total: total,
			average_rate: average_rate
		})
	}

	return analysis_data
}
