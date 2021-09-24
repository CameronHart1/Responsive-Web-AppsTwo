<template>
  <div style="flex-grow: 1; width:100%">
    <h2 style="text-align: center; margin-bottom: 40px">Garden journel</h2>
    <select v-model="Journal">
      <option value="None">Select a Journal</option>
      <option
        v-for="Entry in UserDataCopy.Journals"
        :value="Entry"
        :key="Entry.id"
      >
        {{ getName(Entry) }}
      </option>
    </select>
    <!-- the flexbox that will hold the list of journal entries from the selected hournal -->
    <template v-for="int in Instructions[WeekDay]" :key="int.id">
      <div style="display: flex; width: 100%">
        <h1 style="width: 200px">{{ int.Plant }}</h1>
        <pre style="flex-grow: 1; font-size: 16px"> {{ int.Content }} </pre>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Journal: "None",
      Instructions: [[], [], [], [], [], [], []],
    };
  },
  computed: {
    // day of week as int
    WeekDay() {
      const d = new Date();
      return d.getDay() - 1;
    },
    ExistingJournal() {
      if (this.UserDataCopy != undefined)
        if (this.UserDataCopy.Journals != undefined) {
          return this.UserDataCopy.Journals.length >= 0;
        }
      return false;
    },
    // Copu of user data
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
            let tmp = this.$store.getters["UserData/GetJournalByID"](e);
            if (tmp.ConPlan != undefined)
              return this.$store.getters["UserData/GetJournalByID"](e).ConPlan;
            else return "";
          })
        : ["None"];
    },
  },
  watch: {
    Journal: {
      deep: true,
      handler(val) {
        console.log(val);
        if (val != "None") {
          this.Instructions =
            this.$store.getters["UserData/GetJournalByID"](val).Instructions;
        } else this.Instructions = [[], [], [], [], [], [], []];
      },
    },
  },
  methods: {
    getName(Entry) {
      if (this.PlansWithJournals[Entry] !== "") {
        return this.$store.getters["UserData/GetPlanByID"](
          this.PlansWithJournals[Entry]
        ).Name;
      } else return this.$store.getters["UserData/GetJournalByID"](Entry).Name;
    },
  },
};
</script>