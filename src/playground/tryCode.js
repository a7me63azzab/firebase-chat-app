        // let allUsers = [];
        // // Get a database reference to our posts
        // var ref = database.ref("/users/");

        // ref.on("child_added", function(snapshot, prevChildKey) {
        //     var userName = snapshot.val().name;
        //     var otherId = snapshot.val().id; 
        //     var index = allUsers.findIndex(item=>item.id === otherId );
            
        //     if (index === -1 ) {
        //              allUsers.push({name:userName,id:otherId});
        //         }
        // });
        // this.setState({
        //     users:allUsers
        // });


        // //list all users 
        // let peoples=[];
        // database.ref('/users/').on('value',(snapshot)=>{
        //         Object.keys(snapshot.val()).forEach(key => {
        //                     let item = snapshot.val()[key];
        //                     let personId = item.id;
        //                     let personName = item.name;
        //                     let personIndex = peoples.findIndex(person => person.id === personId);
        //                     if(personIndex === -1){
        //                         peoples.push({id:personId,name:personName});
        //                     }
        //         });
        //     });
        //     this.setState({
        //         users:peoples
        //     });
        // console.log('Peoples:',peoples);

            // listAllChat=(chat_id)=>{
    //      //show all messages between users
    //      let allMessages =[];
    //     //  database.ref(`/${chat_id}`).on("child_added",(snapshot,prevChildKey)=>{
    //     //      console.log('list all messages:');
    //     //     console.log('value:',snapshot.val());
    //     //  });

    //     database.ref(`/${chat_id}`).on("value",(snapshot)=>{
    //         if(snapshot.val()!==null){
    //             for(var id in snapshot.val()){
    //                 if (snapshot.val().hasOwnProperty(id)) {
    //                     allMessages.push(snapshot.val()[id]);
    //                 }
    //             };
    //         }
    //     });
 
    //      this.setState({
    //         messages:allMessages
    //     });
    // };

//     getAllMessages=()=>{
//         //show all messages between users
//         let allMessages =[];
//         database.ref(`/${this.state.chatId}`).on("child_added",(snapshot, prevChildKey)=>{
//             let resMessage = snapshot.val().message;
//             let resMessageId = snapshot.val().id;
//             var messageIndex = allMessages.findIndex( message => message.id === resMessageId );
//             if (messageIndex === -1) {
//                     allMessages.push({message:resMessage,id:resMessageId});
//                 }
//         });

//         this.setState({
//            messages:allMessages
//        });
//    };