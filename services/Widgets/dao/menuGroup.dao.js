// dao contains a class with the mongo functions already predefinded
class MenuGroupDao {
	constructor() {
		this.menuGroup = require("../schema/menuGroup.schema");
	}

	// creates a new menu group
	async add(data) {
		return await this.menuGroup.create(data);
	}

	// get a menu group from db
	async get(data) {
		return await this.menuGroup.findOne(data);
	}

	// get a menu group from db
	async getAll(data) {
		return await this.menuGroup.find(data).populate("widget");
	}

	// update the menu group DB
	async update(data) {
		return await this.menuGroup.findOneAndUpdate({_id: data._id}, data, { new: true });
	}

	// remove a menu group
	async remove(data) {
		return await this.menuGroup.deleteOne(data);
	}
}

module.exports = new MenuGroupDao;