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
      // {
      //   id: 0,
      //   name: 'Gyoza',
      //   calories: 300
      // },
      // {
      //   id: 1,
      //   name: 'Waffles',
      //   calories: 240
      // },
      // {
      //   id: 3,
      //   name: 'Teriyaki Chicken',
      //   calories: 530
      // }
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
    },
    addItem: function (name, calories) {
      let id;

      // Create ID
      if (state.items.length > 0) {
        id = state.items[state.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new Item
      const newItem = new Item(id, name, calories);

      // Add to items array
      state.items.push(newItem);

      return newItem;
    },
    getTotalCalories: function () {
      let total = 0;

      state.items.forEach(function (item) {
        total += item.calories;
      });

      state.totalCalories = total;
      return total;
    }
  };
})();

// UI controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };

  // Public methods
  return {
    populateItemList: function (items) {
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
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      document.querySelector(UISelectors.itemList).innerHTML += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}:</strong>
          <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
        </li>
      `;
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function () {
      UICtrl.clearInput();
    },
    getSelectors: function () {
      return UISelectors;
    }
  };
})();

// App controller
const App = (function (ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  };

  // Add item submit
  const itemAddSubmit = function (event) {
    // Get form input from UI controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name && input.calories) {
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Render total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Clear input fields
      UICtrl.clearInput();
    } else {
      console.log('Invalid inputs');
    }

    event.preventDefault();
  };

  // Public attributes
  return {
    init: function () {
      console.log('Initializing app');

      // Fetch food items from state data
      const items = ItemCtrl.getItems();

      // Check if there are any items
      if (!items.length) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Render total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

// Init app
App.init();
