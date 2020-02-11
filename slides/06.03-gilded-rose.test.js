const { Item, Shop } = require("./06.02-gilded-rose");

it("should update quality", () => {
  const gildedRose = new Shop([new Item("foo", 0, 0)]);

  const items = gildedRose.updateQuality();

  expect(items[0].name).toEqual("fixme");
});
