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
    updateItem: function (name, calories) {
      // Turn calories to a number
      calories = parseInt(calories);
      state.currentItem.name = name;
      state.currentItem.calories = calories;
      return state.currentItem;
    },
    deleteItem: function (id) {
      // Get ids
      const ids = state.items.map(function (item) {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Splice array
      state.items.splice(index, 1);
    },
    getItemById: function (id) {
      let found = null;

      // Loop through items
      state.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },
    setCurrentItem: function (item) {
      state.currentItem = item;
    },
    getCurrentItem: function () {
      return state.currentItem;
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
    listItems: '#item-list li',
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
    updateListItem: function (item) {
      const listItems = document.querySelectorAll(UISelectors.listItems);

      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          listItem.innerHTML = `
            <strong>${item.name}:</strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          `;
        }
      });
    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
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

    // Disable submit on enter
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Update item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
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

  // Item edit click
  const itemEditClick = function (event) {
    if (event.target.classList.contains('edit-item')) {
      // Get list item id
      const listId = event.target.parentNode.parentNode.id;

      // Break into array and get id number
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);
    }

    // Add item to form
    UICtrl.addItemToForm();

    event.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = function (event) {
    // Get input
    const input = UICtrl.getItemInput();

    // Update item and UI
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Render total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    event.preventDefault();
  };

  const itemDeleteSubmit = function (event) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from state data
    ItemCtrl.deleteItem(currentItem.id);
    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    event.preventDefault();
  };

  // Public attributes
  return {
    init: function () {
      // Set initial state
      UICtrl.clearEditState();

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
