<template>
  <h1>Journal</h1>
  <!-- Select existing -->
  <div v-if="!JournalActive && ExistingJournal && !CreateNew">
    <select v-if="ExistingPlans" v-model="Plan">
      <option
        v-for="Entry in UserDataCopy.Journal"
        :value="this.$store.getters['UserData/GetJournalByID'](Entry).ID"
        :key="Entry.id"
      >
        {{ this.$store.getters["UserData/GetPlanByID"](Entry).Name }}
      </option>
    </select>
  </div>

  <!-- Make a new start -->
  <button v-if="!JournalActive && !CreateNew" @click="CreateNew = true;">Make a New Journal</button>

  <!-- dialouge for making a new plane -->
  <div v-if="CreateNew">
    <h3 v-if="ExistingPlans">Make a Journal For a Garden Plan</h3>
    <select v-if="ExistingPlans" v-model="Plan">
      <option
        v-for="plans in UserDataCopy.Plans.filter(
          (e) => this.PlansWithJournals.indexOf(e.ID) == -1
        )"
        :value="this.$store.getters['UserData/GetPlanByID'](plans).ID"
        :key="plans.id"
      >
        {{ this.$store.getters["UserData/GetPlanByID"](plans).Name }}
      </option>
    </select>
    <button @click="JournalFromPlan()">Journal From Plan</button>
    <h3 v-if="ExistingPlans">Or Make a New Journal</h3>
    <input v-model="Name" placeholder="Journal Name"/>
    <button @click="NewJournal()">Make a New Journal</button>
  </div>

  <!-- For when a journal is active -->
  <div v-if="JournalActive">
    <button
      v-for="Val in SelectedDays"
      :key="Val.id"
      @click="DayToggle(Val.day)"
    >
      {{ this.$store.state.Auth.BigWindow ? Val.day : Val.short }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CreateNew: false,
      JournalActive: false,
      Name:"",
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
      Instructions: [[{}], [{}], [{}], [{}], [{}], [{}], [{}]],
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
    //   Not sure if need
    PlantsDatabase() {
      return this.$store.state.Plants.Plants;
    },
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
        if (this.UserDataCopy.Journal != undefined) {
          return this.UserDataCopy.Journal.length >= 0;
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
        ? this.UserDataCopy.Journal.map((e) => e.ConPlan)
        : ["None"];
    },
    // SelectedPlan() {
    //   return this.$store.getters["UserData/GetPlanByID"](this.Plan);
    // },

    // SelectedPlant() {
    //   if (this.Plant != "")
    //     return this.$store.state.Plants.Plants.find(
    //       (e) => e.Name == this.Plant
    //     );
    //   return {};
    // },
  },

  watch: {},
  methods: {
    DayToggle(day) {
      this.SelectedDays.find((e) => e.day == day).Enabled =
        !this.SelectedDays.find((e) => e.day == day).Enabled;
    },
    GetInstructionsFromPlan() {},
  },
};
</script>