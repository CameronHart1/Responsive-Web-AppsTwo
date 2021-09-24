<template>
  <h1>Journal</h1>
  <!-- Select existing -->

  <!-- 
will either have name or con plan so the message text works
   -->
  <div v-if="ExistingJournal && !CreateNew">
    <select v-model="Journal">
      <option value="None">Select a Journal</option>
      <option
        v-for="Entry in UserDataCopy.Journals"
        :value="Entry"
        :key="Entry.id"
      >
        {{ this.$store.getters["UserData/GetJournalByID"](Entry).Name}}
        {{
          (this.$store.getters["UserData/GetPlanByID"](PlansWithJournals[Entry]) != undefined)? this.$store.getters["UserData/GetPlanByID"](PlansWithJournals[Entry]).Name:""
        }}
      </option>
    </select>
  </div>

  <!-- Make a new start -->
  <button v-if="!JournalActive && !CreateNew" @click="CreateNew = true">
    Make a New Journal
  </button>

  <!-- dialouge for making a new plane -->
  <div v-if="CreateNew">
    <!-- from plan -->
    <div
      v-if="
        ExistingPlans &&
        (this.PlansWithJournals.filter(e => e != undefined).length >= this.UserDataCopy.Plans.length ||
          this.PlansWithJournals[0] == 'None')
      "
    >
      <h3>Make a Journal For a Garden Plan</h3>
      <select v-model="Plan">
        <option
          v-for="plans in UserDataCopy.Plans.filter(
            (e) => this.PlansWithJournals.indexOf(e.ID) == -1
          )"
          :value="plans"
          :key="plans.id"
        >
          {{ this.$store.getters["UserData/GetPlanByID"](plans).Name }}
        </option>
      </select>
      <button
        @click="
          JournalFromPlan(
            this.$store.getters['UserData/GetPlanByID'](this.Plan)
          )
        "
      >
        Journal From Plan
      </button>
      <h3>Or Make a New Journal</h3>
    </div>
    <!-- new journal (not from plan) -->
    <input v-model="Name" placeholder="Journal Name" />
    <button @click="AddNewJournal()">Make a New Journal</button>
  </div>

  <!-- For when a journal is active -->
  <div v-if="JournalActive">
    <!-- week day buttons -->
    <!-- only like 5 conditionaly operators, used to chnge when clicked / toggled and to have rounded on outside -->
    <div id="ButtonCont">
      <button
        v-for="Val in SelectedDays"
        :key="Val.id"
        :class="
          Val.Enabled
            ? Val.short == 'Mon' || Val.short == 'Sun'
              ? Val.short == 'Mon'
                ? 'LeftButEn'
                : 'RightButEn'
              : 'MiddleButEn'
            : Val.short == 'Mon' || Val.short == 'Sun'
            ? Val.short == 'Mon'
              ? 'LeftBut'
              : 'RightBut'
            : 'MiddleBut'
        "
        @click="DayToggle(Val.day)"
      >
        {{ this.$store.state.Auth.BigWindow ? Val.day : Val.short }}
      </button>
    </div>
    <div v-if="SelectedDays.findIndex((e) => e.Enabled == true) > -1">
      <template
        v-for="int in Instructions[
          SelectedDays.findIndex((e) => e.Enabled == true)
        ]"
        :key="int.id"
      >
        <div style="display: flex; width: 100%">
          <h1 style="width: 200px">{{ int.Plant }}</h1>
          <textarea
            style="flex-grow: 1; font-size: 16px"
            v-model="int.Content"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Journal: "None",
      linkedJournal: false,
      Plan: "",
      CreateNew: false,
      JournalActive: false,
      Name: "",
      SelectedDays: [
        { day: "Monday", short: "Mon", Enabled: false },
        { day: "Tuesday", short: "Tue", Enabled: false },
        { day: "Wednsday", short: "Wed", Enabled: false },
        { day: "Thursday", short: "Thu", Enabled: false },
        { day: "Friday", short: "Fri", Enabled: false },
        { day: "Saturday", short: "Sat", Enabled: false },
        { day: "Sunday", short: "Sun", Enabled: false },
      ],
      //   [[{plant:"",instructions:""}]
      Instructions: [[], [], [], [], [], [], []],
    };
  },
  created() {
    this.Plan = this.ExistingPlans ? this.UserDataCopy.Plans[0] : "";
    let val = this.UserDataCopy;
    if (this.ExistingPlans)
      if (val.Active != undefined)
        if (val.Active.Plan != undefined)
          this.Plan = this.UserDataCopy.Plans[val.Active.Plan];
  },

  computed: {
    // If the user Has Plans
    ExistingPlans() {
      if (this.UserDataCopy != undefined)
        if (this.UserDataCopy.Plans != undefined) {
          return this.UserDataCopy.Plans.length >= 0;
        }
      return false;
    },

    // if the user has Journals
    ExistingJournal() {
      if (this.UserDataCopy != undefined)
        if (this.UserDataCopy.Journals != undefined) {
          return this.UserDataCopy.Journals.length >= 0;
        }
      return false;
    },

    UserDataCopy() {
      var tmp =
        this.$store.getters["UserData/GetUserData"](
          this.$route.params.username
        ) || {};
      return tmp;
    },
    //  so we dont double up on linking journals with plans
    PlansWithJournals() {
      return this.ExistingJournal
        ? this.UserDataCopy.Journals.map((e) => {
            if (
              this.$store.getters["UserData/GetJournalByID"](e).ConPlan !=
              undefined
            )
              this.$store.getters["UserData/GetJournalByID"](e).ConPlan;
            else "";
          })
        : ["None"];
    },
    // SelectedPlan() {
    //   return this.$store.getters["UserData/GetPlanByID"](this.Plan);
    // },
  },

  watch: {
    Journal: {
      deep: true,
      handler(val) {
        if (val != "None") {
          this.JournalActive = true;
          this.Instructions =
            this.$store.getters["UserData/GetJournalByID"](val).Instructions;

          if (this.$store.getters["UserData/GetJournalByID"](val).ConPlan != "")
            this.linkedJournal = true;
          else this.linkedJournal = false;
        } else this.JournalActive = false;
      },
    },
  },

  methods: {
    DayToggle(day) {
      let tmp = !this.SelectedDays.find((e) => e.day == day).Enabled;
      this.SelectedDays.forEach((e) => (e.Enabled = false));
      this.SelectedDays.find((e) => e.day == day).Enabled = tmp;
    },

    // Generating a Journal from the current Plan
    JournalFromPlan(plan) {
      // getting list of unique plant vals from plan
      // filter then in filter check the first index where the plant name appears is equal to index on iteration
      // then map just the name
      let PlantList = plan.Plants.filter(
        (e, i, s) => s.findIndex((elem) => elem.plant == e.plant) === i
      ).map((e) => e.plant);

      // for days in week
      for (let i = 0; i < 7; i++) {
        // for unique plants in plan
        PlantList.forEach((e) => {
          // If there are instruction for the plant add as new
          if (
            this.$store.getters["Plants/PlantByName"](e).Instructions[i] != ""
          )
            this.Instructions[i].push({
              Plant: e,
              Content:
                this.$store.getters["Plants/PlantByName"](e).Instructions[i],
            });
        });

        this.Name = plan.Name;
        this.linkedJournal = true;
        this.JournalActive = true;
        this.CreateNew = false;
        this.Journal = this.$store.state.UserData.PlantJournal.length;
      }

      this.AddNewJournal();
    },
    // making a new Journal
    AddNewJournal() {
      if (this.linkedJournal)
        this.$store.commit("UserData/AddJournal", {
          id: this.Journal,
          name: "",
          instructions: this.Instructions,
          conPlan: this.Plan,
        });
      else {
        this.Journal = this.$store.state.UserData.PlantJournal.length;
        this.linkedJournal = false;
        this.JournalActive = true;
        this.CreateNew = false;
        this.$store.commit("UserData/AddJournal", {
          id: this.Journal,
          name: this.Name,
          instructions: this.Instructions,
          conPlan: "",
        });
      }

      // adding ID to Users Journal List
      this.$store.commit("UserData/UpdateUserJournal", {
        username: this.$route.params.username,
        journalId: this.Journal,
      });
    },
    // // Saving Journals
    // SaveJournal(){
    //   if()
    // }
  },
};
</script>

<style scoped>
@import "../../assets/styles/Journal.css";
</style>