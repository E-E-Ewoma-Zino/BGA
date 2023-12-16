// dao contains a class with the mongo functions already predefinded
class AdminDao {
	constructor() {
		this.admin = require("../schema/admin.schema");
	}

	// creates a new admin
	async add(data, password) {
		return await this.admin.register(data, password);
	}

	// get an admin from db
	async get(data) {
		return await this.admin.findOne(data);
	}

	// get an admin from db
	async getAll(data) {
		return await this.admin.find(data);
	}

	// update the admin DB
	async update(data) {
		return await this.admin.findOneAndUpdate({_id: data._id}, data, { new: true });
	}

	// remove a admin
	async remove(data) {
		return await this.admin.deleteOne(data);
	}
}

module.exports = new AdminDao;