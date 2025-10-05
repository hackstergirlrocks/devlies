
it('Total cart with shipping costs', () => {
 const items = [
   { name: "shoes", price: 15 },
   { name: "t-shirt", price: 15 },
 ];
 const shippingFees = 3;
 expect(basket(items, shippingFees)).toBe(33);
});