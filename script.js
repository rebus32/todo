
var todos = [];   //Changing to Boolean values


var todosList = {
    todos:[],

    addTodos : function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed:false
        });
       
    },


    updateTodos: function(position, todoText) {
        this.todos[position].todoText = todoText;
        
    },

    deleteTodos: function(position) {
        this.todos.splice(position, 1);
        
    },
   

    toggleCompleted: function(position){
        var todo = this.todos[position];
        todo.completed = !todo.completed;
        
    },


    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
           
        this.todos.forEach(function(todo){
            if (this.todos.completed === true){
                completedTodos++;
            }
        }),

        this.todos.forEach(function(todo){
            if (completedTodos === totalTodos) {
                this.todos.completed = false;
        } else {
                this.todos.completed = true;     
            }
        });
    }
        
} 

    var handlers = {
        
        toggleAll: function() {
            todosList.toggleAll();
            view.displayTodos();
        },

        addTodos: function() {
            var addTodosTextInput = document.getElementById('addTodosTextInput');
            todosList.addTodos(addTodosTextInput.value);
            addTodosTextInput.value = "";
            view.displayTodos();
        },

        updateTodos: function() {
            var updateTodosTextPos = document.getElementById('updateTodosTextPos');
            var updateTodosTextInput = document.getElementById('updateTodosTextInput');
            todosList.updateTodos(updateTodosTextPos.valueAsNumber, updateTodosTextInput.value);
            
            updateTodosTextPos.value = "";
            updateTodosTextInput.value = "";
            view.displayTodos();
        },

        deleteTodos: function(position) {
            //var deleteTodosTextPos = document.getElementById('deleteTodosTextPos');
            todosList.deleteTodos(position);
            //deleteTodosTextPos.value = "";
            view.displayTodos();
        },

        toggleCompleted: function() {
            var toggleCompletedPosInput = document.getElementById('toggleCompletedPosInput');
            todosList.toggleCompleted(toggleCompletedPosInput.valueAsNumber);
            toggleCompletedPosInput.value = "";
            view.displayTodos();
        }
    };

    var view = {
        displayTodos : function() {
            var todosUl = document.querySelector('ul');
            todosUl.innerHTML = '';
            //for (var i = 0; i < todosList.todos.length; i++) {
            todosList.todos.forEach(function(todo, position) {
                var todosLi = document.createElement('li');
                var todosTextWithCompletion = "";
                
                if (todo.completed === true) {
                    todosTextWithCompletion = '(x)' + todo.todoText;
                } else {
                    todosTextWithCompletion = '( )' + todo.todoText;
                }
                todosLi.id = position;
                todosLi.textContent = todosTextWithCompletion;
                todosLi.appendChild(this.createDeleteButton());
                todosUl.appendChild(todosLi);
            },this);
        },

        createDeleteButton : function(){
            var deleteButton = document.createElement('Button');
            deleteButton.textContent = "Delete";
            deleteButton.className = 'deleteButton';
            return deleteButton;


        },

        setUpEventListeners: function(){
            var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event){
        console.log(event.target.parentNode.id);

    var elementClicked = event.target;
    if (elementClicked.className === 'deleteButton'){
        handlers.deleteTodos(parseInt(elementClicked.parentNode.id));
                }

            });

        },
    };

    view.setUpEventListeners();
