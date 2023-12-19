// dao contains a class with the mongo functions already predefinded
class WidgetDao {
	constructor() {
		this.widget = require("../schema/widget.schema");
	}

	// creates a new widget
	async add(data, password) {
		return await this.widget.create(data);
	}

	// get an widget from db
	async get(data) {
		return await this.widget.findOne(data);
	}

	// get an widget from db
	async getAll(data) {
		return await this.widget.find(data);
	}

	// update the widget DB
	async update(data) {
		return await this.widget.findOneAndUpdate({_id: data._id}, data, { new: true });
	}

	// remove a widget
	async remove(data) {
		return await this.widget.deleteOne(data);
	}
}

module.exports = new WidgetDao;