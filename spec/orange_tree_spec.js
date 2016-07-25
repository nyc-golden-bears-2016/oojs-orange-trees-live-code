describe("an orange tree", function() {
  var tree;

  beforeEach(function() {
    tree = new OrangeTree();
  });

  it("has an age", function () {
    expect(tree.age).toBe(0);
  });
  it("has a height", function () {
    expect(tree.height).toBe(0);
  });
  it("has a collection of oranges", function () {
    expect(tree.oranges).toBeDefined();
  });

  describe("reporting whether it's mature", function() {
    beforeEach(function() {
      matureTree = new OrangeTree({age: 6});
      immatureTree = new OrangeTree({age: 5});
    });

    it("is mature if it has reached fruit-bearing age", function () {
      expect(matureTree.isMature()).toBeTruthy();
    });
    it("is not mature if it has not reached fruit-bearing age", function () {
      expect(immatureTree.isMature()).toBeFalsy();
    });
  });

  describe("reporting whether it's dead", function() {
    beforeEach(function() {
      deadTree = new OrangeTree({age: 100});
      aliveTree = new OrangeTree({age: 5});
    });
    it("is dead if it's reached the maximum age for an orange tree", function () {
      expect(deadTree.isDead()).toBeTruthy();
    });
    it("is not dead if it's not reached the maximum age for an orange tree", function () {
      expect(aliveTree.isDead()).toBeFalsy();
    });
  });

  describe("reporting whether it has oranges", function() {
    beforeEach(function() {
      treeWithOranges = new OrangeTree({oranges: [new Orange()]});
      emptyTree = new OrangeTree({oranges: []});
    });
    it("has oranges if it's collection of oranges is not empty", function () {
      expect(treeWithOranges.hasOranges()).toBeTruthy();
    });
    it("has no oranges if it's collection of oranges is empty", function () {
      expect(emptyTree.hasOranges()).toBeFalsy();
    });
  });

  describe("passing a growing season", function() {
    describe("when it's alive", function() {
      beforeEach(function() {
        startingAge = 0
        aliveTree = new OrangeTree({age: startingAge});
        aliveTree.passGrowingSeason();
      });

      it("gets older", function () {
        expect(aliveTree.age).toBe(startingAge + 1);
      });

      describe("when the tree is shorter than the maximum height for an orange tree", function() {
        beforeEach(function() {
          startingHeight = 5
          shortTree = new OrangeTree({height: startingHeight});
          shortTree.passGrowingSeason();
        });

        it("grows taller", function () {
          expect(shortTree.height).toBe(startingHeight + 2.5);
        });
      });

      describe("when the tree has reached the maximum height for an orange tree", function() {
        beforeEach(function() {
          maxHeight = OrangeTree.prototype.maxHeight
          tallTree = new OrangeTree({height: maxHeight});
          tallTree.passGrowingSeason();
        });

        it("does not grow", function () {
          expect(tallTree.height).toBe(maxHeight);
        });
      });

      describe("when it's mature", function() {
        beforeEach(function() {
          matureTree = new OrangeTree({age: 6, oranges: []});
          matureTree.passGrowingSeason();
        });

        it("produces oranges", function () {
          expect(matureTree.oranges.length).toBe(10);
        });
      });

      describe("when it's not mature", function() {
        beforeEach(function() {
          immatureTree = new OrangeTree({age: 1, oranges: []});
          immatureTree.passGrowingSeason();
        });

        it("does not produce fruit", function () {
          expect(immatureTree.oranges.length).toBe(0);
        });
      });
    });

    describe("when it's dead", function() {
      beforeEach(function() {
        deadTree = new OrangeTree({age: 100, height: 5, oranges: []});
        deadTree.passGrowingSeason();
      });

      it("does not get older", function () {
        expect(deadTree.age).toBe(100);
      });
      it("does not grow", function () {
        expect(deadTree.height).toBe(5);
      });
      it("does not produce fruit", function () {
        expect(deadTree.oranges.length).toBe(0);
      });
    });
  });

  describe("picking an orange", function() {
    describe("when the tree has oranges", function() {
      beforeEach(function() {
        firstOrange = new Orange();
        treeWithOranges = new OrangeTree({oranges: [firstOrange]});
        pickedOrange = treeWithOranges.pickAnOrange();
      });

      it("returns one of its oranges", function () {
        expect(pickedOrange).toBe(firstOrange);
      });

      it("no longer has the returned orange in its collection of oranges", function () {
        expect(
          treeWithOranges.oranges.find(function (orange) {
            return orange == firstOrange
          })
        ).toBeFalsy();
      });
    });

    describe("when the tree has no oranges", function() {
      beforeEach(function() {
        orangelessTree = new OrangeTree({oranges: []});
        pickedOrange = treeWithOranges.pickAnOrange();
      });
      
      it("returns undefined", function () {
        expect(pickedOrange).toBeUndefined();
      });
    });
  });
});
