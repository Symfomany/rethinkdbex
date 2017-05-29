<template>
  <div class="deep">
    <h3>Deepstream IO</h3>
  </div>
</template>

<script>
  export default {
    name: 'deep',
    data() {
      return {
        data: { items: [] },
      }
    },
    methods: {

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