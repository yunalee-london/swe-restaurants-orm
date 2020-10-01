const {Restaurant, Menu, Item} = require('./models')
const db = require("./db")

describe('Restaurant', () => {
    beforeAll((done) => {
        db.exec("CREATE TABLE restaurants (id INTEGER PRIMARY KEY, name TEXT, image TEXT);", done)
    })
    test('when restaurant is created it is added to the database', async () => {
        const restaurant = await new Restaurant({name: "Amber", image : "imageurl"})
        expect(restaurant.name).toBe("Amber")
        expect(restaurant.id).toBe(1)
        db.get("SELECT COUNT(id) AS total FROM restaurants;", (err, count) => {
            expect(count.total).toBe(1)
        })
    })
})

describe('Menu', () => {
    beforeAll((done) => {
        db.exec("CREATE TABLE menus (id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER);", done)
    })
    test("when menu is created it is added to the database", async () => {
        const menu = await new Menu({title: "Main", restaurant_id: 1})
        expect(menu.id).toBe(1)
        expect(menu.title).toBe("Main")
        db.get('SELECT COUNT(id) AS total FROM menus;', (err, count) => {
            expect(count.total).toBe(1)
        })
    })
})

describe('Item', () => {
    beforeAll((done) => {
        db.exec("CREATE TABLE items (id INTEGER PRIMARY KEY, title TEXT, price Float, menu_id INTEGER);", done)
    })
    test("when item is created it is added to the database", async () => {
        const item = await new Item({title: "Brownie", price: 3.50, menu_id: 1})
        expect(item.id).toBe(1)
        expect(item.price).toEqual(3.50)
        db.get("SELECT COUNT(id) AS total FROM items;", (err, count) => {
            expect(count.total).toBe(1)
        })
    })
})