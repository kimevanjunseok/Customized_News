<template>
    <v-layout row wrap>
        <v-flex xs12>
            <div class="drag-container" v-drag-and-drop:options="options">
               
                <ul class="drag-list">
                <li class="drag-column" v-for="group in groups" :key="group.id">
                    <span class="drag-column-header">
                    <h2>{{ group.name }}</h2>
                    <v-icon id="remove-item">fas fa-trash-alt</v-icon>
                    <!-- <feather-icon type="more-vertical"></feather-icon> -->
                    </span>
                    <vue-draggable-group
                    v-model="group.items"
                    :groups="groups"
                    :data-id="group.id"
                    @change="onGroupsChange(groups, $event)"
                    >
                    <ul class="drag-inner-list" :data-id="group.id">
                        <li id="hover-item" class="drag-item" v-for="item in group.items" :key="item.id" :data-id="item.id">
                            
                            <div class="drag-item-text">
                                <input type="checkbox">
                                {{ item.name }}
                            </div>
                            <!-- <v-icon id="remove-item">fas fa-trash-alt</v-icon> -->
                        </li>
                    </ul>
                    </vue-draggable-group>
                </li>
                </ul>
            </div>
        </v-flex>
        
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      groups: [
        {
          id: 1,
          name: "To Do",
          items: [
            { id: 1, name: "Item 1", groupId: 1 },
            { id: 2, name: "Item 2", groupId: 1 },
            { id: 3, name: "Item 3", groupId: 1 }
          ]
        },
        {
          id: 2,
          name: "In Progress",
          items: [
            { id: 4, name: "Item 4", groupId: 2 },
            { id: 5, name: "Item 5", groupId: 2 },
            { id: 6, name: "Item 6", groupId: 2 }
          ]
        },
        {
          id: 3,
          name: "Done",
          items: [
            { id: 7, name: "Item 7", groupId: 3 },
            { id: 8, name: "Item 8", groupId: 3 },
            { id: 9, name: "Item 9", groupId: 3 },
            { id: 10, name: "Item 10", groupId: 3 }
          ]
        },
        {
          id: 4,
          name: "test",
          items: [
            { id: 11, name: "Item 11", groupId: 4 },
            { id: 12, name: "Item 12", groupId: 4 },
            { id: 13, name: "Item 13", groupId: 4 }
          ]
        }
      ],
      options: {
        dropzoneSelector: ".drag-inner-list",
        draggableSelector: ".drag-item"
      }
    };
  },
  methods: {
    onGroupsChange: function onGroupsChange(groups, event) {
        // this.groups = this.groups
    }
    // onGroupsChange(e) {

    //   console.log({ e });
    // }
  }
};
</script>

<style lang="scss" scoped>
$ease-out: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
$to-do: #f4ce46;
$in-progress: #2a92bf;
$approved: #00b961;

* {
  box-sizing: border-box;
}

body {
  background: #33363d;
  color: white;
  font-family: "Roboto Mono", serif;
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-container {
  max-width: 1000px;
  margin: 20px auto;
}

.drag-list {
  display: flex;
  align-items: flex-start;

  @media (max-width: 690px) {
    display: block;
  }
}

.drag-column {
  flex: 1;
  margin: 0 10px;
  position: relative;
  overflow: hidden;
  border:1px solid #eee;
  border-radius:8px;

  @media (max-width: 690px) {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 0.8rem;
    margin: 0;
    text-transform: uppercase;
    font-weight: 600;
  }

  #remove-item {
      font-size: 0.8rem;
  }

  &-to-do {
    .drag-column-header,
    .drag-options {
      background: $to-do;
    }
  }

  &-in-progress {
    .drag-column-header,
    .drag-options {
      background: $in-progress;
    }
  }

  &-approved {
    .drag-column-header,
    .drag-options {
      background: $approved;
    }
  }
}

.drag-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  user-select: none;
  border-bottom:1px solid #eee;
}

.drag-inner-list {
  height: 85vh;
  overflow: auto;
}

.drag-item {
  margin: 10px;
  height: 50px;
  text-align: center;
  transition: $ease-out;
  border:1px solid #eee;
  border-radius:8px;

  /* items grabbed state */
  &[aria-grabbed="true"] {
    background: #5cc1a6;
    // border-color: #5cc1a6;
    color: #fff;
  }

  .drag-item-text {
    font-size: 1rem;
    padding-top: 1rem;
  }
}

.drag-header-more {
  cursor: pointer;
}

@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}

.item-dropzone-area {
  height: 6rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}


// #hover-item {
//     position: relative;
// }

// #remove-item {
//   position: absolute;
//   top: 25%;
//   left: 45%;
// }

// #hover-item > #remove-item {
//     opacity: 0;
//     transition: opacity 1s;
// }

// #hover-item:hover > #remove-item {
//     opacity: 1;
//     position: absolute;
//     top: 25%;
//     left: 45%;
// }
</style>