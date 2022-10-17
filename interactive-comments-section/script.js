var n=0;//comm
var k=0;//replies

function load(){
    fetch("./data.json")
    .then(Response=>{
        return Response.json();
    })
    .then(data=>{
        console.log(data);

        var add_com=document.getElementById("add_com");

        var img_profil=document.createElement('img');
        img_profil.classList="profil_img";
        img_profil.src=data.currentUser.image.png;
        add_com.appendChild(img_profil);


        var com=document.createElement('input');
        com.classList="add_com";
        com.id="com_input";
        add_com.appendChild(com);

        var send=document.createElement('button');
        send.classList="send";
        send.id="send_btn";
        add_com.appendChild(send);
        send.textContent="SEND";
        
        //add com

        document.getElementById("send_btn").addEventListener('click',function () {
    
    
            var box_com=document.createElement('div');
            box_com.classList="comment";
        
            var img_profil=document.createElement('img');
            img_profil.classList="profil_img";
            img_profil.src=data.currentUser.image.png;
            box_com.appendChild(img_profil);
        
            var username=document.createElement('div');
            username.classList="username";
            username.textContent=data.currentUser.username;
            box_com.appendChild(username);
        
            var time=document.createElement('div');
            time.classList="created";
            time.textContent="Right now";
            box_com.appendChild(time);
        
            var reply=document.createElement('button');
            reply.classList="reply";
            reply.textContent="Reply";
            reply.onclick=function(){add()};
            
            box_com.appendChild(reply);
        
            var com=document.createElement('div');
            com.classList="com";
            var content=document.getElementById("com_input");
            console.log(content.value);
            com.textContent=content.value;
            box_com.appendChild(com);
            
            var box_id=document.createElement('div');
            box_id.classList="box";
            box_id.appendChild(box_com);

            document.getElementById("container").appendChild(box_id);

            content.value=" ";
        
        });
        
        

        
        

        //com from json
       for(var i=0;i<data.comments.length;i++)
       {    var comment=document.createElement('div');
            comment.classList="comment";
            



            var img_profil=document.createElement('img');
            img_profil.src=data.comments[i].user.image.png;
            img_profil.classList="profil_img";
            comment.appendChild(img_profil);

            var username=document.createElement('div');
            username.classList="username";
            username.textContent=data.comments[i].user.username;
            
            comment.appendChild(username);

            var created_date=document.createElement('div');
            created_date.textContent=data.comments[i].createdAt;
            created_date.classList="created";
            comment.appendChild(created_date);

            var reply=document.createElement('button');
            reply.classList="reply";
            reply.textContent="Reply";
            reply.id=n;
            reply.onclick=function(){add($(this).parent().parent().attr('id'))};
            comment.appendChild(reply);

            var com=document.createElement('div');
            com.textContent=data.comments[i].content;
            com.classList="com";
            comment.appendChild(com);

            var box_id=document.createElement('div');
            box_id.classList="box";
            box_id.id='div'+ n;
            n++;
            box_id.appendChild(comment);



            document.getElementById("container").appendChild(box_id);
            
            

            //replies
            for(var j=0;j<data.comments[i].replies.length;j++)
            {   var box_reply=document.createElement('div');
                box_reply.classList="comment box_reply";
                box_reply.id=data.comments[i].replies[j].id;

                var profil_reply=document.createElement('img');
                profil_reply.src=data.comments[i].replies[j].user.image.png;
                profil_reply.classList="profil_img";
                box_reply.appendChild(profil_reply);
                

                var username_reply=document.createElement('div');
                username_reply.classList="username";
                username_reply.textContent=data.comments[i].replies[j].user.username;
                box_reply.appendChild(username_reply);

                var created_reply=document.createElement('div');
                created_reply.classList="created";
                created_reply.textContent=data.comments[i].replies[j].createdAt;
                box_reply.appendChild(created_reply);

                var reply_button=document.createElement('button');
                reply_button.classList="reply";
                reply_button.textContent="Reply";
                reply_button.onclick=function(){add($(this).parent().parent().attr('id'));};
                box_reply.appendChild(reply_button);

                var com_reply=document.createElement('div');
                com_reply.textContent=data.comments[i].replies[j].content;
                com_reply.classList="com";
                box_reply.appendChild(com_reply);

                var box_id=document.createElement('div');
                box_id.classList="box";
                box_id.id="div_msg"+n;
                n++;
                box_id.appendChild(box_reply);

                document.getElementById("container").appendChild(box_id);
            }
            //reply to a com
            function add(x){
                var box=document.createElement('div');
                box.classList="comment box_reply com_reply";
                box.id="com"+k;

                img_prf=document.createElement('img');
                img_prf.src=data.currentUser.image.png;
                img_prf.classList="profil_img";
                box.appendChild(img_prf);
            
                var user=document.createElement('div');
                user.classList="username";
                user.textContent=data.currentUser.username;
                box.appendChild(user);
            
                var time=document.createElement('div');
                time.classList="created";
                time.textContent="Right now";
                box.appendChild(time);

                var input_reply=document.createElement('input');
                input_reply.classList="input_reply";
                input_reply.id="reply"+k;
                k++;
                box.appendChild(input_reply);

                var btn=document.createElement('button');
                btn.textContent="Add comment";
                btn.onclick=function(){add_com($(this).parent().attr('id'))};
                btn.classList="btn send";
                box.appendChild(btn);

            
                
            
                document.getElementById(x).appendChild(box);
               
            }
            //com from reply button            
            function add_com(x){
               var a = document.getElementById(x).childNodes;
               var text=a[3].value;
               console.log(text);

               a[3].style.display="none";
               a[4].style.display="none";

               var reply=document.createElement('button');
               reply.classList="reply";
               reply.textContent="Reply";
               reply.onclick=function(){add($(this).parent().parent().attr('id'))};
               
               document.getElementById(x).appendChild(reply);

               var com=document.createElement('div');
               com.classList="com";
               com.textContent=text;
               document.getElementById(x).appendChild(com);

            }

       }

       
    });

    

    
}


