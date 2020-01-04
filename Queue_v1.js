
function Queue(){
   this.queue = [];
   this.searchIndex ;
   this.searchType = "normalSelect"; 
   this.fetchFromObject = function(obj, prop) {
    if(typeof obj === 'undefined') {
        return false;
    }
    var _index = prop.indexOf('.')
    if(_index > -1) {
        return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }
    return obj[prop];
   };
   this.setSeachIndex = function(index){
     var type = index.indexOf('.');
     this.searchIndex = index;
     if(type>-1){
        this.searchType = "fetchSelect";
        console.log("select fetch select");
     }
   };
   this.fetchSelect =function(index){
      var key = this.searchIndex;
      var index =  this.queue.findIndex((e)=>{ return  this.fetchFromObject(e,key)==index;}); 
      return index;
   };
   this.normalSelect =function(index){      
      var key = this.searchIndex;
      return this.queue.findIndex((e)=> {return e[key]==index});  
   }
   this.add= function(data){
      this.queue.push(data);
   };
   this.select = function(index){
      // input index value
      return this[this.searchType](index);
      //return this.queue.findeIndex((e)=> e.searchIndex==index);   
   }
   this.delete = function(index){
      var deleteIndex = this.select(index);
      if(deleteIndex>=0){
         this.queue.splice(deleteIndex,1);
         return true;
      }else{
        console.log("this delete index can't found on queue");
        return false;
      }
   };
   this.queueCheck =function(index){
      /* have on queue then return value and delete value from queue
         not on queue the return  flase vlaue
      */
      var selectIndex = this.select(index);
      if(selectIndex>=0){
         return this.queue.splice(selectIndex,1);
      }else{
        console.log("this index can't found on queue");
        return false;
      }
     
   };
}

/* init the constructor */
var commentQue = new Queue();
commentQue.setSeachIndex("max.id")

/* test example for fetch*/
console.log(commentQue.queue);

commentQue.add({id:3,data:[1,2,3,4,5],max:{id:1}});
commentQue.add({id:2,data:[1,2,3,4,5],max:{id:2}});

console.log(commentQue.queue);

console.log(commentQue.queueCheck(1)); 

console.log(commentQue.queue); 
