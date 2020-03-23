import Dexie from 'dexie'

export const changeSchema = async (db, schemaChanges) => {
	db.close()
	const newDb = new Dexie(db.name)

	newDb.on('blocked', () => false)

	if (db.tables.length === 0) {
		await db.delete()
		newDb.version(1).stores(schemaChanges)
		return await newDb.open()
	}

	const currentSchema = db.tables.reduce((result, { name, schema }) => {
		result[name] = [ schema.primKey.src, ...schema.indexes.map((idx) => idx.src) ].join(',')
		return result
	}, {})

	newDb.version(db.verno).stores(currentSchema)
	newDb.version(db.verno + 1).stores(schemaChanges)

	return await newDb.open()
}
