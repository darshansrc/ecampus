




function paymentProcess(){
    var options = {
        "key": "rzp_test_6wpCPZqAqk8tVS", // Enter the Key ID generated from the Dashboard
        "amount": 320*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "E-Campus", //your business name
        "description": "Event Transaction",
        "image": "https://www.google.com/ (2)",
        //"order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            //alert(response.razorpay_payment_id);
            //alert(response.razorpay_order_id);
            //alert(response.razorpay_signature)
            savetoDB(response);
            $('#myModal').modal();
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Abhijat Dakshesh", //your customer's name
            "email": "abhijatdakshesh@gmail.com", 
            "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#9932CC"
        }
    };

    var propay = new Razorpay(options);
    propay.open();
}

function savetoDB(response){
    console.log(response)
    var payRef = firebase.firestore().ref('payments');
    
    payRef.child('123456789').set({
        payment_id : response.razorpay_payment_id

    })
}