var json = [];
var users = JSON.parse(localStorage.getItem('Users')) || [];
var userexpense = JSON.parse(localStorage.getItem('UserExpense')) || [];
var storedTransactions = JSON.parse(sessionStorage.getItem('currentExpenseTransactions')) || [];
// var userexpenselist = JSON.parse(localStorage.getItem('UserExpenseList')) || [];
var index, individualDetails;
var sum = 0;
var arr = [];
var list = [];
// var email = document.getElementById("Email").value;
// var password = document.getElementById("Password").value;


function addUser() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var income = document.getElementById("income").value;
    var password = document.getElementById("password").value;
    var retypedPassword = document.getElementById("RetypePassWord").value;
    console.log(name);
    if ((name != "") && email != "" && income != "" && password != "" && retypedPassword != "") {
        document.getElementById("res").innerHTML = email;
        if (password != null && retypedPassword != null && password == retypedPassword) {
            var UserData = [{ "name": name }, { "email": email }, { "income": income }, { "password": password }, { "RetypedPassword": retypedPassword }];
            users.push(UserData);
            localStorage.setItem("Users", JSON.stringify(users));
            console.log(localStorage.getItem("Users"));
            alert("Created successfully!");
            window.location.href = "index.html";
        }
        else {
            document.getElementById("RetypePassWord").value = "";
            var tag = document.createElement("p");
            var res = document.createTextNode("Wrong Password!");
            tag.appendChild(res);
            var ptag = document.getElementById("sample").appendChild(tag);
        }
    }
    else {
        alert("Enter all the mandatory fields!");
        window.location.href = "reg.html";
    }
}
function validate() {
    var emailarray = [];
    var passwordarray = [];
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;
    sessionStorage.setItem("currentloggedin", email);
    console.log(sessionStorage.getItem("currentloggedin"));
    if (email != "" && password != "") {
        var keyname = window.localStorage.key(0);
        console.log(keyname);
        console.log(localStorage.getItem(keyname));
        // const details = localStorage.getItem(keyname);
        // console.log(typeof (details));
        // var detail = JSON.parse(details);
        // console.log(detail);
        var users = JSON.parse(localStorage.getItem('Users')) || [];
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            var EMAIL = user[1];
            var PASSWORD = user[3];
            emailarray.push(Object.values(EMAIL));
            passwordarray.push(Object.values(PASSWORD));
            // if(earr[1])
            // console.log(earr[0]);
        }
        var index, flag = 0;
        for (var i = 0; i < emailarray.length; i++) {
            if (email == emailarray[i]) {
                flag = 1;
            }
        }
        console.log(flag);
        if (flag == 1) {
            for (var j = 0; j < emailarray.length; j++) {
                console.log(emailarray[j] + "=====>" + email);
                console.log(passwordarray[j] + "====>" + password);

                if (emailarray[j] == email) {
                    if (passwordarray[j] == password) {
                        index = j;
                        console.log('Successfully logged in!');
                        window.location.href = "Dashboard.html";
                        break;
                    }
                    else {
                        alert("Enter Password correctly");
                        break;
                    }
                }
            }
        }
        else {
            alert("Email does not exist! Kindly register!");
            window.location.href = "index.html";
        }
    }
    else {
        alert("Enter all the mandatory fields!");
    }

}

