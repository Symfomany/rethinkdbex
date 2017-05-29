<template>
  <div class="deep">
    <h3>Deepstream IO</h3>

    <div id="todolist">
      <ul>
        <li v-repeat="items" @click="toggle">
          <label>
        <input type="checkbox" :checked="done">
        {{text}}
      </label>
        </li>
      </ul>

      <input type="text" v-model="newItemName" placeholder="New Item">
      <button @click="newItem">Add</button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'deep',
    methods: {
      toggle: function (ev) {
        // Set the `done` property when the user toggles a checkbox
        if (ev.target.checked != undefined)
          todo.items[ev.targetVM.$index].set("done", ev.target.checked);
      },
      newItem: function () {
        // Create a name and record for the new todo item
        var name = "todos/" + ds.getUid();
        var record = ds.record.getRecord(name);

        // Use the input text as the todo list item's label
        record.set({ text: this.newItemName, done: false });
        // Add the new record to the list
        list.addEntry(name);
      },
    },
    data() {
      return {
        items: []
      }
    },
    created() {
      // Connect to the deepstream server
      var ds = deepstream("localhost:6020").login();

      // Create a unique name for the new record
      var name = "myrecords/" + ds.getUid();

      // Instantiate a new record
      var record = ds.record.getRecord(name);

      // Fetch the list of todo items
      var list = ds.record.getList("todos");

      function wrapRecord(record) {
        record.subscribe(function (data) {
          for (var prop in data)
            if (data.hasOwnProperty(prop))
              record.$set(prop, data[prop]);
        });

        return record;
      }

      // Iterate over the items in the list...
      list.subscribe(function (data) {
        data.forEach(function (name) {
          // Fetch the associated deepstream record
          var record = ds.record.getRecord(name);
          record.whenReady(function () {
            // Wrap it and add it to the todo list
            todo.items.push(wrapRecord(record));
          });
        });
      });

      // Set several properties of the new record
      record.set({
        name: "Enterprise",
        registry: "NCC-1701",
        category: "Constitution",
        crew: 430
      });

      // Subscribe to changes on the `crew` property
      record.subscribe("crew", function (value) {
        console.log("Crew count updated:", value);
      });
    }
  }
</script>