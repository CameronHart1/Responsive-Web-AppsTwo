<template>
  <div id="PlanBod">
    <div>
      <h2 style="text-align: center">Garden Plan</h2>
      <div>
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
      <canvas id="canvasProfile"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CanvasVar: {},
      canvas: {},
      Shapes: [],
      Plan: "",
      scale: 0.5,
    };
  },
  mounted() {
    this.canvas = document.getElementById("canvasProfile");
    this.canvas.height = 300;
    this.canvas.width = 300;
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
    ExistingPlans() {
      if (this.UserPlans != undefined)
        if (this.UserPlans.Plans != undefined) {
          return this.UserPlans.Plans.length >= 0;
        }
      return false;
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
        this.DrawScene();
      },
    },
  },

  methods: {
    // so we can draw after mounting (or when values in SelectedPlan haven't changed)
    DrawScene() {
      if (this.Shapes.length >= 0 && this.CanvasVar.canvas != undefined) {
        this.CanvasVar.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.Shapes.forEach((e) => {
          this.CanvasVar.fillStyle = e.plant.Color;
          this.CanvasVar.fillRect(
            e.x * this.scale,
            e.y * this.scale,
            e.width * this.scale,
            e.height * this.scale
          );
        });
      }
    },
  },
};
</script>