function calculations() {
    if (document.getElementById("money-plus").innerHTML != 0) {
        console.log(document.getElementById("money-minus").innerHTML);
        var updatedincome, updatedexpense = (Number)(updatedexpense), typeofexpense;
        var e = sessionStorage.getItem("currentloggedin");
        console.log(e);
        document.getElementById("welcome").innerHTML = e;
        var type = document.getElementById("expense");
        var option = type.options[type.selectedIndex].value;
        typeofexpense = option;
        var amount = document.getElementById("amnt").value;
        console.log(amount);
        if (option !== "SELECT") {
            if (amount !== "") {
                var currentincome;
                var users = JSON.parse(localStorage.getItem('Users'));
                console.log(users);
                var email, income;
                var emailarray = [], incomearray = [], expensearray = [];
                // for (var i = 0; i < users.length; i++) {
                //     var user = users[i];
                //     email = user[1];
                //     income = user[2];
                //     emailarray.push(Object.values(email));
                //     incomearray.push(Object.values(income));
                // }
                // console.log(emailarray);
                // console.log(incomearray);
                // for (var j = 0; j < emailarray.length; j++) {
                //     if (e == emailarray[j]) {
                //         currentincome = (Number)(incomearray[j].toString());
                //         break;
                //     }
                // }
                // currentincome = document.getElementById("money-plus").innerHTML;
                // currentexpense = amount;
                var USEREXPENSE = JSON.parse(localStorage.getItem('UserExpense')) || [];
                console.log(USEREXPENSE);
                for (var i = 0; i < USEREXPENSE.length; i++) {
                    var userss = USEREXPENSE[i];
                    var emailidd = userss[0];
                    var incomee = userss[1];
                    var expensee = userss[2];
                    emailarray.push(Object.values(emailidd));
                    incomearray.push(Object.values(incomee));
                    expensearray.push(Object.values(expensee));
                }
                console.log(emailarray);
                sum = 0;
                flag = 0;
                console.log(emailarray.includes(e));
                for (var i in emailarray) {
                    console.log(emailarray[i].toString());
                    if (emailarray[i].toString() == e) {
                        console.log("i==" + i)
                        flag = 1;
                        break;
                    }
                }
                console.log(emailarray);
                console.log("flag=" + flag);
                if (flag == 1) {
                    console.log("*****");
                    for (var i = emailarray.length - 1; i >= 0; i--) {
                        if (e == emailarray[i]) {
                            currentincome = incomearray[i];
                            console.log(currentincome);
                            currentexpense = expensearray[i];
                            console.log(currentexpense[0]);
                            var am = (Number)(amount)
                            if ((Number)(amount) <= (Number)(currentincome[0])) {
                                updatedincome = currentincome[0] - amount;
                                document.getElementById("money-plus").innerHTML = updatedincome;
                                console.log("*************" + currentincome[0] + "****************")

                                updatedexpense = (Number)(document.getElementById("money-minus").innerHTML) + am;
                                sum += (Number)(updatedexpense)
                                document.getElementById("money-minus").innerHTML = sum;
                                console.log("*************" + (Number)(sum) + "****************")
                            }
                            else {
                                document.getElementById("money-plus").innerHTML = 0;
                                document.getElementById("money-minus").innerHTML = sum;
                                alert("amount excess");
                            }
                            break;
                        }
                        else {
                            for (var i = 0; i < users.length; i++) {
                                var user = users[i];
                                email = user[1];
                                income = user[2];
                                emailarray.push(Object.values(email));
                                incomearray.push(Object.values(income));
                            }
                            console.log(emailarray);
                            console.log(incomearray);
                            for (var j = 0; j < emailarray.length; j++) {
                                if (e == emailarray[j]) {
                                    currentincome = (Number)(incomearray[j].toString());
                                    break;
                                }
                            }
                            // var obj = [{ "email": e }, { "income": currentincome }, { "expense": 0 }, { "Type": "Select" }];
                            // userexpense.push(obj);
                            // console.log(userexpense);
                            // document.getElementById("money-plus").innerHTML = currentincome;
                            // document.getElementById("money-minus").innerHTML = 0;
                            // console.log(document.getElementById("money-minus").innerHTML);
                            // localStorage.setItem("UserExpense", JSON.stringify(userexpense));
                            currentincome = document.getElementById("money-plus").innerHTML;
                            console.log(currentincome);
                            currentexpense = amount;
                            console.log(currentexpense)
                            var am = (Number)(amount)
                            if ((Number)(amount) <= (Number)(currentincome)) {
                                updatedincome = currentincome - amount;
                                console.log("*************" + currentincome[0] + "****************")

                                updatedexpense = 0 + amount;
                                console.log("*************" + updatedexpense + "****************")
                            }
                            else {
                                alert("amount excess");
                            }
                            break;
                        }
                    }
                    var obj = [{ "email": e }, { "income": updatedincome }, { "expense": updatedexpense }, { "Type": typeofexpense }];
                    userexpense.push(obj);
                    console.log(userexpense);
                    document.getElementById("money-plus").innerHTML = updatedincome;

                    document.getElementById("money-minus").innerHTML = updatedexpense;
                    console.log(document.getElementById("money-minus").innerHTML);
                    localStorage.setItem("UserExpense", JSON.stringify(userexpense));
                }
                else {
                    var users = JSON.parse(localStorage.getItem('Users'));
                    console.log(users);
                    var earray = [], iarray = [], eemail, iincome;
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        eemail = user[1];
                        iincome = user[2];
                        earray.push(Object.values(eemail));
                        iarray.push(Object.values(iincome));
                    }
                    console.log(earray);
                    console.log(iarray);
                    for (var j = 0; j < earray.length; j++) {
                        if (e == earray[j]) {
                            currentincome = (Number)(iarray[j].toString());
                            break;
                        }
                    }

                    // currentincome = ;
                    var obj = [{ "email": e }, { "income": currentincome - amount }, { "expense": (Number)(amount) }, { "Type": typeofexpense }];
                    userexpense.push(obj);
                    console.log(userexpense);
                    document.getElementById("money-plus").innerHTML = currentincome - amount;
                    document.getElementById("currentincome").innerHTML = currentincome - amount;
                    document.getElementById("money-minus").innerHTML = amount;
                    console.log(document.getElementById("money-minus").innerHTML);
                    localStorage.setItem("UserExpense", JSON.stringify(userexpense));
                }



                console.log("e" + e + "Updated Expense:" + updatedexpense + "Updated income" + updatedincome + "Type of Expense" + typeofexpense);

            }
            else {
                alert("Enter the amount to be spent for the selected expense before submitting");
            }
        }
        else {
            alert("Select type of expense before submitting");
        }
    }
    else {
        alert("Your expenses has reached your income! No further expenses can be added");
    }
    
    


}

