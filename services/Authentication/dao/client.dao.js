// dao contains a class with the mongo functions already predefinded
class ClientDao {
	constructor() {
		this.client = require("../schema/client.schema");
	}

	// creates a new client
	register(data, password) {
		return this.client.register(data, password);
	}

	// get an client from db
	async get(data) {
		return await this.client.findOne(data).populate("admin");
	}

	// get an client from db
	async getAll(data) {
		return await this.client.find(data);
	}

	// update the client DB
	async update(query, data) {
		return await this.client.findOneAndUpdate(query, data, { new: true });
	}

	// remove a client
	async remove(data) {
		return await this.client.deleteOne(data);
	}
}

module.exports = new ClientDao;