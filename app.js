// Storage controller

// Item controller
const ItemCtrl = (function () {
  // Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // State
  // This is supposed to give the feel of a React or Angular app with vanilla JS.
  const state = {
    items: [
      {
        id: 0,
        name: 'Gyoza',
        calories: 300
      },
      {
        id: 1,
        name: 'Waffles',
        calories: 240
      },
      {
        id: 3,
        name: 'Teriyaki Chicken',
        calories: 530
      }
    ],
    currentItem: null, // When we click the update icon in a list item, we're going to want that particular item to be the current item so we can put it in the form to be updated.
    totalCalories: 0
  };

  // Remember that the above attributes are private! They cannot be accessed outside of this function.

  return {
    logState: function () {
      return state;
    }
  }
})();

// UI controller
const UICtrl = (function () {
  
})();

// App controller
const AppCtrl = (function (ItemCtrl, UICtrl) {
  
})(ItemCtrl, UICtrl);
