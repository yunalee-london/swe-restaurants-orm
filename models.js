const db = require("./db")

class Restaurant{
    constructor(data){
        const restaurant = this
        this.id = data.id
        this.name = data.name
        this.image = data.image

        if (this.id) {
            return Promise.resolve(this)
        } else {
            return new Promise((resolve, reject) => {
                db.run("INSERT INTO restaurants(name, image) VALUES(?,?);", [this.name, this.image], function (err) {
                    if (err) return reject(err)
                    restaurant.id = this.lastID
                    return resolve(restaurant)
                })
            })
        }
    }
}
class Menu {
    constructor(data){
        const menu = this
        this.id = data.id
        this.title = data.title
        this.restaurant_id = data.restaurant_id

        if (this.id){
            return Promise.resolve(this)
        } else {
            return new Promise((resolve, reject) => {
                db.run("INSERT INTO menus(title, restaurant_id) VALUES(?,?);", [this.title, this.restaurant_id], function(err){
                    if (err) return reject(err)
                    menu.id = this.lastID
                    return resolve(menu)
                })
            })
        }
    }
}
class Item {
    constructor(data) {
        const item = this
        this.id = data.id
        this.title = data.title
        this.price = data.price
        this.menu_id = data.menu_id

        if (this.id) {
            return Promise.resolve(this)
        } else {
            return new Promise((resolve, reject) => {
                db.run("INSERT INTO items(title, price, menu_id) VALUES(?,?,?);", [this.title, this.price, this.menu_id], function(err) {
                    if (err) return reject(err)
                    item.id = this.lastID
                    return resolve(item)
                })
            })
        
        }
    }
}

module.exports = {Restaurant, Menu, Item}