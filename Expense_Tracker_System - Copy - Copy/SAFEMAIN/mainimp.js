var json = [];
var users = JSON.parse(localStorage.getItem('Users')) || [];
var userexpense = JSON.parse(localStorage.getItem('UserExpense')) || [];
var storedTransactions=JSON.parse(sessionStorage.getItem('currentExpenseTransactions')) || [];
// var userexpenselist = JSON.parse(localStorage.getItem('UserExpenseList')) || [];
var index, individualDetails;
var sum = 0;
var arr = [];
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
    if(document.getElementById("money-plus").innerHTML!=document.getElementById("money-minus").innerHTML){

    var updatedincome, updatedexpense, typeofexpense;
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
            var emailarray = [], incomearray = [];
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
            currentincome=document.getElementById("money-plus").innerHTML;
            currentexpense=document.getElementById("money-minus").innerHTML;
            console.log(currentincome+"    "+currentexpense);
            if ((Number)(amount) <= (Number)(currentincome)) {
                console.log(arr);
                arr.push((Number)(amount));

            }
            else {
                alert("The amount exceeds the income");
            }


            add(arr, currentincome);
            function add(arr, currentincome) {
                // var g=JSON.parse(sessionStorage.getItem('currentExpenseTransactions')) || [];
                // for(var k=0;k<g.length;k++){
                //     var ind=g[k];
                //     var emaill=ind[0];
                //     var updateddExpense=ind[1];
                //     console.log(ind);
                // }
                sum = 0;
                for (var i = 0; i < arr.length; i++) {
                    sum += arr[i];
                }
                console.log("the sum of expense is " + sum);
                if (sum <= currentincome) {
                    console.log("before Income is :" + currentincome);
                    currentincome -= sum;
                    console.log("after Income is :" + currentincome);
                    updatedincome = currentincome;
                   // document.getElementById("money-plus").innerHTML = currentincome;
                    updatedexpense = sum;
                   document.getElementById("money-minus").innerHTML = sum;
                }
                else {
                    updatedincome = currentincome - (sum - (arr[arr.length - 1]));
                 //   document.getElementById("money-plus").innerHTML = currentincome - (sum - (arr[arr.length - 1]));
                    console.log("sum" + sum);
                    updatedexpense = sum - (arr[arr.length - 1]);
                   document.getElementById("money-minus").innerHTML = sum - (arr[arr.length - 1]);
                    arr.pop();
                    alert("Amount exceeds your income");
                }
            }
            var obj = [{ "email": e }, { "income": updatedincome }, { "expense": updatedexpense }, { "Type": typeofexpense }];
            userexpense.push(obj);
            sessionStorage.setItem("currentExpenseTransactions", JSON.stringify(obj));
            var g=JSON.parse(sessionStorage.getItem('currentExpenseTransactions')) || [];
            console.log(g);
            console.log(userexpense);
            document.getElementById("money-plus").innerHTML = currentincome;
            localStorage.setItem("UserExpense", JSON.stringify(userexpense));
            // console.log(localStorage.getItem("UserExpense"));
            for (var j = 0; j < emailarray.length; j++) {
                if (e == emailarray[j]) {
                    incomearray[j] = updatedincome;
                    console.log(incomearray[j] + "******");
                }
            }
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                email = Object.values(user[1]);
                if (e == email) {

                }
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
else{
    
    alert("Your expenses has reached your income! No further expenses can be added");
}

}

function display() {
    if(count==0){
    var list = [];
    list.push(`<tr><td>EMAIL</d>
            <td>INCOME</td>
            <td>EXPENSE</td>
            <td>TYPE</td></tr>`);
    var e = sessionStorage.getItem("currentloggedin");
    // console.log(e);
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
    for (var i = 0; i < emaillist.length; i++) {
        if (emaillist[i] == e) {
            var ee = `<tr><td> ${emaillist[i]} </td><td>${incomelist[i]} </td><td>${expenselist[i]}</td><td>${typelist[i]}</td></tr>`;
            list.push(ee);


            // document.getElementById("money-plus").innerHTML=incomelist[j];
        }
    }
    for (j = 0; j < list.length; j++) {
        document.getElementById("list").innerHTML += `${list[j]}`;
    }
}
else{
    count++;
}

}


