<template>
  <h1>Plan</h1>
  <!-- the element users will draw on -->
  <canvas
    id="canvas"
    @mousedown="getMousePos($event, false)"
    @mouseup="getMousePos($event, true)"
  ></canvas>
  <select v-model="Tool">
    <option>Draw</option>
    <option>Select</option>
    <option>Delete</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      painting: false,
      xy: {},
      Shapes: [],
      CanvasVar: {},
      Canvas:{},
      Tool: "Draw",
    };
  },
  mounted() {
    this.canvas = document.getElementById("canvas");
    this.canvas.height = 400;
    this.canvas.width = 400;
    this.CanvasVar = this.canvas.getContext("2d");
    this.vueCanvas = this.CanvasVar;
  },
  watch: {
    Shapes: {
      // triggers on Shapes array mutation
      deep: true,

      handler() {
        this.CanvasVar.clearRect(
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
        this.Shapes.forEach((e) => {
          this.CanvasVar.fillStyle = "grey";
          this.CanvasVar.fillRect(e.x, e.y, e.width, e.height);

          //all highlight selected
          if (e.selected) {
            this.CanvasVar.fillStyle = "#38383840";
            this.CanvasVar.fillRect(e.x, e.y, e.width, e.height);
          }
        });
      },
      
    },
  },
  methods: {
    startShape() {
      this.painting = true;
    },
    endShape() {
      this.painting = false;
    },

    // triggered when mouse up or down on the cnavas, will route to all the tools
    getMousePos(evnt, end) {
      var rect = evnt.target.getBoundingClientRect();
      var x = evnt.clientX - rect.left;
      var y = evnt.clientY - rect.top;

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
      if (end)
        this.Shapes.push({
          x: this.xy.x,
          y: this.xy.y,
          width: x - this.xy.x,
          height: y - this.xy.y,
        });
      else
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
  },
};
</script>

<style scoped>
@import "../../assets/styles/PlannerCanvas.css";
</style>