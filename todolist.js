window.onload=function(){
	
  var save = document.querySelector('.save'),
	  task = document.querySelector('.task'),
      ul = document.querySelector('ul'),
	  tpl = document.querySelector('template'),
	  div = document.querySelector('.div1'),
	  all = document.querySelector('.all'),
	  delall = document.querySelector('.del_all'),
	  togall = document.querySelector('.tog_all'),
	  active = document.querySelector('.active'),
	  complete = document.querySelector('.complete'),
	  showall = document.querySelector('.show'),
      counter=0,
      todoList = JSON.parse(localStorage.getItem('todoList')) || []; 
      
function render() {
  var content = tpl.content,   
  	  importedNode = content.cloneNode(content, true),
	  li = importedNode.querySelector('li'),	
      tas = importedNode.querySelector('p'),
	  inp = importedNode.querySelectorAll('input[type=checkbox]'), 
	  num = importedNode.querySelectorAll('input[type=number]');
      ul.appendChild(importedNode, true);
      tas.textContent = task.value;
	  li.setAttribute('data-id', counter);
	  //counter++;
	  
tas.addEventListener("DOMCharacterDataModified",function(e){ 
	
	 textnew = event.target.textContent;  
     
},false); 
	
all.addEventListener('change', function(event){
    											   
  Array.prototype.forEach.call(inp,function (elem,i,list){
       
	  elem.checked = all.checked;
	  	  
});		
	
},false);
	
};
	

function drawing (todoListItemData){

	var clonedNode = tpl.content.cloneNode(true);
	
	    clonedNode.querySelector('li').setAttribute('data-id', todoListItemData.id);
		clonedNode.querySelector('input[type=checkbox]').checked = todoListItemData.isDone;
		clonedNode.querySelector('p').textContent = todoListItemData.description;
		clonedNode.querySelector('input[type=number]').value = todoListItemData.priority;
		ul.appendChild(clonedNode);
	   
	}

todoList.forEach(drawing);
	
save.addEventListener('click', function(event){ 
   
   if (task.value === ''){
		div.innerHTML='Write down what you need to do!';
		return false;
	}
    
     render();
											   
	  var obj = {
	  isDone:false,
	  priority: 1,
      description:task.value,
	  id:counter++
		  
  }
	
todoList.push(obj);
	localStorage.setItem('todoList', JSON.stringify(todoList));

	
}, false);
 
ul.addEventListener('change', function(event){ 
	
	 targetElem = event.target;
	
  if (event.target.classList.contains('check')){
	 targetElem.setAttribute('disabled','disabled');
     targetElem.nextElementSibling.classList.add('check'); 
     parentNode = event.target.parentNode;
	 todoList[targetElem.parentNode.getAttribute('data-id')].isDone = true; 
     localStorage.setItem('todoList', JSON.stringify(todoList));
	  	  
  }
	
     prior = parseInt(event.target.value, 10);
	
  if (event.target.type === 'number'){
	  
	 todoList[targetElem.parentNode.getAttribute('data-id')].priority = prior;
	 localStorage.setItem('todoList', JSON.stringify(todoList)); 
	 targetElem.parentNode.classList.add('order-' + prior); 
	  
	}
	
},false);

	
ul.addEventListener('click', function(event){
		
if (event.target.classList.contains('del')){
    
	ul.removeChild(event.target.parentNode);
	todoList.forEach(function(elem, index, list){
		
		if(elem.id == event.target.parentNode.getAttribute('data-id')){
			
		   todoList.splice(index, 1);
			
		   }
	});
	
	localStorage.setItem('todoList', JSON.stringify(todoList));

}
    
    
 if (event.target.classList.contains('edit')){ 
     
     todoList[event.target.parentNode.getAttribute('data-id')].description = textnew; 
     localStorage.setItem('todoList', JSON.stringify(todoList));
     
 }
	
},false);	
	
delall.addEventListener('click',function(event){
	all.checked = false;
	ul.innerHTML='';
	localStorage.clear('todoList', JSON.stringify(todoList));
},false);
	
togall.addEventListener('click',function(event){
	var content = tpl.content,
		importedNode = content.cloneNode(content, true),
		inp = importedNode.querySelectorAll('input[type=checkbox]');
    Array.prototype.forEach.call(inp, function (elem){
            elem.checked = !elem.checked;
            todoList[elem.parentNode.getAttribute('data-id')].isDone = elem.checked;
       });
        localStorage.setItem('todoList', JSON.stringify(todoList));
    });

	showall.addEventListener('click', function (){
		var content = tpl.content,
			importedNode = content.cloneNode(content, true),
			inp = importedNode.querySelectorAll('input[type=checkbox]');

		Array.prototype.forEach.call(inp, function (elem){

			elem.parentNode.classList.remove('hide');
		});

	},false);


	active.addEventListener('click',function(event){

		var content = tpl.content,
			importedNode = content.cloneNode(content, true),
			inp = importedNode.querySelectorAll('input[type=checkbox]');

		Array.prototype.forEach.call(inp, function (elem){
			if (elem.checked === true) {
				elem.parentNode.classList.add('hide');
			}
			else {
				elem.parentNode.classList.remove('hide');
			}
		} )
	},false);

	complete.addEventListener('click', function (){
		Array.prototype.forEach.call(inp, function (elem){
			if (elem.checked === false) {
				elem.parentNode.classList.add('hide');
			}
			else {
				elem.parentNode.classList.remove('hide');
			}
		});
	},false);



};