// function display() {
//     var e = sessionStorage.getItem("currentloggedin");
//     // console.log(e);
//     var users = JSON.parse(localStorage.getItem("UserExpense"));
//     var ind, email, income, expense, type;
//     var emaillist = [], incomelist = [], expenselist = [], typelist = [];

//     for (var i = 0; i < users.length; i++) {
//         var user = users[i];
//         var emailid = user[0];
//         emaillist.push(Object.values(emailid));
//         var income = user[1];
//         incomelist.push(Object.values(income));
//         var expense = user[2];
//         expenselist.push(Object.values(expense));
//         var type = user[3];
//         typelist.push(Object.values(type));
//     }
//     var indexlist = [];
//     var j;
//     for (var i = 0; i < emaillist.length - 1; i++) {
//         if (i == 0 && emaillist[i] == e) {
//             var ee = `<tr><td> ${emaillist[i]} </td><td>${incomelist[i]} </td><td>${expenselist[i]}</td><td>${typelist[i]}</td></tr>`;
//             list.push(ee);
//         }
//         if (emaillist[i] == e) {
//             // indexlist.push(expenselist[i]);
//             var ee = `<tr><td> ${emaillist[i]} </td><td>${incomelist[i]} </td><td>${expenselist[i]}</td><td>${typelist[i]}</td></tr>`;
//             list.push(ee);


//             // document.getElementById("money-plus").innerHTML=incomelist[j];
//         }
//     }
//    for(var i=0;i<list.length;i++){
//     document.getElementsByClassName("list").innerHTML+=list[i];
//    }
// }


