angular.module('moduleControlles')
.factory('DatabaseService', ['$q','$timeout', dbServ]);
    function dbServ ($q,$timeout) {  
    var _db;    

    // We'll need this later.
    var _notes;

    return {
        initDB: initDB,
 
        getAllNote: function getAllNote(){
            if(!_notes){
                
              return $q.when(_db.allDocs({ include_docs: true }))
              .then(function(docs){
              console.log(docs);
              _notes = docs.rows.map(function(row){
                  console.log(row.doc.date);
                row.doc.Date = new Date()
                
                return row.doc
              })

              _db.changes({ live:true, since: 'now', include_docs: true })
                .on('change',onDatabaseChange)
              return _notes
            })
        }else {
      
              return $q.when(_notes)
            }
      },
        addNote: function addNote(Note){
            console.log(Note);
           /* this.initDB();*/
            return $q.when(_db.post(Note))
      },


        updateNote: function updateNote(Note){   
            console.log(Note);
            /*this.initDB();*/
            return  $q.when(_db.put(Note).then(function(){
            }))
      },
        deleteNote: function deleteNote(Note){
            console.log(Note);
            return $q.when(_db.remove(Note).then(function(){
                console.log("success delete");
            })
            
            
            
            )
                
      },
        deleteAllNote: function deleteAllNote(callback){
            /*this.initDB();*/
            return $q.when(_db.destroy().then(function(){
                console.log("success destroy");
            }))
      },
      

        

    };

    function initDB() {
        // Creates the database or opens if it already exists
        // PouchDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
       
        _db = new PouchDB('smartnotes', {adapter: 'websql'});
    };

    function onDatabaseChange(change) {  
    var index = findIndex(_notes, change.id);
    var note = _notes[index];

    if (change.deleted) {
        if (note) {
            _notes.splice(index, 1); // delete
        }
    } else {
        if (note && note._id === change.id) {
            _notes[index] = change.doc; // update
        } else {
            _notes.splice(index, 0, change.doc) // insert
        }
    }
}

// Binary search, the array is by default sorted by _id.
    function findIndex(array, id) {  
        var low = 0, high = array.length, mid;
        while (low < high) {
        mid = (low + high) >>> 1;
        array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }
}