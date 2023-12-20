// dao contains a class with the mongo functions already predefinded
class MenuDao {
	constructor() {
		this.menu = require("../schema/menu.schema");
	}

	// creates a new menu
	async add(data, password) {
		return await this.menu.create(data);
	}

	// get an menu from db
	async get(data) {
		return await this.menu.findOne(data);
	}

	// get an menu from db
	async getAll(data) {
		return await this.menu.find(data).populate("parent client");
	}

	// update the menu DB
	async update(data) {
		return await this.menu.findOneAndUpdate({_id: data._id}, data, { new: true });
	}

	// remove a menu
	async remove(data) {
		return await this.menu.deleteOne(data);
	}
}

module.exports = new MenuDao;