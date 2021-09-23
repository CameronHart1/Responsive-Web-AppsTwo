<template>
  <h1>Plan</h1>
  <div id="SelectPlanFlex">
    <button id="NewPlanBut" v-on:click="NewPlan()">New Plan</button>
    <!-- the Plan users will draw on -->
    <select v-if="ExistingPlans" v-model="Plan">
      <option
        v-for="plans in UserPlans.Plans"
        :value="this.$store.getters['UserData/GetPlanByID'](plans).ID"
        :key="plans.id"
      >
        {{ this.$store.getters["UserData/GetPlanByID"](plans).Name }}
      </option>
    </select>
  </div>
  <!-- using show so it doesnt mess with code that relies on it (as show = no exist) -->
  <div id="PlannerToolMain" v-show="ExistingPlans">
    <input type="text" v-if="ExistingPlans" v-model="SelectedPlan.Name" />
    <div id="canvasContainer">
      <canvas
        id="canvas"
        @mousedown="getMousePos($event, false)"
        @mouseup="getMousePos($event, true)"
      ></canvas>
    </div>

    <select v-model="Tool">
      <option>Draw</option>
      <option>Select</option>
      <option>Delete</option>
    </select>

    <select v-model="Plant">
      <option v-for="Plant in PlantList" :key="Plant.id">
        {{ Plant.Name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      painting: false,
      xy: {},
      Shapes: [],
      CanvasVar: {},
      canvas: {},
      Tool: "Draw",
      Plant: "Lily",
      Plan: "",
    };
  },
  mounted() {
    this.canvas = document.getElementById("canvas");
    this.canvas.height = 600;
    this.canvas.width = 600;
    this.CanvasVar = this.canvas.getContext("2d");
    this.vueCanvas = this.CanvasVar;

    if (this.SelectedPlan != undefined)
      if (this.SelectedPlan.Plants != undefined)
        this.Shapes = this.SelectedPlan != {} ? this.SelectedPlan.Plants : [];
    this.DrawScene();
  },

  created() {
    this.Plan = this.ExistingPlans ? this.UserPlans.Plans[0] : "";
    let val = this.UserPlans;
    if (this.ExistingPlans)
      if (val.Active != undefined)
        if (val.Active.Plan != undefined)
          this.Plan = this.UserPlans.Plans[val.Active.Plan];
  },

  computed: {
    // used to mod sclae when in small window
    Scale(){
      return (this.$store.state.Auth.BigWindow) ? 1 : 2;
    },
    ExistingPlans() {
      if (this.UserPlans != undefined)
        if (this.UserPlans.Plans != undefined) {
          return this.UserPlans.Plans.length >= 0;
        }
      return false;
    },

    PlantList() {
      return this.$store.state.Plants.Plants;
    },
    UserPlans() {
      var tmp =
        this.$store.getters["UserData/GetUserData"](
          this.$route.params.username
        ) || {};
      return tmp;
    },
    SelectedPlan() {
      return this.$store.getters["UserData/GetPlanByID"](this.Plan);
    },

    SelectedPlant() {
      if (this.Plant != "")
        return this.$store.state.Plants.Plants.find(
          (e) => e.Name == this.Plant
        );
      return {};
    },
  },

  watch: {
    Plan: {
      handler() {
        if (
          this.SelectedPlan.Plants != undefined &&
          this.SelectedPlan.Plants.length > 0
        )
          this.Shapes = this.SelectedPlan.Plants;
        else {
          this.Shapes = [];
        }
      },
      deep: true,
    },

    Shapes: {
      deep: true,
      handler() {
        this.SavePlan();
        this.DrawScene();
      },
    },
  },
  methods: {
    // triggered when mouse up or down on the cnavas, will route to all the tools
    getMousePos(evnt, end) {
      var rect = evnt.target.getBoundingClientRect();
      var x = (evnt.clientX  - rect.left ) * this.Scale;
      var y = (evnt.clientY  - rect.top ) * this.Scale;
console.log(x + " " + y) 
      // using a switch to control the tools
      switch (this.Tool) {
        case "Draw":
          this.DrawTool(x, y, end);
          break;

        case "Select":
          if (end) this.SelectTool(x, y);
          break;

        // runs select then if something was selected deletes it
        case "Delete":
          if (end) {
            this.SelectTool(x, y);
            if (this.Shapes.findIndex((e) => e.selected) >= 0) {
              this.Shapes.splice(
                this.Shapes.findIndex((e) => e.selected),
                1
              );
            }
          }
          break;

        default:
          break;
      }
    },
    // drawing rectangles
    DrawTool(x, y, end) {
      if (end) {
        if (this.Shapes.length > 0) {
          this.Shapes.push({
            x: this.xy.x,
            y: this.xy.y,
            width: x - this.xy.x,
            height: y - this.xy.y,
            plant: this.SelectedPlant,
          });
        } else {
          this.Shapes = [
            {
              x: this.xy.x,
              y: this.xy.y,
              width: x - this.xy.x,
              height: y - this.xy.y,
              plant: this.SelectedPlant,
            },
          ];
        }
      } else
        this.xy = {
          x: x,
          y: y,
        };
    },
    //Selecting a Shape, can call with values outside of canvas to deselect
    SelectTool(x, y) {
      var SelTrigger = false;
      this.Shapes.forEach((e) => {
        if (
          Inbetween(x, e.x, e.width) &&
          Inbetween(y, e.y, e.height) &&
          !SelTrigger
        ) {
          e.selected = true;
          SelTrigger = true;
        } else {
          e.selected = false;
        }
      });

      // for checking that it is in a range
      function Inbetween(TestD, D, Dmodifier) {
        const ModD = D + Dmodifier;
        if (D > ModD) return TestD > ModD && TestD < D;
        else return TestD < ModD && TestD > D;
      }
    },
    // so we can draw after mounting (or when values in SelectedPlan haven't changed)
    DrawScene() {
      if (this.Shapes.length >= 0 && this.CanvasVar.canvas != undefined) {
        this.CanvasVar.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.Shapes.forEach((e) => {
          this.CanvasVar.fillStyle = e.plant.Color;
          this.CanvasVar.fillRect(e.x, e.y, e.width, e.height);

          //all highlight selected
          if (e.selected) {
            this.CanvasVar.fillStyle = "#38383840";
            this.CanvasVar.fillRect(e.x, e.y, e.width, e.height);
          }
        });
      }
    },

    // for making a new plan
    NewPlan() {
      let tmpId = this.ExistingPlans ? this.UserPlans.Plans.length : 0;
      let PlanCount = this.ExistingPlans
        ? " " + this.UserPlans.Plans.length
        : "";

      this.$store.commit("UserData/AddPlan", {
        id: tmpId,
        name: "New Plan" + PlanCount,
        plants: {},
      });

      // adding to Users Account
      this.$store.commit("UserData/UpdateUserPlan", {
        username: this.$route.params.username,
        planId: tmpId,
      });

      // setting active plan to new plan
      this.Plan = tmpId;
      this.$forceUpdate();
    },
    SavePlan() {
      this.$store.commit("UserData/SaveUserPlan", {
        plan: {
          ID: this.Plan,
          Name: this.SelectedPlan.Name,
          Plants: this.Shapes,
        },
        id: this.Plan,
      });
    },
  },
};
</script>

<style scoped>
@import "../../assets/styles/PlannerCanvas.css";
</style>