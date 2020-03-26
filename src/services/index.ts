import Groups from '@/db/models/Groups'
import Qas, { IQas, IRate } from '@/db/models/Qas'

export const Service_addGroup = async (group: string): Promise<boolean> => {
	const groups = new Groups()

	try {
		await groups.addGroup(group)
	} catch (_) {
		return false
	}

	return true
}

export const Service_addQa = async (current_group: string, params: IQas): Promise<boolean> => {
	const qa = new Qas(current_group)

	try {
		await qa.addQa(params)
	} catch (_) {
		return false
	}

	return true
}

export const Service_getQas = async (
	current_group: string,
	page?: number,
	page_size?: number
): Promise<Array<IQas>> => {
	const qa = new Qas(current_group)

	return await qa.getQas(page, page_size)
}

export const Service_rate = async (current_group: string, params: IRate): Promise<boolean> => {
	const qa = new Qas(current_group)

	try {
		await qa.rate(params)
	} catch (_) {
		return false
	}

	return true
}
