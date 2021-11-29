const Adoption = artifacts.require('Adoption');

contract('Adoption', (accounts) => {
  let adoption;
  let expectedAdopter;
  let petId = 8;

  before(async () => {
    adoption = await Adoption.deployed();
  });

  describe('adopting a pet and retrieving account addresses', async () => {
    before('adopt a pet using accounts[0]', async () => {
      await adoption.adopt(petId, { from: accounts[0] });
      expectedAdopter = accounts[0];
    });

    it('can fetch the address of an owner by pet id', async () => {
      const adopter = await adoption.adopters(petId);
      assert.equal(adopter, expectedAdopter, 'The owner of the adopted pet should be the first account.');
    });

    it('can fetch the collection of all pets owners addresses', async () => {
      const adopters = await adoption.getAdopters();
      assert.equal(adopters[petId], expectedAdopter, 'The owner of the pet should be in the collection.');
    });
  });
})