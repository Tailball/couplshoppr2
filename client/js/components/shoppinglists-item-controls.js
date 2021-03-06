const _root = document.querySelector('#crudcontrols');
const _form = document.querySelector('#crudcontrols form');
const _name = document.querySelector('#crudcontrols #name');
const _description = document.querySelector('#crudcontrols #description');
const _addButton = document.querySelector('#crudcontrols-confirm');
const _cancelButton = document.querySelector('#crudcontrols-cancel');
const _closeButton = document.querySelector('#crudcontrols-close');
const _openFormButton = document.querySelector('#open-add-item-button');


let onAddItemCallback;
let curId;


export function setupItemControls(onAddItem) {
    onAddItemCallback = onAddItem;

    _form.addEventListener('submit', onPrepareItem);
    _name.addEventListener('input', onInputChange);
    _description.addEventListener('input', onInputChange);
    _closeButton.addEventListener('click', onCancelSettings);
    _cancelButton.addEventListener('click', onCancelSettings);
    _openFormButton.addEventListener('click', onAddItemClick);
}

function onPrepareItem(e) {
    e.preventDefault();

    const elements = e.target.elements;
    const newItem = {
        name: elements['name'].value,
        description: elements['description'].value
    }

    if(curId) newItem._id = curId;

    onInputChange();
    onAddItemCallback(newItem);

    if(curId) {
        curId = null;
        onCancelSettings();
    }

    clearForm();
}

function onInputChange(e) {
    if(_name.value) {
        _addButton.disabled = false;
        _addButton.classList.remove('gone');
    }
    else {
        _addButton.disabled = true;
        _addButton.classList.add('gone');
    }
}

function onCancelSettings(e) {
    _root.classList.remove('show');
    _openFormButton.classList.remove('gone');
    onInputChange();
}

function onAddItemClick() {
    clearForm();
    onOpenForm();
}

function onOpenForm(e, isInEditMode = false) {
    _root.classList.add('show');
    _openFormButton.classList.add('gone');

    if(isInEditMode) _addButton.innerHTML = "Edit item";
    else _addButton.innerHTML = "Add item";

    onInputChange();
    _name.focus();
}

export function editItem(item) {
    curId = item._id;

    _name.value = item.name;
    _description.value = item.description;

    onOpenForm(null, true);
}

function clearForm() {
    curId = null;

    _name.value = '';
    _description.value = '';
    _name.focus();
}