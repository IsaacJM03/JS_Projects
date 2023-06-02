function Animal(species) {
    this.species = species;
    this.eats = true;
}

Animal.prototype.walks = function () {
    return `A ${this.species} is walking.`;
}

const Bear = new Animal;

console.log(Bear.species);
console.log(Bear.walks());

console.log(Bear.__proto__)