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

  // Public attributes
  return {
    logState: function () {
      return state;
    },
    getItems: function () {
      return state.items;
    }
  };
})();

// UI controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list'
  };

  // Public methods
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(function (item) {
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}:</strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          </li>
        `;
      });
      // Insert list items into UI
      document.querySelector(UISelectors.itemList).innerHTML = html;
    }
  }
})();

// App controller
const App = (function (ItemCtrl, UICtrl) {
  // Public attributes
  return {
    init: function () {
      console.log('Initializing app');
      
      // Fetch food items from state data
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemList(items);
    }
  };
})(ItemCtrl, UICtrl);

// Init app
App.init();
