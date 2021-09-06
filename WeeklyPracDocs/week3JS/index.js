// basic text
var txt = "sfsfsefsefesf"
console.log(txt + ", Length: " + txt.length);

//number to string
var num = 123
console.log(String(num + 20));

// array and itteration (Foreach) and string manip (substing)
var ar = ["Apple", "Banana", "Mango", "Cat", "antelope", "French Toast"];
var output = "";

ar.forEach(ForAr);

function ForAr(item) {
    output += (item + " and ");
}

output = output.substring(0, output.length - 5) + ".";
console.log(output);

// easier version with join
var outputTwo = ar.join(" and ") + ".";
console.log(outputTwo);

// get methods for date
var d = new Date();
console.log(d.getTime() + ",\n Timezone: " + d.getTimezoneOffset() + ",\n Seconds: " + d.getSeconds());