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

export const Service_delQa = async (current_group: string, id: number): Promise<boolean> => {
	const qa = new Qas(current_group)

	try {
		await qa.delQa(id)
	} catch (_) {
		return false
	}

	return true
}

export const Service_putQa = async (
	current_group: string,
	id: number,
	params: IQas
): Promise<boolean> => {
	const qa = new Qas(current_group)

	try {
		await qa.putQa(id, params)
	} catch (_) {
		return false
	}

	return true
}

export const Service_searchQaByQuestion = async (
	current_group: string,
	query: string
): Promise<Array<IQas>> => {
	const qa = new Qas(current_group)

	return await qa.searchQaByQuestion(query)
}

export const Service_getQas = async (
	current_group: string,
	page?: number,
	page_size?: number
): Promise<Array<IQas>> => {
	const qa = new Qas(current_group)

	return await qa.getQas(page, page_size)
}

export const Service_getTotal = async (current_group: string): Promise<number> => {
	const qa = new Qas(current_group)

	return await qa.getTotal()
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

export const Service_clearRateLog = async (current_group: string, id: number): Promise<boolean> => {
	const qa = new Qas(current_group)

	try {
		await qa.clearRateLog(id)
	} catch (_) {
		return false
	}

	return true
}
