$(document).ready(function(event) {
    $('.shopping-list').hide();
    $("#shopping-list-entry").prop('required', true);
    cloneFunction();
    var toggleClone;
});

//STATE ELEMENT
var state = {
    items: []
}

//FUNCTIONS THAT MODIFY STATE
var addItem = function(state, item) {
    state.items.push(item);
};
var deleteItem = function(state, item) {
    state.items.splice(item, 1);
}

//FUNCTIONS THAT RENDER STATE
var renderList = function(state, element) {
    $('.shopping-list').show();
    var itemsHTML = state.items.map(function(item) {
        return '<li class="js-list"><span class="shopping-item">' + item + '</span>' + toggleClone + '</li>';
    })
    element.html(itemsHTML);
}
var cloneFunction = function() {
    toggleClone = $('.shopping-item-controls').clone().html();
}
var deleteElement = function(event) {
    event.stopPropagation();
    $(event.currentTarget).parent('.js-list').remove('.js-list');
    console.log(state.items[0]);
}
var checkItem = function(event) {
    event.stopPropagation();
    $(event.currentTarget).siblings('.shopping-item').toggleClass('shopping-item__checked');
}

//EVENT LISTENERS
var shoppingListInput = $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault(); //prevent refresh
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
});
var itemChecker = $('.shopping-list').on("click", ".shopping-item-toggle", (function(event) {
    checkItem(event);
}));
var itemDeleter = $('.shopping-list').on("click", ".shopping-item-delete", (function(event) {
    deleteItem(state, $(event.currentTarget).val());
    deleteElement(event);
}));
