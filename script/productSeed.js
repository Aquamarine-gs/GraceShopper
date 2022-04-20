const products = [
  {
    name: 'Potion',
    price: 299,
    description: 'Restores HP that have been lost in battle by 20 HP.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/d/df/Dream_Potion_Sprite.png',
    quantity: 100,
    category: 'Potions',
  },
  {
    name: 'Super Potion',
    price: 699,
    description: 'Restores HP that have been lost in battle by 50 HP.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/5/57/Dream_Super_Potion_Sprite.png',
    quantity: 100,
    category: 'Potions',
  },
  {
    name: 'Hyper Potion',
    price: 1499,
    description: 'Restores HP that have been lost in battle by 200 HP.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/c/c8/Dream_Hyper_Potion_Sprite.png',
    quantity: 100,
    category: 'Potions',
  },
  {
    name: 'Max Potion',
    price: 2499,
    description: 'Fully restores HP that have been lost in battle.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/a/a2/Dream_Max_Potion_Sprite.png',
    quantity: 100,
    category: 'Potions',
  },
  {
    name: 'Full Restore',
    price: 2999,
    description: 'Fully restores HP and cures all ailments, such as poisoning.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/0/0c/Dream_Full_Restore_Sprite.png',
    quantity: 100,
    category: 'Potions',
  },
  {
    name: 'Poké Ball',
    price: 199,
    description: 'A Ball thrown at wild Pokémon to catch them.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/7/79/Dream_Pok%C3%A9_Ball_Sprite.png',
    quantity: 100,
    category: 'Poké Balls',
  },
  {
    name: 'Great Ball',
    price: 599,
    description:
      'A Ball for catching wild Pokémon. More effective than a Poké Ball.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/b/bf/Dream_Great_Ball_Sprite.png',
    quantity: 100,
    category: 'Poké Balls',
  },
  {
    name: 'Ultra Ball',
    price: 1199,
    description:
      'A Ball for catching wild Pokémon. More effective than a Great Ball.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/a/a8/Dream_Ultra_Ball_Sprite.png',
    quantity: 100,
    category: 'Poké Balls',
  },
  {
    name: 'Master Ball',
    price: 1000000,
    description: 'A Ball that captures any wild Pokémon without fail.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/9/95/Dream_Master_Ball_Sprite.png',
    quantity: 1,
    category: 'Poké Balls',
  },
  {
    name: 'Dusk Ball',
    price: 999,
    description:
      'A somewhat different Poké Ball that makes it easier to catch wild Pokémon at night or in dark places like caves.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/5/59/Dream_Dusk_Ball_Sprite.png',
    quantity: 100,
    category: 'Poké Balls',
  },
  {
    name: 'X Attack',
    price: 499,
    description: 'Temporarily increases Attack power for one battle.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/d/df/Dream_X_Attack_Sprite.png',
    quantity: 100,
    category: 'Battle Items',
  },
  {
    name: 'X Defense',
    price: 550,
    description: 'Temporarily increases Defense for one battle.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/d/d4/Dream_X_Defense_Sprite.png',
    quantity: 100,
    category: 'Battle Items',
  },
  {
    name: 'X Speed',
    price: 350,
    description: 'Temporarily increases Speed for one battle.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/b/ba/Dream_X_Speed_Sprite.png',
    quantity: 100,
    category: 'Battle Items',
  },
  {
    name: 'Dire Hit',
    price: 650,
    description:
      'Temporarily heightens the probability of scoring critical hits in one battle.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/d/d3/Dream_Dire_Hit_Sprite.png',
    quantity: 100,
    category: 'Battle Items',
  },
  {
    name: 'X Accuracy',
    price: 950,
    description: 'Temporarily heightens accuracy for one battle.',
    imageUrl:
      'https://archives.bulbagarden.net/media/upload/1/18/Dream_X_Accuracy_Sprite.png',
    quantity: 100,
    category: 'Battle Items',
  },
];

module.exports = products;
