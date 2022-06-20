$(document).ready(function(){
    $("#add").click(function (){
        var list=[];
        var eee=document.getElementById("amnt");
        console.log(eee);
        var e = sessionStorage.getItem("currentloggedin");
    console.log(e);
    var users = JSON.parse(localStorage.getItem("UserExpense"));
    var ind, email, income, expense, type;
    var emaillist = [], incomelist = [], expenselist = [], typelist = [];

    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var emailid = user[0];
        emaillist.push(Object.values(emailid));
        var income = user[1];
        incomelist.push(Object.values(income));
        var expense = user[2];
        expenselist.push(Object.values(expense));
        var type = user[3];
        typelist.push(Object.values(type));
    }
    var indexlist = [];
    var j;
    for (var i = 0; i < emaillist.length - 1; i++) {
        // console.log(emaillist[i].toString());
        if (i == 0 && emaillist[i].toString() == e) {
            var ee = `<tr><td> ${emaillist[i].toString()} </td><td>${expenselist[i+1]-expenselist[i]}</td><td>${typelist[i]}</td></tr>`;
            list.push(ee);
        }
        if (emaillist[i] == e) {
            // indexlist.push(expenselist[i]);
            var ee = `<tr><td> ${emaillist[i]} </td><td>${expenselist[i+1]-expenselist[i]}</td><td>${typelist[i]}</td></tr>`;
            list.push(ee);


            // document.getElementById("money-plus").innerHTML=incomelist[j];
        }
       
    }
    $("#show").click(function(){
        for(var i=0;i<list.length;i++){
            document.getElementById("list").innerHTML+=list[i];
            }
        
        // for(var i=0;i<list.length;i++){
            
        //    }
    });
    $("#hide").click(function(){
       $("#list").hide();
    });
})
});