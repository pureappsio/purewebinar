// Router.route("/api/sales", { where: "server" } ).post( function() {

//   // Get data
//   var data = this.request.body;
//   console.log(data);
//   var key = this.params.query.key;

//   // Send response
//   this.response.setHeader('Content-Type', 'application/json');
//   if (Meteor.call('validateApiKey', key)) {
//     if (data.affiliateCode && data.amount && data.productName) {
//       var sale = Meteor.call('insertSale', data);
//       this.response.end(JSON.stringify({sale: sale}));
//     }
//     else {
//       this.response.end(JSON.stringify({message: "Invalid data"}));
//     }
  
//   }
//   else {
//   	this.response.end(JSON.stringify({message: "API key invalid"}));
//   }

// });