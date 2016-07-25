var OrangeTree = function(args) {
  if (!args) {
    var args = {};
  }

  this.age = args.age || 0;
  this.height = args.height || 0;
  this.oranges = args.oranges || [];
}

OrangeTree.prototype.isMature = function () {
  return this.age >= 6
}

OrangeTree.prototype.isDead = function () {
  return this.age >= 100
}

OrangeTree.prototype.hasOranges = function () {
  return this.oranges.length > 0
}

OrangeTree.prototype.passGrowingSeason = function () {
  if (!this.isDead()) {
    this.age++;
  }

  if (this.height < this.maxHeight && !this.isDead()) {
    this.height += 2.5;
  }

  if (this.isMature() && !this.isDead()) {
    for(var i = 0; i < 10; i++) {
      this.oranges.push(new Orange());
    }
  }
}

OrangeTree.prototype.pickAnOrange = function () {
  return this.oranges.pop()
}

OrangeTree.prototype.maxHeight = 25;